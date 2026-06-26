from fastapi import APIRouter, HTTPException, Depends
from typing import List
from mock_data import MOCK_RULES
from schemas import RuleCreate, RuleUpdate, RuleOut
from utils.auth import get_current_user
import uuid
from datetime import datetime

router = APIRouter(prefix="/rules", tags=["rules"])


@router.get("", response_model=List[dict])
async def list_rules(current_user: dict = Depends(get_current_user)):
    """List all user rules ordered by priority."""
    return sorted(MOCK_RULES, key=lambda r: r["priority_order"])


@router.post("", response_model=dict, status_code=201)
async def create_rule(data: RuleCreate, current_user: dict = Depends(get_current_user)):
    """Create a new routing rule."""
    rule = {
        "id": f"rule-{uuid.uuid4().hex[:8]}",
        "user_id": current_user["id"],
        "name": data.name,
        "description": data.description,
        "conditions": data.conditions,
        "actions": data.actions,
        "priority_order": data.priority_order,
        "is_active": data.is_active,
        "created_at": datetime.utcnow().isoformat(),
    }
    MOCK_RULES.append(rule)
    return rule


@router.get("/{rule_id}", response_model=dict)
async def get_rule(rule_id: str, current_user: dict = Depends(get_current_user)):
    rule = next((r for r in MOCK_RULES if r["id"] == rule_id), None)
    if not rule:
        raise HTTPException(404, "Rule not found")
    return rule


@router.patch("/{rule_id}", response_model=dict)
async def update_rule(rule_id: str, data: RuleUpdate, current_user: dict = Depends(get_current_user)):
    """Update a rule."""
    rule = next((r for r in MOCK_RULES if r["id"] == rule_id), None)
    if not rule:
        raise HTTPException(404, "Rule not found")
    updates = data.model_dump(exclude_none=True)
    rule.update(updates)
    return rule


@router.delete("/{rule_id}")
async def delete_rule(rule_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a rule."""
    global MOCK_RULES
    rule = next((r for r in MOCK_RULES if r["id"] == rule_id), None)
    if not rule:
        raise HTTPException(404, "Rule not found")
    MOCK_RULES = [r for r in MOCK_RULES if r["id"] != rule_id]
    return {"status": "deleted", "rule_id": rule_id}


@router.post("/{rule_id}/toggle")
async def toggle_rule(rule_id: str, current_user: dict = Depends(get_current_user)):
    """Toggle rule active state."""
    rule = next((r for r in MOCK_RULES if r["id"] == rule_id), None)
    if not rule:
        raise HTTPException(404, "Rule not found")
    rule["is_active"] = not rule["is_active"]
    return {"status": "ok", "is_active": rule["is_active"]}
