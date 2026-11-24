import json
from pathlib import Path

import numpy as np


def validate_store(chunks: list[dict[str, str]], embeddings: np.ndarray) -> None:
    if embeddings.ndim != 2 or embeddings.shape[1] == 0:
        raise ValueError("Embeddings must be a nonempty-width matrix")
    if len(chunks) != embeddings.shape[0]:
        raise ValueError("Chunk count and vector count must match")
    if not np.isfinite(embeddings).all():
        raise ValueError("Embeddings contain non-finite values")


def save_vector_store(directory, chunks, embeddings, model_name):
    validate_store(chunks, embeddings)
    directory.mkdir(parents=True, exist_ok=True)

    np.save(directory / "embeddings.npy", embeddings, allow_pickle=False)
    metadata = {"model_name": model_name, "chunks": chunks}
    (directory / "chunks.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def load_vector_store(directory: Path, model_name: str):
    metadata = json.loads(
        (directory / "chunks.json").read_text(encoding="utf-8")
    )
    if metadata["model_name"] != model_name:
        raise ValueError("Embedding model mismatch")

    chunks = metadata["chunks"]
    embeddings = np.load(directory / "embeddings.npy", allow_pickle=False)
    validate_store(chunks, embeddings)
    return chunks, embeddings
