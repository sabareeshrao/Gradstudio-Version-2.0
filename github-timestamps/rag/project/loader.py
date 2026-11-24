from pathlib import Path


def load_document(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def load_documents(directory: Path) -> dict[str, str]:
    documents = {}
    for path in sorted(directory.glob("*.txt")):
        if path.is_file():
            documents[path.name] = load_document(path)
    return documents
