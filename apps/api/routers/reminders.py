from fastapi import APIRouter, HTTPException, Depends
from mock_data import MOCK_REMINDERS
from schemas import ReminderCreate, ReminderOut
from typing import List
from utils.auth import get_current_user
import uuid
from datetime import datetime

router = APIRouter(prefix="/reminders", tags=["reminders"])


@router.get("", response_model=List[dict])
async def list_reminders(current_user: dict = Depends(get_current_user)):
    return sorted(MOCK_REMINDERS, key=lambda r: r["remind_at"])


@router.post("", response_model=dict, status_code=201)
async def create_reminder(data: ReminderCreate, current_user: dict = Depends(get_current_user)):
    reminder = {
        "id": f"rem-{uuid.uuid4().hex[:8]}",
        "user_id": current_user["id"],
        "email_id": data.email_id,
        "title": data.title,
        "message": data.message,
        "remind_at": data.remind_at.isoformat(),
        "status": "pending",
        "channel": data.channel,
        "created_at": datetime.utcnow().isoformat(),
    }
    MOCK_REMINDERS.append(reminder)
    return reminder


@router.patch("/{reminder_id}/cancel")
async def cancel_reminder(reminder_id: str, current_user: dict = Depends(get_current_user)):
    reminder = next((r for r in MOCK_REMINDERS if r["id"] == reminder_id), None)
    if not reminder:
        raise HTTPException(404, "Reminder not found")
    reminder["status"] = "cancelled"
    return {"status": "cancelled"}


@router.patch("/{reminder_id}/snooze")
async def snooze_reminder(reminder_id: str, minutes: int = 30, current_user: dict = Depends(get_current_user)):
    reminder = next((r for r in MOCK_REMINDERS if r["id"] == reminder_id), None)
    if not reminder:
        raise HTTPException(404, "Reminder not found")
    reminder["status"] = "snoozed"
    return {"status": "snoozed", "snoozed_for_minutes": minutes}
