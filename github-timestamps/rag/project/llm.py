import os

from openai import OpenAI
from openai.types.responses import Response

LLM_MODEL = "gpt-6-luna"


def create_llm_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        raise ValueError("Set OPENAI_API_KEY before running the application")

    return OpenAI(api_key=api_key, timeout=30.0, max_retries=0)


def request_response(client: OpenAI, prompt: dict[str, str]) -> Response:
    model = os.getenv("OPENAI_MODEL", LLM_MODEL).strip() or LLM_MODEL
    return client.responses.create(
        model=model,
        instructions=prompt["system"],
        input=prompt["user"],
        max_output_tokens=512,
        store=False,
    )
