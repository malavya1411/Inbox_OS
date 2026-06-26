from typing import Dict, Any
from ..core.schemas.email import EmailSchema
from ..core.schemas.analysis import AnalysisSchema

def execute_action(action: Dict[str, Any], email: EmailSchema, analysis: AnalysisSchema) -> Dict[str, Any]:
    """
    Executes a rule action.
    Action schema: {type: str, params: Dict[str, Any]}
    """
    action_type = action.get("type")
    params = action.get("params", {})

    # In production, these trigger external service integrations
    result = {
        "action_type": action_type,
        "executed": True,
        "details": {}
    }

    if action_type == "notify_telegram":
        result["details"] = {"message": f"Forwarded to Telegram. Priority: {params.get('priority', 'normal')}"}
    elif action_type == "notify_whatsapp":
        result["details"] = {"message": "Forwarded to WhatsApp via Twilio API."}
    elif action_type == "create_task":
        result["details"] = {"task_title": f"Review: {email.subject}", "status": "pending"}
    elif action_type == "add_to_digest":
        result["details"] = {"digest": "Added to low-priority daily briefing."}
    elif action_type == "priority_boost":
        boost = params.get("boost", 10.0)
        analysis.priority_score = min(100.0, analysis.priority_score + boost)
        result["details"] = {"priority_boosted_by": boost}
    elif action_type == "mark_important":
        result["details"] = {"starred": True}
    elif action_type == "log_expense":
        result["details"] = {"logged": True, "note": "Finance record created."}
    else:
        result["executed"] = False
        result["details"] = {"error": f"Unknown action type: {action_type}"}

    return result
