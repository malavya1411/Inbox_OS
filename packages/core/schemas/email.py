from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any, List
from datetime import datetime

class EmailSchema(BaseModel):
    """Standardized email schema used across all connectors, classifiers, and pipelines."""
    id: str = Field(description="Unique email identifier")
    sender_email: EmailStr = Field(description="Sender's email address")
    sender_name: Optional[str] = Field(default=None, description="Sender's display name")
    subject: str = Field(description="Email subject line")
    body_text: str = Field(description="Parsed clean text body")
    body_html: Optional[str] = Field(default=None, description="Raw HTML body if available")
    received_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp of when email was received")
    thread_id: Optional[str] = Field(default=None, description="Thread identifier from provider")
    labels: List[str] = Field(default_factory=list, description="Labels/categories assigned to this email")
    raw_metadata: Dict[str, Any] = Field(default_factory=dict, description="Raw provider headers or context metadata")

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": "email-12345",
                "sender_email": "sender@domain.com",
                "sender_name": "John Doe",
                "subject": "Urgent review needed",
                "body_text": "Hey, please review the slides for tomorrow's meeting.",
                "received_at": "2026-06-26T16:00:00Z",
                "thread_id": "thread-abcde",
                "labels": ["urgent"],
                "raw_metadata": {}
            }
        }
    }
