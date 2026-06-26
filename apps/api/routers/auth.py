from fastapi import APIRouter, HTTPException, Depends
from schemas import UserCreate, UserLogin, TokenResponse, UserOut
from utils.auth import hash_password, verify_password, create_access_token, MOCK_USER
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse)
async def register(data: UserCreate):
    """Register a new user. In dev mode, returns mock token."""
    # TODO: Save user to database
    token = create_access_token(
        {"sub": "user-new-001", "email": data.email, "name": data.name},
        expires_delta=timedelta(days=7)
    )
    return TokenResponse(
        access_token=token,
        user=UserOut(id="user-new-001", name=data.name, email=data.email)
    )


@router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin):
    """Login endpoint. Dev mode accepts any credentials."""
    # TODO: Verify against database
    # Demo: accept demo@inboxos.app with any password
    token = create_access_token(
        {"sub": MOCK_USER["id"], "email": MOCK_USER["email"], "name": MOCK_USER["name"]},
        expires_delta=timedelta(days=7)
    )
    return TokenResponse(
        access_token=token,
        user=UserOut(**MOCK_USER)
    )


@router.get("/me", response_model=UserOut)
async def get_me(current_user: dict = Depends(__import__("utils.auth", fromlist=["get_current_user"]).get_current_user)):
    return UserOut(**current_user)


@router.get("/connect/gmail")
async def connect_gmail():
    """Initiate Gmail OAuth flow."""
    return {"redirect_url": "https://accounts.google.com/o/oauth2/v2/auth?[TODO: configure OAuth params]", "status": "not_configured"}


@router.get("/callback/gmail")
async def gmail_callback(code: str = None):
    """Handle Gmail OAuth callback."""
    if not code:
        raise HTTPException(400, "Missing authorization code")
    return {"status": "ok", "message": "Gmail connected (mock)"}


@router.get("/connect/outlook")
async def connect_outlook():
    """Initiate Outlook OAuth flow."""
    return {"redirect_url": "https://login.microsoftonline.com/[TODO: configure OAuth params]", "status": "not_configured"}
