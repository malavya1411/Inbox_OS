import json
from typing import Dict, Any
from .llm_client import LLMClient
from ..core.schemas.email import EmailSchema

class EmailSummarizer:
    """Generates concise text summaries and suggested response drafts."""
    
    def __init__(self, llm_client: LLMClient):
        self.llm_client = llm_client

    def summarize(self, email: EmailSchema, category: str) -> Dict[str, str]:
        """Generate summary and draft replies."""
        if self.llm_client.provider == "mock":
            return self._mock_summarize(email, category)

        system_prompt = (
            "You are an AI Email Summarizer and Assistant.\n"
            "Analyze the email and return a JSON object with:\n"
            "1. \"summary\": (string, single-sentence summary of the email's core purpose)\n"
            "2. \"suggested_reply\": (string, polite draft response matching the content, or empty if none needed)"
        )
        user_prompt = f"Category: {category}\nSubject: {email.subject}\nBody:\n{email.body_text}"

        try:
            raw_res = self.llm_client.query(system_prompt, user_prompt, json_mode=True)
            result = json.loads(raw_res)
            return {
                "summary": result.get("summary", "Review required for incoming message."),
                "suggested_reply": result.get("suggested_reply", "")
            }
        except Exception:
            return {"summary": "Email received.", "suggested_reply": ""}

    def _mock_summarize(self, email: EmailSchema, category: str) -> Dict[str, str]:
        mock_summaries = {
            "academic": "Academic notice containing submission guidelines or curriculum deadline details.",
            "job": "Recruitment outreach or interview slot selection task.",
            "finance": "Financial payment receipt or transaction invoice alert.",
            "meeting": "Calendar invitation and schedule confirmation details.",
            "otp": "Security 2FA verification one-time password code.",
            "newsletter": "Product weekly updates digest and informational blog newsletter.",
            "personal": "Personal correspondence note.",
            "support": "Customer care support ticket update.",
            "urgent": "Time-sensitive message requiring immediate inspection.",
        }
        
        mock_replies = {
            "job": "Thank you for the update! I am very interested and will review the details to schedule a slot.",
            "meeting": "Confirmed receipt. I have added this design review to my calendar.",
            "academic": "Thank you for the reminder. I am finalizing my submission details.",
            "support": "Thanks for getting back to me. I'll test these steps and update you.",
            "finance": "Payment receipt saved to records.",
            "personal": "Thanks for reaching out! Let's connect soon.",
            "newsletter": "",
            "otp": "",
        }

        # Override with some specific subject signals if matching mock.js subjects
        subject_lower = email.subject.lower()
        summary = mock_summaries.get(category, "Email requires your attention.")
        
        if "dbms" in subject_lower:
            summary = "DBMS mini-project deadline is tonight at 11:59 PM. No extensions."
        elif "stripe" in subject_lower:
            summary = "Stripe recruiting: Technical interview invitation for SWE Intern role. Action required by Friday."
        elif "udemy" in subject_lower:
            summary = "Payment confirmation: ₹2,499 to Udemy via Razorpay."
        elif "verification" in subject_lower:
            summary = "Google verification OTP. Expires in 10 minutes."
        elif "offer" in subject_lower:
            summary = "Job offer from StartupXYZ — ₹18 LPA + equity. Respond by July 3."

        reply = mock_replies.get(category, "")
        if "dbms" in subject_lower:
            reply = "Dear Prof. Sharma,\n\nThank you for the reminder. I will submit the project before the deadline tonight.\n\nBest regards,\nAlex"
        elif "stripe" in subject_lower:
            reply = "Hi! Thank you so much for this opportunity at Stripe. I'm very excited to proceed. I'll select an interview slot right away."

        return {
            "summary": summary,
            "suggested_reply": reply
        }
