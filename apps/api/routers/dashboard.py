from fastapi import APIRouter, Depends
from mock_data import DASHBOARD_STATS
from utils.auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats")
async def get_stats(current_user: dict = Depends(get_current_user)):
    """Get inbox statistics for the dashboard."""
    return DASHBOARD_STATS


@router.get("/heatmap")
async def get_heatmap(current_user: dict = Depends(get_current_user)):
    """Get inbox activity heatmap data."""
    from mock_data import ANALYTICS_DATA
    return {"heatmap": ANALYTICS_DATA["priority_heatmap"]}


@router.get("/recent-activity")
async def get_recent_activity(current_user: dict = Depends(get_current_user)):
    return DASHBOARD_STATS["recent_activity"]
