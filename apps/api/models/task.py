from sqlalchemy import Column, String, DateTime, JSON, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


def gen_uuid():
    return str(uuid.uuid4())


class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    deadline = Column(DateTime(timezone=True), nullable=True)
    status = Column(String, default="pending")  # pending | in_progress | done | cancelled
    priority = Column(String, default="medium")  # low | medium | high | urgent
    source_email_id = Column(String, nullable=True, index=True)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="tasks")
