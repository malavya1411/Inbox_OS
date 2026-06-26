from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class RuleConditionSchema(BaseModel):
    field: str = Field(description="Target field: sender_email | subject | category | priority_score | domain")
    operator: str = Field(description="Comparison operator: equals | contains | gt | lt | in | starts_with")
    value: Any = Field(description="Value to compare against")

class RuleActionSchema(BaseModel):
    type: str = Field(description="Action type: notify_telegram | notify_whatsapp | create_task | add_to_digest | ignore | mark_important")
    params: Dict[str, Any] = Field(default_factory=dict, description="Action specific parameters")

class RuleSchema(BaseModel):
    """Pydantic model representing user-defined routing rules."""
    id: str
    user_id: str
    name: str
    description: Optional[str] = None
    conditions: List[RuleConditionSchema] = Field(default_factory=list)
    actions: List[RuleActionSchema] = Field(default_factory=list)
    priority_order: int = 100
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
