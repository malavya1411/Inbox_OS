from abc import ABC, abstractmethod
from typing import List, Optional
from datetime import datetime
from ..schemas.email import EmailSchema

class BaseConnector(ABC):
    """
    Abstract Base Class for all Email Connectors (Gmail, Outlook, IMAP).
    Inheriting classes must implement authentication, sync, and lifecycle actions.
    """

    @abstractmethod
    def authenticate(self, credentials: dict) -> bool:
        """Authenticate with the email provider API or IMAP server."""
        pass

    @abstractmethod
    def fetch_new(self, since: Optional[datetime] = None) -> List[EmailSchema]:
        """Fetch new emails from the provider since the specified timestamp."""
        pass

    @abstractmethod
    def mark_read(self, provider_message_id: str) -> bool:
        """Mark the specified email as read on the provider's server."""
        pass

    @abstractmethod
    def get_thread(self, thread_id: str) -> List[EmailSchema]:
        """Fetch all messages inside a thread for context analysis."""
        pass
