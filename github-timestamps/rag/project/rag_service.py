from pathlib import Path
from threading import Lock

from loader import load_documents
from preprocessor import clean_text
from chunker import create_chunks
from embedder import load_embedding_model, embed_texts
from retriever import retrieve_documents
from prompt_builder import build_prompt
from llm import create_llm_client, request_response
from answer import extract_answer
from citations import validate_citations


class RAGService:
    def __init__(self, data_directory: Path):
        documents = load_documents(data_directory)
        self.chunks = []
        for name, content in documents.items():
            self.chunks.extend(create_chunks(name, clean_text(content)))
        if not self.chunks:
            raise RuntimeError("No chunks to embed")
        self.model = load_embedding_model()
        self.embeddings = embed_texts(
            self.model, [chunk["text"] for chunk in self.chunks]
        )
        self.embedding_lock = Lock()

    def ask(self, question: str) -> dict:
        with self.embedding_lock:
            query = embed_texts(self.model, [question])[0]
        results = retrieve_documents(
            query, self.chunks, self.embeddings, top_k=3, min_score=0.35
        )
        if not results:
            return {
                "status": "no_context",
                "answer": "No relevant context found.",
                "sources": [],
                "unknown_citations": [],
                "citation_status": "not_applicable",
            }
        prompt = build_prompt(question, results)
        with create_llm_client() as client:
            response = request_response(client, prompt)
        answer = extract_answer(response)
        valid, unknown = validate_citations(answer, results)
        citation_status = "unknown_ids" if unknown else (
            "id_match_only" if valid else "no_citations"
        )
        return {
            "status": "answered",
            "answer": answer,
            "sources": valid,
            "unknown_citations": unknown,
            "citation_status": citation_status,
        }
