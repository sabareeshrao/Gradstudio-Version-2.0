from contextlib import asynccontextmanager
from pathlib import Path
from typing import Annotated, Literal

from fastapi import FastAPI, HTTPException, Request
from openai import OpenAIError
from pydantic import BaseModel, StringConstraints

from rag_service import RAGService


class AskRequest(BaseModel):
    question: Annotated[str, StringConstraints(
        strip_whitespace=True, min_length=1, max_length=2000
    )]


class Source(BaseModel):
    id: str
    source: str
    text: str


class AskResponse(BaseModel):
    status: Literal["answered", "no_context"]
    answer: str
    sources: list[Source]
    unknown_citations: list[str]
    citation_status: Literal[
        "id_match_only", "unknown_ids", "no_citations", "not_applicable"
    ]


@asynccontextmanager
async def lifespan(app: FastAPI):
    data_directory = Path(__file__).resolve().parent / "data"
    app.state.rag = RAGService(data_directory)
    yield


app = FastAPI(title="RAG from Scratch", lifespan=lifespan)


@app.get("/health")
def health():
    return {"status": "ready"}


@app.post("/ask", response_model=AskResponse)
def ask(payload: AskRequest, request: Request) -> AskResponse:
    try:
        result = request.app.state.rag.ask(payload.question)
        return AskResponse(**result)
    except (OpenAIError, ValueError):
        raise HTTPException(status_code=502, detail="Answer unavailable.") from None
