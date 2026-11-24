from pathlib import Path
from loader import load_documents
from preprocessor import clean_text
from chunker import create_chunks


def main():
    print("RAG Application Started")

    data_directory = Path(__file__).resolve().parent / "data"
    documents = load_documents(data_directory)
    print(f"Loaded {len(documents)} documents")
    all_chunks = []
    for name, content in documents.items():
        cleaned_content = clean_text(content)
        all_chunks.extend(create_chunks(name, cleaned_content))

    print(f"Created {len(all_chunks)} chunks")
    for chunk in all_chunks:
        print(f"\nChunk: {chunk['id']}")
        print(f"Source: {chunk['source']}")
        print(chunk["text"])


if __name__ == "__main__":
    main()
