from pathlib import Path
from loader import load_documents
from preprocessor import clean_text


def main():
    print("RAG Application Started")

    data_directory = Path(__file__).resolve().parent / "data"
    documents = load_documents(data_directory)
    print(f"Loaded {len(documents)} documents")
    for name, content in documents.items():
        cleaned_content = clean_text(content)
        print(f"\nSource: {name}")
        print(cleaned_content)


if __name__ == "__main__":
    main()
