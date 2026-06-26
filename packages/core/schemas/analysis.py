from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List

class EntitySchema(BaseModel):
    type: str = Field(description="Type of entity: company, person, date, etc.")
    value: str = Field(description="Extracted value of the entity")

class ActionItemSchema(BaseModel):
    description: str = Field(description="Action item description")
    deadline: Optional[str] = Field(default=None, description="Extracted action item deadline")

class DeadlineSchema(BaseModel):
    label: str = Field(description="Deadline name or description")
    datetime: str = Field(description="Date and time of deadline")

class AmountSchema(BaseModel):
    value: float = Field(description="Financial transaction amount")
    currency: str = Field(description="Currency code: USD, INR, etc.")
    merchant: Optional[str] = Field(default=None, description="Merchant name")

class LinkSchema(BaseModel):
    url: str = Field(description="URL link")
    label: Optional[str] = Field(default=None, description="Display label for the link")

class ExtractedDataSchema(BaseModel):
    entities: List[EntitySchema] = Field(default_factory=list)
    action_items: List[ActionItemSchema] = Field(default_factory=list)
    deadlines: List[DeadlineSchema] = Field(default_factory=list)
    amounts: List[AmountSchema] = Field(default_factory=list)
    links: List[LinkSchema] = Field(default_factory=list)
    otp_code: Optional[str] = Field(default=None, description="Extracted 2FA/OTP code if present")

class AnalysisSchema(BaseModel):
    """Standardized schema containing AI understanding and feature extraction results."""
    category: str = Field(description="Category classified: academic, job, finance, meeting, otp, newsletter, support, personal")
    priority_score: float = Field(ge=0.0, le=100.0, description="Priority score from 0 to 100")
    urgency_score: float = Field(ge=0.0, le=100.0, description="Urgency score from 0 to 100")
    actionability_score: float = Field(ge=0.0, le=100.0, description="Actionability score from 0 to 100")
    confidence_score: float = Field(ge=0.0, le=1.0, description="AI classification confidence score")
    summary: str = Field(description="Brief human-readable summary of the email")
    reasoning: str = Field(description="Explainable reasoning behind classification and priority scores")
    suggested_reply: Optional[str] = Field(default=None, description="Drafted reply based on content and tone")
    extracted_data: ExtractedDataSchema = Field(default_factory=ExtractedDataSchema)
