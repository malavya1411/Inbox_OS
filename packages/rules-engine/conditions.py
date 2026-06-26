from typing import Any, Dict
from ..core.schemas.email import EmailSchema
from ..core.schemas.analysis import AnalysisSchema

def evaluate_condition(condition: Dict[str, Any], email: EmailSchema, analysis: AnalysisSchema) -> bool:
    """
    Evaluates a single condition against an email and its AI analysis.
    Condition schema: {field: str, operator: str, value: Any}
    """
    field = condition.get("field")
    operator = condition.get("operator", "equals")
    target_value = condition.get("value")

    # Resolve actual field value
    actual_value = None
    if field == "sender_email":
        actual_value = email.sender_email
    elif field == "subject":
        actual_value = email.subject
    elif field == "domain":
        actual_value = email.sender_email.split("@")[-1] if "@" in email.sender_email else ""
    elif field == "category":
        actual_value = analysis.category
    elif field == "priority_score":
        actual_value = analysis.priority_score
    else:
        # Check raw metadata as fallback
        actual_value = email.raw_metadata.get(field)

    if actual_value is None:
        return False

    # Apply operator
    try:
        if operator == "equals":
            return str(actual_value).lower() == str(target_value).lower()
        elif operator == "contains":
            return str(target_value).lower() in str(actual_value).lower()
        elif operator == "starts_with":
            return str(actual_value).lower().startswith(str(target_value).lower())
        elif operator == "gt":
            return float(actual_value) > float(target_value)
        elif operator == "lt":
            return float(actual_value) < float(target_value)
        elif operator == "in":
            if isinstance(target_value, list):
                return str(actual_value).lower() in [str(v).lower() for v in target_value]
            return str(actual_value).lower() in str(target_value).lower()
    except Exception:
        return False

    return False
