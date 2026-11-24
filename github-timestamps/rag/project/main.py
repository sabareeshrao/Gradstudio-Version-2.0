from pathlib import Path
from loader import load_document


def main():
    print("RAG Application Started")

    document_path = Path(__file__).resolve().parent / "data" / "ai.txt"
    content = load_document(document_path)
    print(content)


if __name__ == "__main__":
    main()
