from fastapi import APIRouter, Depends
from schemas import SettingsUpdate, SettingsOut
from utils.auth import get_current_user

router = APIRouter(prefix="/settings", tags=["settings"])

# In-memory mock settings (replace with DB in production)
_MOCK_SETTINGS = {
    "theme": "dark",
    "ai_provider": "mock",
    "telegram_enabled": True,
    "telegram_chat_id": "",
    "whatsapp_enabled": False,
    "email_digest_enabled": True,
    "digest_frequency": "daily",
    "store_email_body": True,
    "analytics_enabled": True,
}


@router.get("")
async def get_settings(current_user: dict = Depends(get_current_user)):
    return _MOCK_SETTINGS


@router.patch("")
async def update_settings(data: SettingsUpdate, current_user: dict = Depends(get_current_user)):
    updates = data.model_dump(exclude_none=True)
    _MOCK_SETTINGS.update(updates)
    return _MOCK_SETTINGS


@router.get("/connected-accounts")
async def connected_accounts(current_user: dict = Depends(get_current_user)):
    return [
        {"id": "account-001", "provider": "gmail", "email": "demo@gmail.com", "status": "connected", "last_sync": "2 minutes ago"},
    ]
