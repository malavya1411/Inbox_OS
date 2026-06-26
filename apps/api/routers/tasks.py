from fastapi import APIRouter, HTTPException, Depends
from typing import List
from mock_data import MOCK_TASKS
from schemas import TaskCreate, TaskUpdate, TaskOut
from utils.auth import get_current_user
import uuid
from datetime import datetime

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=List[dict])
async def list_tasks(current_user: dict = Depends(get_current_user)):
    return sorted(MOCK_TASKS, key=lambda t: t.get("deadline", "9999"))


@router.post("", response_model=dict, status_code=201)
async def create_task(data: TaskCreate, current_user: dict = Depends(get_current_user)):
    task = {
        "id": f"task-{uuid.uuid4().hex[:8]}",
        "user_id": current_user["id"],
        "title": data.title,
        "description": data.description,
        "deadline": data.deadline.isoformat() if data.deadline else None,
        "status": "pending",
        "priority": data.priority,
        "source_email_id": data.source_email_id,
        "tags": data.tags,
        "created_at": datetime.utcnow().isoformat(),
    }
    MOCK_TASKS.append(task)
    return task


@router.get("/{task_id}", response_model=dict)
async def get_task(task_id: str, current_user: dict = Depends(get_current_user)):
    task = next((t for t in MOCK_TASKS if t["id"] == task_id), None)
    if not task:
        raise HTTPException(404, "Task not found")
    return task


@router.patch("/{task_id}", response_model=dict)
async def update_task(task_id: str, data: TaskUpdate, current_user: dict = Depends(get_current_user)):
    task = next((t for t in MOCK_TASKS if t["id"] == task_id), None)
    if not task:
        raise HTTPException(404, "Task not found")
    updates = data.model_dump(exclude_none=True)
    task.update(updates)
    return task


@router.delete("/{task_id}")
async def delete_task(task_id: str, current_user: dict = Depends(get_current_user)):
    global MOCK_TASKS
    MOCK_TASKS = [t for t in MOCK_TASKS if t["id"] != task_id]
    return {"status": "deleted"}
