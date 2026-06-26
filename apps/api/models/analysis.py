from sqlalchemy import Column, String, DateTime, JSON, Float, Integer, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


def gen_uuid():
    return str(uuid.uuid4())


class EmailAnalysis(Base):
    __tablename__ = "email_analysis"

    id = Column(String, primary_key=True, default=gen_uuid)
    email_id = Column(String, nullable=False, unique=True, index=True)

    # Classification
    category = Column(String, nullable=True)  # academic | job | finance | meeting | otp | newsletter | personal | support
    priority_score = Column(Float, default=0.0)   # 0-100
    urgency_score = Column(Float, default=0.0)    # 0-100
    actionability_score = Column(Float, default=0.0)  # 0-100
    confidence_score = Column(Float, default=0.0)  # 0-1

    # AI-generated content
    summary = Column(Text, nullable=True)
    reasoning = Column(Text, nullable=True)
    suggested_reply = Column(Text, nullable=True)

    # Structured extraction (JSONB in prod)
    extracted_data = Column(JSON, default=dict)
    # { deadlines: [], entities: [], amounts: [], links: [], action_items: [] }

    # Provider used
    ai_provider = Column(String, default="mock")
    analyzed_at = Column(DateTime(timezone=True), server_default=func.now())

    email = relationship("Email", back_populates="analysis")
