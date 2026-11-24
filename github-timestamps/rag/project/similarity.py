import numpy as np


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    if a.ndim != 1 or b.ndim != 1 or a.shape != b.shape or a.size == 0:
        raise ValueError("Expected equal-length nonempty vectors")
    if not np.isfinite(a).all() or not np.isfinite(b).all():
        raise ValueError("Vectors must contain finite values")

    a = a.astype(np.float64)
    b = b.astype(np.float64)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)

    if norm_a == 0 or norm_b == 0:
        raise ValueError("Cosine similarity is undefined for zero vectors")

    dot_product = np.dot(a, b)
    score = dot_product / (norm_a * norm_b)
    return float(np.clip(score, -1.0, 1.0))


def cosine_scores(query: np.ndarray, matrix: np.ndarray) -> np.ndarray:
    if query.ndim != 1 or matrix.ndim != 2:
        raise ValueError("Expected a query vector and an embedding matrix")
    if query.size == 0 or matrix.shape[1] != query.size:
        raise ValueError("Embedding dimensions must match")

    return np.array([cosine_similarity(query, row) for row in matrix])
