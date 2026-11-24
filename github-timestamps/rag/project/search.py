import numpy as np
from similarity import cosine_scores


def semantic_search(
    query: np.ndarray,
    chunks: list[dict[str, str]],
    embeddings: np.ndarray,
    top_k: int = 3,
) -> list[dict[str, str | float]]:
    if top_k <= 0:
        raise ValueError("top_k must be positive")
    if len(chunks) != len(embeddings):
        raise ValueError("Chunk count and vector count must match")

    scores = cosine_scores(query, embeddings)
    ranked_indices = np.argsort(-scores, kind="stable")[:top_k]

    return [
        {**chunks[index], "score": float(scores[index])}
        for index in ranked_indices
    ]
