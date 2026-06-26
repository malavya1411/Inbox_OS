import httpx
from typing import Dict, Any, Optional

class LLMClient:
    """
    Unified LLM Client interface supporting multiple backends.
    Translates structured extraction, classification, and reply tasks into model-specific API calls.
    """

    def __init__(self, provider: str = "mock", api_key: str = "", base_url: str = ""):
        self.provider = provider.lower()
        self.api_key = api_key
        self.base_url = base_url

    def query(self, system_prompt: str, user_prompt: str, json_mode: bool = False) -> str:
        """Execute a query against the configured provider."""
        if self.provider == "mock":
            return "{}" if json_mode else "Mock response"
        
        if self.provider == "openai":
            return self._query_openai(system_prompt, user_prompt, json_mode)
            
        if self.provider == "gemini":
            return self._query_gemini(system_prompt, user_prompt, json_mode)

        if self.provider == "ollama":
            return self._query_ollama(system_prompt, user_prompt, json_mode)

        raise ValueError(f"Unknown AI provider: {self.provider}")

    def _query_openai(self, system_prompt: str, user_prompt: str, json_mode: bool) -> str:
        # standard openai chat endpoint
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "response_format": {"type": "json_object"} if json_mode else {"type": "text"}
        }
        try:
            with httpx.Client() as client:
                res = client.post(url, headers=headers, json=payload, timeout=30.0)
                res.raise_for_status()
                return res.json()["choices"][0]["message"]["content"]
        except Exception as e:
            return f"{{\"error\": \"OpenAI query failed: {str(e)}\"}}" if json_mode else f"OpenAI error: {str(e)}"

    def _query_gemini(self, system_prompt: str, user_prompt: str, json_mode: bool) -> str:
        # gemini api endpoint
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.api_key}"
        headers = {"Content-Type": "application/json"}
        
        # Combine system prompt with instructions
        payload = {
            "contents": [{
                "parts": [{"text": f"System Instructions:\n{system_prompt}\n\nUser Request:\n{user_prompt}"}]
            }]
        }
        if json_mode:
            payload["generationConfig"] = {"responseMimeType": "application/json"}

        try:
            with httpx.Client() as client:
                res = client.post(url, headers=headers, json=payload, timeout=30.0)
                res.raise_for_status()
                return res.json()["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            return f"{{\"error\": \"Gemini query failed: {str(e)}\"}}" if json_mode else f"Gemini error: {str(e)}"

    def _query_ollama(self, system_prompt: str, user_prompt: str, json_mode: bool) -> str:
        # ollama localhost endpoint
        url = f"{self.base_url.rstrip('/')}/api/chat"
        payload = {
            "model": "llama3",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "stream": False
        }
        if json_mode:
            payload["format"] = "json"

        try:
            with httpx.Client() as client:
                res = client.post(url, json=payload, timeout=45.0)
                res.raise_for_status()
                return res.json()["message"]["content"]
        except Exception as e:
            return f"{{\"error\": \"Ollama query failed: {str(e)}\"}}" if json_mode else f"Ollama error: {str(e)}"
