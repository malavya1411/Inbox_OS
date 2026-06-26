from sqlalchemy import Column, String, DateTime, JSON, Boolean, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


def gen_uuid():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=gen_uuid)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password_hash = Column(String, nullable=True)  # null for OAuth users
    avatar_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    preferences = Column(JSON, default=dict)  # theme, notifications, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    email_accounts = relationship("EmailAccount", back_populates="user", cascade="all, delete-orphan")
    rules = relationship("Rule", back_populates="user", cascade="all, delete-orphan")
    tasks = relationship("Task", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    reminders = relationship("Reminder", back_populates="user", cascade="all, delete-orphan")
    settings = relationship("UserSettings", back_populates="user", uselist=False, cascade="all, delete-orphan")


class EmailAccount(Base):
    __tablename__ = "email_accounts"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, nullable=False, index=True)
    provider = Column(String, nullable=False)  # gmail | outlook | imap
    email_address = Column(String, nullable=False)
    credentials = Column(JSON, default=dict)  # encrypted in prod
    sync_state = Column(JSON, default=dict)  # last sync cursor/token
    last_sync_at = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="email_accounts")
    emails = relationship("Email", back_populates="account", cascade="all, delete-orphan")
