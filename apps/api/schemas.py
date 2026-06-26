from datetime import datetime
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, EmailStr


# ── Auth ──────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    avatar_url: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ── Email ─────────────────────────────────────────────────────────────────────

class EmailOut(BaseModel):
    id: str
    sender_email: str
    sender_name: Optional[str] = None
    subject: Optional[str] = None
    snippet: Optional[str] = None
    received_at: Optional[datetime] = None
    is_read: bool = False
    is_starred: bool = False
    is_archived: bool = False
    labels: List[str] = []

    class Config:
        from_attributes = True


class EmailDetailOut(EmailOut):
    body_text: Optional[str] = None
    analysis: Optional["AnalysisOut"] = None
    action_items: List["ActionItemOut"] = []


class ActionItemOut(BaseModel):
    id: str
    description: str
    deadline: Optional[datetime] = None
    status: str = "pending"

    class Config:
        from_attributes = True


# ── Analysis ──────────────────────────────────────────────────────────────────

class AnalysisOut(BaseModel):
    id: str
    category: Optional[str] = None
    priority_score: float = 0.0
    urgency_score: float = 0.0
    actionability_score: float = 0.0
    confidence_score: float = 0.0
    summary: Optional[str] = None
    reasoning: Optional[str] = None
    suggested_reply: Optional[str] = None
    extracted_data: Dict[str, Any] = {}
    ai_provider: str = "mock"
    analyzed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ── Rules ─────────────────────────────────────────────────────────────────────

class RuleCondition(BaseModel):
    field: str  # sender_email | subject | category | priority_score | domain
    operator: str  # contains | equals | gt | lt | in | starts_with
    value: Any


class RuleAction(BaseModel):
    type: str  # notify_telegram | notify_whatsapp | create_task | add_to_digest | ignore | mark_important
    params: Dict[str, Any] = {}


class RuleCreate(BaseModel):
    name: str
    description: Optional[str] = None
    conditions: List[Dict[str, Any]] = []
    actions: List[Dict[str, Any]] = []
    priority_order: int = 100
    is_active: bool = True


class RuleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    conditions: Optional[List[Dict[str, Any]]] = None
    actions: Optional[List[Dict[str, Any]]] = None
    priority_order: Optional[int] = None
    is_active: Optional[bool] = None


class RuleOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    conditions: List[Dict[str, Any]] = []
    actions: List[Dict[str, Any]] = []
    priority_order: int
    is_active: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ── Tasks ─────────────────────────────────────────────────────────────────────

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    priority: str = "medium"
    source_email_id: Optional[str] = None
    tags: List[str] = []


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    status: Optional[str] = None
    priority: Optional[str] = None


class TaskOut(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    status: str
    priority: str
    source_email_id: Optional[str] = None
    tags: List[str] = []
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ── Reminders ─────────────────────────────────────────────────────────────────

class ReminderCreate(BaseModel):
    title: str
    message: Optional[str] = None
    remind_at: datetime
    email_id: Optional[str] = None
    channel: str = "telegram"


class ReminderOut(BaseModel):
    id: str
    title: str
    message: Optional[str] = None
    remind_at: datetime
    status: str
    channel: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ── Dashboard ─────────────────────────────────────────────────────────────────

class DashboardStats(BaseModel):
    total_emails: int
    processed_today: int
    high_priority: int
    pending_tasks: int
    sent_notifications: int
    category_breakdown: Dict[str, int]
    priority_distribution: Dict[str, int]
    recent_activity: List[Dict[str, Any]]


# ── Analytics ─────────────────────────────────────────────────────────────────

class AnalyticsData(BaseModel):
    weekly_volume: List[Dict[str, Any]]
    category_trends: List[Dict[str, Any]]
    top_senders: List[Dict[str, Any]]
    response_time_avg: float
    priority_heatmap: List[Dict[str, Any]]


# ── Settings ──────────────────────────────────────────────────────────────────

class SettingsUpdate(BaseModel):
    theme: Optional[str] = None
    ai_provider: Optional[str] = None
    telegram_chat_id: Optional[str] = None
    telegram_enabled: Optional[bool] = None
    whatsapp_enabled: Optional[bool] = None
    email_digest_enabled: Optional[bool] = None
    digest_frequency: Optional[str] = None
    store_email_body: Optional[bool] = None


class SettingsOut(BaseModel):
    theme: str
    ai_provider: str
    telegram_enabled: bool
    whatsapp_enabled: bool
    email_digest_enabled: bool
    digest_frequency: str

    class Config:
        from_attributes = True


# ── AI (Mock) ─────────────────────────────────────────────────────────────────

class AIAnalyzeRequest(BaseModel):
    subject: str
    body: str
    sender: str


class ReplyRequest(BaseModel):
    email_id: str
    tone: str = "professional"  # professional | casual | brief
    instructions: Optional[str] = None
