import json
from typing import Dict, Any
from .llm_client import LLMClient
from ..core.schemas.email import EmailSchema

CATEGORIES = ["academic", "job", "finance", "meeting", "otp", "newsletter", "personal", "support", "urgent"]

class CategoryClassifier:
    """Classifies incoming emails into predefined workflow categories."""
    
    def __init__(self, llm_client: LLMClient):
        self.llm_client = llm_client

    def classify(self, email: EmailSchema) -> Dict[str, Any]:
        """Classify an email's category and return category string and confidence."""
        if self.llm_client.provider == "mock":
            return self._mock_classify(email)

        system_prompt = (
            f"You are an AI Email Categorizer. Classify this email into exactly one of "
            f"the following categories: {', '.join(CATEGORIES)}.\n"
            f"Return a JSON object containing:\n"
            f"1. \"category\": (string, must be one of {CATEGORIES})\n"
            f"2. \"confidence\": (float between 0.0 and 1.0)\n"
            f"3. \"reasoning\": (string, short reasoning for classification)"
        )
        user_prompt = f"Subject: {email.subject}\nFrom: {email.sender_name} <{email.sender_email}>\nBody:\n{email.body_text}"
        
        try:
            raw_res = self.llm_client.query(system_prompt, user_prompt, json_mode=True)
            result = json.loads(raw_res)
            # Validate output
            if result.get("category") not in CATEGORIES:
                result["category"] = "personal"
            return {
                "category": result.get("category", "personal"),
                "confidence_score": float(result.get("confidence", 0.8)),
                "reasoning": result.get("reasoning", "Classified via active LLM model.")
            }
        except Exception:
            return {"category": "personal", "confidence_score": 0.5, "reasoning": "Fallback classification due to model error."}

    def _mock_classify(self, email: EmailSchema) -> Dict[str, Any]:
        text = f"{email.subject} {email.body_text} {email.sender_email}".lower()
        signals = {
            "academic": ["assignment", "project", "deadline", "professor", "university", "grade", "exam", "submission"],
            "job": ["interview", "offer", "recruiter", "position", "salary", "resume", "linkedin", "hiring"],
            "finance": ["payment", "invoice", "receipt", "transaction", "bank", "credit", "debit", "statement"],
            "meeting": ["meeting", "call", "zoom", "google meet", "schedule", "calendar", "invite"],
            "otp": ["otp", "verification", "code", "one-time", "authenticate", "2fa"],
            "newsletter": ["unsubscribe", "newsletter", "weekly digest", "update", "announcement", "blog"],
            "support": ["ticket", "support", "help", "issue", "problem", "customer service"],
        }
        scores = {}
        for cat, keywords in signals.items():
            scores[cat] = sum(1 for kw in keywords if kw in text)
        
        best = max(scores, key=scores.get)
        category = best if scores[best] > 0 else "personal"
        
        if "urgent" in text or "asap" in text or "immediately" in text:
            category = "urgent"

        reasoning = f"Mock classification matching keyword signals for category '{category}'."
        return {
            "category": category,
            "confidence_score": 0.95 if category != "personal" else 0.75,
            "reasoning": reasoning
        }
