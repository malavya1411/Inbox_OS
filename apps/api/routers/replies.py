from fastapi import APIRouter, HTTPException, Depends
from mock_data import MOCK_EMAILS
from schemas import ReplyRequest
from services.ai_service import LLMClient
from utils.auth import get_current_user
from config import settings

router = APIRouter(prefix="/replies", tags=["replies"])

llm = LLMClient(provider=settings.AI_PROVIDER)


@router.post("/generate")
async def generate_reply(data: ReplyRequest, current_user: dict = Depends(get_current_user)):
    """Generate a reply draft for an email."""
    email = next((e for e in MOCK_EMAILS if e["id"] == data.email_id), None)
    if not email:
        raise HTTPException(404, "Email not found")

    category = email.get("analysis", {}).get("category", "personal")
    reply = llm.generate_reply(
        email_subject=email.get("subject", ""),
        email_body=email.get("body_text", ""),
        category=category,
        tone=data.tone,
        instructions=data.instructions or "",
    )
    return {
        "email_id": data.email_id,
        "reply_draft": reply,
        "tone": data.tone,
        "ai_provider": settings.AI_PROVIDER,
    }


@router.post("/{email_id}/schedule")
async def schedule_reply(email_id: str, send_at: str, reply_body: str, current_user: dict = Depends(get_current_user)):
    """Schedule a reply to be sent at a specific time."""
    email = next((e for e in MOCK_EMAILS if e["id"] == email_id), None)
    if not email:
        raise HTTPException(404, "Email not found")
    return {
        "status": "scheduled",
        "email_id": email_id,
        "send_at": send_at,
        "message": "Reply scheduled successfully (mock — integrate SMTP in production)",
    }


@router.get("/history")
async def reply_history(current_user: dict = Depends(get_current_user)):
    """Get reply history."""
    return [
        {"id": "reply-001", "email_id": "email-002", "subject": "RE: Stripe Interview", "status": "sent", "sent_at": "2026-06-25T10:30:00Z"},
        {"id": "reply-002", "email_id": "email-001", "subject": "RE: DBMS Deadline", "status": "draft", "sent_at": None},
    ]
