from fastapi import APIRouter, Depends
from schemas import AIAnalyzeRequest
from services.ai_service import LLMClient
from utils.auth import get_current_user
from config import settings

router = APIRouter(prefix="/ai", tags=["ai"])

llm = LLMClient(provider=settings.AI_PROVIDER)


@router.post("/analyze")
async def analyze_email(data: AIAnalyzeRequest, current_user: dict = Depends(get_current_user)):
    """Analyze an email with AI. Returns classification, scores, summary, and reply draft."""
    result = llm.analyze(
        subject=data.subject,
        body=data.body,
        sender=data.sender,
    )
    result["ai_provider"] = settings.AI_PROVIDER
    return result


@router.get("/providers")
async def list_providers():
    """List available AI providers and current active one."""
    return {
        "active": settings.AI_PROVIDER,
        "available": [
            {"id": "mock", "name": "Mock (Development)", "status": "active", "cost": "free"},
            {"id": "gemini", "name": "Google Gemini", "status": "configure_key", "cost": "low"},
            {"id": "openai", "name": "OpenAI GPT-4o", "status": "configure_key", "cost": "medium"},
            {"id": "ollama", "name": "Ollama (Local)", "status": "install_required", "cost": "free"},
        ]
    }


@router.get("/health")
async def ai_health():
    """Check AI service health."""
    return {"status": "ok", "provider": settings.AI_PROVIDER, "mock_mode": settings.AI_PROVIDER == "mock"}
