from sqlalchemy import Column, String, DateTime, JSON, Boolean, Integer, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


def gen_uuid():
    return str(uuid.uuid4())


class Rule(Base):
    __tablename__ = "rules"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)

    # Rule logic stored as JSON for flexibility
    conditions = Column(JSON, default=list)
    # [{ field: "sender_email", operator: "contains", value: "university.edu" }]

    actions = Column(JSON, default=list)
    # [{ type: "notify_telegram", params: {} }, { type: "create_task", params: {} }]

    priority_order = Column(Integer, default=100)  # lower = higher priority
    is_active = Column(Boolean, default=True)

    # Time-based activation
    active_window = Column(JSON, nullable=True)
    # { days: ["mon","tue"], start_hour: 9, end_hour: 18 }

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="rules")
