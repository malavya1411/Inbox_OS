import httpx
from typing import Dict, Any
from ..base import BaseAdapter

class WhatsAppAdapter(BaseAdapter):
    """Deliver alerts and digests directly to users on WhatsApp via Twilio's API."""

    def __init__(self, account_sid: str = "", auth_token: str = "", from_number: str = "whatsapp:+14155238886"):
        self.account_sid = account_sid
        self.auth_token = auth_token
        self.from_number = from_number

    def send_notification(self, recipient: str, title: str, content: str, priority: str = "normal") -> Dict[str, Any]:
        """Send message payload to WhatsApp receiver phone number."""
        if not self.account_sid or not self.auth_token or not recipient:
            # Mock mode or unconfigured status
            return {
                "status": "success",
                "mode": "mock",
                "recipient": recipient,
                "message": f"WhatsApp Alert: [{title}] {content}"
            }

        url = f"https://api.twilio.com/2010-04-01/Accounts/{self.account_sid}/Messages.json"
        
        # Ensure recipient is prefixed with whatsapp:
        to_number = recipient if recipient.startswith("whatsapp:") else f"whatsapp:{recipient}"
        
        payload = {
            "To": to_number,
            "From": self.from_number,
            "Body": f"*{title}*\n\n{content}"
        }

        try:
            with httpx.Client() as client:
                res = client.post(
                    url,
                    data=payload,
                    auth=(self.account_sid, self.auth_token),
                    timeout=10.0
                )
                res.raise_for_status()
                return {"status": "success", "mode": "live", "message_sid": res.json()["sid"]}
        except Exception as e:
            return {"status": "failed", "error": f"WhatsApp Twilio delivery failed: {str(e)}"}

    def send_digest(self, recipient: str, digest_content: Dict[str, Any]) -> Dict[str, Any]:
        """Send aggregated briefing reports."""
        title = "Daily Summary Briefing"
        bullets = []
        for cat, items in digest_content.get("categories", {}).items():
            bullets.append(f"\n*📂 {cat.upper()}*")
            for item in items[:3]:
                bullets.append(f"• {item.get('subject', 'No Subject')}")

        full_content = "\n".join(bullets)
        return self.send_notification(recipient, title, full_content, priority="digest")
