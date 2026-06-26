from fastapi import APIRouter, Depends
from mock_data import ANALYTICS_DATA
from utils.auth import get_current_user

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("")
async def get_analytics(current_user: dict = Depends(get_current_user)):
    """Full analytics data for the analytics page."""
    return ANALYTICS_DATA


@router.get("/weekly-volume")
async def weekly_volume(current_user: dict = Depends(get_current_user)):
    return ANALYTICS_DATA["weekly_volume"]


@router.get("/category-trends")
async def category_trends(current_user: dict = Depends(get_current_user)):
    return ANALYTICS_DATA["category_trends"]


@router.get("/top-senders")
async def top_senders(current_user: dict = Depends(get_current_user)):
    return ANALYTICS_DATA["top_senders"]
