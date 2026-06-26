from abc import ABC, abstractmethod
from typing import Dict, Any

class BaseAdapter(ABC):
    """
    Base interface for all outgoing delivery adapters (Telegram, WhatsApp, Slack, etc.).
    """

    @abstractmethod
    def send_notification(self, recipient: str, title: str, content: str, priority: str = "normal") -> Dict[str, Any]:
        """Send a real-time notification alert."""
        pass

    @abstractmethod
    def send_digest(self, recipient: str, digest_content: Dict[str, Any]) -> Dict[str, Any]:
        """Send a compiled summary digest."""
        pass
