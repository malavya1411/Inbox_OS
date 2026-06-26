import json
import re
from typing import Dict, Any
from .llm_client import LLMClient
from ..core.schemas.email import EmailSchema

class DataExtractor:
    """Extracts entities, action items, deadlines, amounts, and OTP codes from email content."""
    
    def __init__(self, llm_client: LLMClient):
        self.llm_client = llm_client

    def extract(self, email: EmailSchema, category: str) -> Dict[str, Any]:
        """Extract metadata maps matching the ExtractedDataSchema structure."""
        if self.llm_client.provider == "mock":
            return self._mock_extract(email, category)

        system_prompt = (
            "You are an AI Email Information Extractor.\n"
            "Analyze the email and extract the following structured entities as a JSON object:\n"
            "- \"entities\": List of objects with \"type\" (e.g. company, contact) and \"value\".\n"
            "- \"action_items\": List of objects with \"description\" (str) and \"deadline\" (str or null).\n"
            "- \"deadlines\": List of objects with \"label\" (str) and \"datetime\" (ISO string/description).\n"
            "- \"amounts\": List of objects with \"value\" (float), \"currency\" (str), and \"merchant\" (str).\n"
            "- \"links\": List of objects with \"url\" (str) and \"label\" (str).\n"
            "- \"otp_code\": String verification code if this is a verification or 2FA email.\n"
            "Ensure the output conforms exactly to this structure."
        )
        user_prompt = f"Category: {category}\nSubject: {email.subject}\nFrom: {email.sender_name}\nBody:\n{email.body_text}"

        try:
            raw_res = self.llm_client.query(system_prompt, user_prompt, json_mode=True)
            return json.loads(raw_res)
        except Exception:
            return {
                "entities": [],
                "action_items": [],
                "deadlines": [],
                "amounts": [],
                "links": [],
                "otp_code": None
            }

    def _mock_extract(self, email: EmailSchema, category: str) -> Dict[str, Any]:
        entities = []
        action_items = []
        deadlines = []
        amounts = []
        links = []
        otp_code = None

        text = email.body_text.lower()

        # Extract mock OTP
        if category == "otp":
            match = re.search(r'\b\d{5,6}\b', email.body_text)
            if match:
                otp_code = match.group(0)

        # Extract mock deadlines
        if "deadline" in text or "due" in text or "by" in text:
            deadlines.append({"label": "Action Deadline", "datetime": "See email details"})
            action_items.append({"description": f"Handle: {email.subject}", "deadline": "Imminent"})

        # Extract mock amounts
        if category == "finance":
            # search for currency symbol + numbers
            match = re.search(r'(?:₹|\$|usd|inr)\s*([\d,]+(?:\.\d{2})?)', text)
            val = 100.0
            if match:
                try:
                    val = float(match.group(1).replace(',', ''))
                except ValueError:
                    pass
            amounts.append({"value": val, "currency": "INR" if "₹" in email.body_text or "inr" in text else "USD", "merchant": email.sender_name or "Merchant"})

        return {
            "entities": entities,
            "action_items": action_items,
            "deadlines": deadlines,
            "amounts": amounts,
            "links": links,
            "otp_code": otp_code
        }
