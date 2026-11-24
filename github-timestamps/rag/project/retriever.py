import numpy as np
from search import semantic_search


def retrieve_documents(
    query: np.ndarray,
    chunks: list[dict[str, str]],
    embeddings: np.ndarray,
    top_k: int = 3,
    min_score: float = 0.35,
) -> list[dict[str, str | float]]:
    if not -1.0 <= min_score <= 1.0:
        raise ValueError("min_score must be between -1 and 1")

    candidates = semantic_search(query, chunks, embeddings, top_k=top_k)
    return [result for result in candidates if result["score"] >= min_score]
