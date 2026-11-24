def chunk_text(
    text: str, chunk_size: int = 20, overlap: int = 5
) -> list[str]:
    if chunk_size <= 0 or not 0 <= overlap < chunk_size:
        raise ValueError("Require 0 <= overlap < chunk_size")

    words = text.split()
    chunks = []
    step = chunk_size - overlap

    for start in range(0, len(words), step):
        end = start + chunk_size
        chunks.append(" ".join(words[start:end]))
        if end >= len(words):
            break

    return chunks


def create_chunks(source: str, text: str) -> list[dict[str, str]]:
    return [
        {"id": f"{source}:{index}", "source": source, "text": chunk}
        for index, chunk in enumerate(chunk_text(text), start=1)
    ]
