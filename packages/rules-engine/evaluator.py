from typing import List, Dict, Any, Tuple
from ..core.schemas.email import EmailSchema
from ..core.schemas.analysis import AnalysisSchema
from .conditions import evaluate_condition
from .actions import execute_action

class RulesEvaluator:
    """Evaluates emails and AI analysis against user-defined business rules in priority order."""

    def __init__(self, rules: List[Dict[str, Any]]):
        # Sort rules by priority order (lower order number = higher priority)
        self.rules = sorted(
            [r for r in rules if r.get("is_active", True)],
            key=lambda x: x.get("priority_order", 100)
        )

    def evaluate(self, email: EmailSchema, analysis: AnalysisSchema) -> List[Dict[str, Any]]:
        """
        Evaluate rules. Returns a list of executed action logs for matched rules.
        """
        executed_actions = []

        for rule in self.rules:
            conditions = rule.get("conditions", [])
            
            # Evaluate conditions (all conditions must match - AND logic)
            match = True
            for cond in conditions:
                if not evaluate_condition(cond, email, analysis):
                    match = False
                    break

            if match:
                actions = rule.get("actions", [])
                for action in actions:
                    exec_res = execute_action(action, email, analysis)
                    executed_actions.append({
                        "rule_id": rule.get("id"),
                        "rule_name": rule.get("name"),
                        "action_res": exec_res
                    })
                
                # First matching rule wins, break execution to prevent rule collision
                break

        return executed_actions
