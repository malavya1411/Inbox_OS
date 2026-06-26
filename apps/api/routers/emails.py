from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from mock_data import MOCK_EMAILS
from schemas import EmailOut, EmailDetailOut
from utils.auth import get_current_user

router = APIRouter(prefix="/emails", tags=["emails"])


@router.get("", response_model=List[dict])
async def list_emails(
    category: Optional[str] = Query(None),
    priority_min: Optional[float] = Query(None),
    is_read: Optional[bool] = Query(None),
    is_archived: Optional[bool] = Query(None),
    limit: int = Query(50, le=200),
    offset: int = Query(0),
    current_user: dict = Depends(get_current_user),
):
    """List emails with optional filters."""
    emails = MOCK_EMAILS.copy()

    if category:
        emails = [e for e in emails if e.get("analysis", {}).get("category") == category]
    if priority_min is not None:
        emails = [e for e in emails if e.get("analysis", {}).get("priority_score", 0) >= priority_min]
    if is_read is not None:
        emails = [e for e in emails if e.get("is_read") == is_read]
    if is_archived is not None:
        emails = [e for e in emails if e.get("is_archived", False) == is_archived]

    return emails[offset:offset + limit]


@router.get("/{email_id}", response_model=dict)
async def get_email(email_id: str, current_user: dict = Depends(get_current_user)):
    """Get full email detail including analysis."""
    email = next((e for e in MOCK_EMAILS if e["id"] == email_id), None)
    if not email:
        raise HTTPException(404, f"Email {email_id} not found")
    return email


@router.post("/{email_id}/archive")
async def archive_email(email_id: str, current_user: dict = Depends(get_current_user)):
    """Archive an email."""
    email = next((e for e in MOCK_EMAILS if e["id"] == email_id), None)
    if not email:
        raise HTTPException(404, "Email not found")
    email["is_archived"] = True
    return {"status": "archived", "email_id": email_id}


@router.post("/{email_id}/star")
async def star_email(email_id: str, current_user: dict = Depends(get_current_user)):
    """Star/unstar an email."""
    email = next((e for e in MOCK_EMAILS if e["id"] == email_id), None)
    if not email:
        raise HTTPException(404, "Email not found")
    email["is_starred"] = not email.get("is_starred", False)
    return {"status": "ok", "is_starred": email["is_starred"]}


@router.post("/{email_id}/mark-read")
async def mark_read(email_id: str, current_user: dict = Depends(get_current_user)):
    """Mark email as read."""
    email = next((e for e in MOCK_EMAILS if e["id"] == email_id), None)
    if not email:
        raise HTTPException(404, "Email not found")
    email["is_read"] = True
    return {"status": "ok"}


@router.get("/{email_id}/analysis", response_model=dict)
async def get_analysis(email_id: str, current_user: dict = Depends(get_current_user)):
    """Get AI analysis for an email."""
    email = next((e for e in MOCK_EMAILS if e["id"] == email_id), None)
    if not email:
        raise HTTPException(404, "Email not found")
    return email.get("analysis", {})


@router.post("/webhook/gmail")
async def gmail_webhook(payload: dict):
    """Receive Gmail push notifications (Pub/Sub)."""
    # TODO: Process Gmail push notification
    return {"status": "received"}
