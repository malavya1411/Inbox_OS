import json
import random
from typing import Dict, Any
from .llm_client import LLMClient
from ..core.schemas.email import EmailSchema

class PriorityScorer:
    """Scores emails based on their importance, actionability, and time-sensitivity."""
    
    def __init__(self, llm_client: LLMClient):
        self.llm_client = llm_client

    def score(self, email: EmailSchema, category: str) -> Dict[str, float]:
        """Generate priority_score, urgency_score, and actionability_score on 0-100 scale."""
        if self.llm_client.provider == "mock":
            return self._mock_score(email, category)

        system_prompt = (
            "You are an AI Email Priority Scorer.\n"
            "Score this email based on three dimensions, from 0.0 (lowest) to 100.0 (highest):\n"
            "1. \"priority_score\": overall importance to the user.\n"
            "2. \"urgency_score\": time-sensitivity (e.g. deadline is today/tomorrow vs next week).\n"
            "3. \"actionability_score\": requires clear action or task execution from the recipient.\n"
            "Return a JSON object containing these three scores as floats."
        )
        user_prompt = f"Category: {category}\nSubject: {email.subject}\nBody:\n{email.body_text}"
        
        try:
            raw_res = self.llm_client.query(system_prompt, user_prompt, json_mode=True)
            result = json.loads(raw_res)
            return {
                "priority_score": float(result.get("priority_score", 50.0)),
                "urgency_score": float(result.get("urgency_score", 50.0)),
                "actionability_score": float(result.get("actionability_score", 50.0))
            }
        except Exception:
            return {"priority_score": 50.0, "urgency_score": 50.0, "actionability_score": 50.0}

    def _mock_score(self, email: EmailSchema, category: str) -> Dict[str, float]:
        base_scores = {
            "otp": 95,
            "job": 88,
            "academic": 82,
            "meeting": 78,
            "finance": 72,
            "support": 60,
            "personal": 50,
            "newsletter": 15,
            "urgent": 97,
        }
        base = base_scores.get(category, 50.0)
        text = f"{email.subject} {email.body_text}".lower()
        
        urgency_boost = 0.0
        if any(w in text for w in ["urgent", "asap", "immediately", "critical", "emergency"]):
            urgency_boost += 15.0
        if any(w in text for w in ["tomorrow", "today", "deadline", "due", "by"]):
            urgency_boost += 10.0

        priority_score = min(100.0, base + urgency_boost + random.uniform(-3, 3))
        urgency_score = min(100.0, priority_score + random.uniform(-8, 8))
        actionability_score = min(100.0, priority_score * 0.85 + random.uniform(-4, 12))

        return {
            "priority_score": round(priority_score, 1),
            "urgency_score": round(urgency_score, 1),
            "actionability_score": round(actionability_score, 1)
        }
