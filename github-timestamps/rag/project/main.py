from pathlib import Path
from loader import load_documents
from preprocessor import clean_text
from chunker import create_chunks
from embedder import load_embedding_model, embed_texts


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
    if not all_chunks:
        print("No chunks to embed.")
        return

    texts = [chunk["text"] for chunk in all_chunks]
    model = load_embedding_model()
    embeddings = embed_texts(model, texts)

    print(f"Embedding matrix shape: {embeddings.shape}")
    for chunk, vector in zip(all_chunks, embeddings, strict=True):
        print(f"{chunk['id']}: {len(vector)} dimensions")

    print("First vector (first 5 values):", embeddings[0][:5])


if __name__ == "__main__":
    main()
