from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from openai.types.responses import Response


def extract_answer(response: Response) -> str:
    if response.status != "completed":
        raise ValueError(f"LLM response is not complete: {response.status}")

    answer = response.output_text.strip()
    if not answer:
        raise ValueError("LLM returned no answer text")

    return answer
