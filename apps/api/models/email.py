from sqlalchemy import Column, String, DateTime, JSON, Boolean, Text, Float, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


def gen_uuid():
    return str(uuid.uuid4())


class Email(Base):
    __tablename__ = "emails"

    id = Column(String, primary_key=True, default=gen_uuid)
    account_id = Column(String, nullable=False, index=True)
    provider_message_id = Column(String, nullable=True, index=True)
    thread_id = Column(String, nullable=True, index=True)

    # Sender info
    sender_email = Column(String, nullable=False, index=True)
    sender_name = Column(String, nullable=True)

    # Content
    subject = Column(String, nullable=True)
    body_text = Column(Text, nullable=True)
    body_html = Column(Text, nullable=True)
    snippet = Column(String, nullable=True)

    # Metadata
    received_at = Column(DateTime(timezone=True), nullable=True)
    is_read = Column(Boolean, default=False)
    is_starred = Column(Boolean, default=False)
    is_archived = Column(Boolean, default=False)
    labels = Column(JSON, default=list)
    raw_metadata = Column(JSON, default=dict)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    account = relationship("EmailAccount", back_populates="emails")
    analysis = relationship("EmailAnalysis", back_populates="email", uselist=False, cascade="all, delete-orphan")
    action_items = relationship("ActionItem", back_populates="email", cascade="all, delete-orphan")
    executed_actions = relationship("ExecutedAction", back_populates="email", cascade="all, delete-orphan")


class ActionItem(Base):
    __tablename__ = "action_items"

    id = Column(String, primary_key=True, default=gen_uuid)
    email_id = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=False)
    deadline = Column(DateTime(timezone=True), nullable=True)
    status = Column(String, default="pending")  # pending | done | skipped
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    email = relationship("Email", back_populates="action_items")


class ExecutedAction(Base):
    __tablename__ = "executed_actions"

    id = Column(String, primary_key=True, default=gen_uuid)
    email_id = Column(String, nullable=False, index=True)
    rule_id = Column(String, nullable=True)
    action_type = Column(String, nullable=False)  # notify | task | digest | ignore
    status = Column(String, default="success")  # success | failed | pending
    result_message = Column(Text, nullable=True)
    executed_at = Column(DateTime(timezone=True), server_default=func.now())

    email = relationship("Email", back_populates="executed_actions")
