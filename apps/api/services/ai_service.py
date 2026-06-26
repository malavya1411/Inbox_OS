"""
Mock AI Service — returns deterministic, realistic responses.
Replace this with real LLM calls by swapping out the provider.

Interface is provider-agnostic: classify(), score(), extract(), summarize(), generate_reply()
"""

import random
from typing import Dict, Any


CATEGORIES = ["academic", "job", "finance", "meeting", "otp", "newsletter", "personal", "support", "urgent"]

CATEGORY_SIGNALS = {
    "academic": ["assignment", "project", "deadline", "professor", "university", "grade", "exam", "submission"],
    "job": ["interview", "offer", "recruiter", "position", "salary", "resume", "linkedin", "hiring"],
    "finance": ["payment", "invoice", "receipt", "transaction", "bank", "credit", "debit", "statement"],
    "meeting": ["meeting", "call", "zoom", "google meet", "schedule", "calendar", "invite"],
    "otp": ["otp", "verification", "code", "one-time", "authenticate", "2fa"],
    "newsletter": ["unsubscribe", "newsletter", "weekly digest", "update", "announcement", "blog"],
    "personal": ["hey", "hi", "hello", "friend", "family", "personal"],
    "support": ["ticket", "support", "help", "issue", "problem", "customer service"],
}

MOCK_SUMMARIES = {
    "academic": "This email contains an academic deadline or assignment notification requiring immediate attention.",
    "job": "A job opportunity or recruiter outreach requiring your response by the specified deadline.",
    "finance": "A financial notification including transaction details, payment confirmation, or invoice.",
    "meeting": "A meeting request or calendar invite that needs your acceptance or response.",
    "otp": "A one-time password or security verification code for account access.",
    "newsletter": "A newsletter or marketing email that can be safely added to your digest.",
    "personal": "A personal email from someone in your network.",
    "support": "A customer support or help desk communication.",
    "urgent": "An urgent email requiring immediate attention.",
}

MOCK_REPLIES = {
    "job": "Thank you for reaching out! I'm very interested in this opportunity. I'd be happy to discuss further — please let me know a convenient time for a call.",
    "meeting": "Thank you for the meeting invitation. I'll confirm my availability and get back to you shortly.",
    "academic": "Thank you for the reminder. I'm on track with the deadline and will submit on time.",
    "support": "Thank you for getting in touch. I've reviewed your message and will look into this right away.",
    "finance": "Thank you for the payment confirmation. I've noted the transaction details for my records.",
    "personal": "Thanks for reaching out! I'll get back to you soon.",
    "newsletter": "Thank you for the update.",
    "otp": "",  # No reply needed
}


def _detect_category(subject: str, body: str, sender: str) -> str:
    """Simple keyword-based categorization (replaced by LLM in production)."""
    text = f"{subject} {body} {sender}".lower()
    scores = {}
    for cat, keywords in CATEGORY_SIGNALS.items():
        scores[cat] = sum(1 for kw in keywords if kw in text)
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "personal"


def _score_priority(category: str, subject: str, body: str) -> float:
    """Score priority 0-100 based on category and urgency signals."""
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
    base = base_scores.get(category, 50)
    text = f"{subject} {body}".lower()
    urgency_boost = 0
    if any(w in text for w in ["urgent", "asap", "immediately", "critical", "emergency"]):
        urgency_boost += 15
    if any(w in text for w in ["tomorrow", "today", "deadline", "due", "by"]):
        urgency_boost += 10
    return min(100.0, base + urgency_boost + random.uniform(-5, 5))


def classify(subject: str, body: str, sender: str) -> Dict[str, Any]:
    """Classify an email and return structured analysis."""
    category = _detect_category(subject, body, sender)
    priority_score = _score_priority(category, subject, body)
    urgency_score = min(100.0, priority_score + random.uniform(-10, 10))
    actionability_score = min(100.0, priority_score * 0.8 + random.uniform(-5, 15))

    summary = MOCK_SUMMARIES.get(category, "An email requiring your review.")
    reasoning = (
        f"Classified as '{category}' based on sender domain, subject line keywords, "
        f"and body content analysis. Priority score of {priority_score:.0f}/100 assigned "
        f"based on urgency signals and category baseline."
    )

    # Extract mock entities
    entities = []
    if "deadline" in body.lower() or "due" in body.lower():
        entities.append({"type": "deadline", "value": "See email for specific date"})
    if "@" in sender:
        entities.append({"type": "sender_domain", "value": sender.split("@")[-1]})

    action_items = []
    if priority_score > 60:
        action_items.append({"description": f"Review and respond to: {subject}", "deadline": None})
    if category == "meeting":
        action_items.append({"description": "Accept or decline meeting invitation", "deadline": None})

    return {
        "category": category,
        "priority_score": round(priority_score, 1),
        "urgency_score": round(urgency_score, 1),
        "actionability_score": round(actionability_score, 1),
        "confidence_score": round(random.uniform(0.75, 0.98), 2),
        "summary": summary,
        "reasoning": reasoning,
        "suggested_reply": MOCK_REPLIES.get(category, ""),
        "extracted_data": {
            "entities": entities,
            "action_items": action_items,
            "deadlines": [],
            "amounts": [],
            "links": [],
        },
    }


def generate_reply(email_subject: str, email_body: str, category: str, tone: str = "professional", instructions: str = "") -> str:
    """Generate a reply draft. Mock implementation — replace with LLM call."""
    base = MOCK_REPLIES.get(category, "Thank you for your email. I will get back to you shortly.")

    if tone == "brief":
        return f"Got it. {base.split('.')[0]}."
    elif tone == "casual":
        return f"Hey! {base}"
    else:
        return base

    if instructions:
        return f"{base}\n\n[Note: {instructions}]"

    return base


# Provider-agnostic interface for future LLM integration
class LLMClient:
    """
    Abstract LLM client interface.
    Swap the implementation to use OpenAI, Gemini, or Ollama.
    """

    def __init__(self, provider: str = "mock"):
        self.provider = provider

    def analyze(self, subject: str, body: str, sender: str) -> Dict[str, Any]:
        if self.provider == "mock":
            return classify(subject, body, sender)
        elif self.provider == "openai":
            raise NotImplementedError("OpenAI provider: implement in packages/intelligence/llm_client.py")
        elif self.provider == "gemini":
            raise NotImplementedError("Gemini provider: implement in packages/intelligence/llm_client.py")
        elif self.provider == "ollama":
            raise NotImplementedError("Ollama provider: implement in packages/intelligence/llm_client.py")
        else:
            return classify(subject, body, sender)

    def generate_reply(self, subject: str, body: str, category: str, tone: str = "professional", instructions: str = "") -> str:
        if self.provider == "mock":
            return generate_reply(subject, body, category, tone, instructions)
        raise NotImplementedError(f"Provider {self.provider} not yet implemented")
