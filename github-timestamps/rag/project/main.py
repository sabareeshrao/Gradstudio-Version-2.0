from pathlib import Path
from loader import load_documents
from preprocessor import clean_text
from chunker import create_chunks
from embedder import load_embedding_model, embed_texts, MODEL_NAME
from vector_store import save_vector_store, load_vector_store
from retriever import retrieve_documents
from prompt_builder import build_prompt
from llm import create_llm_client, request_response


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

    storage_directory = data_directory.parent / "storage"
    save_vector_store(storage_directory, all_chunks, embeddings, MODEL_NAME)
    print("Vector store saved.")

    saved_chunks, saved_embeddings = load_vector_store(
        storage_directory, MODEL_NAME
    )
    print(f"Reloaded {len(saved_chunks)} chunks")
    print(f"Reloaded matrix shape: {saved_embeddings.shape}")

    question = input("\nAsk a question: ").strip()
    if not question:
        print("Question cannot be empty.")
        return

    query = embed_texts(model, [question])[0]
    results = retrieve_documents(
        query, saved_chunks, saved_embeddings, top_k=3, min_score=0.35
    )
    if not results:
        print("No relevant context found.")
        return

    print(f"\nRetrieved {len(results)} relevant chunks:")
    prompt = build_prompt(question, results)
    client = create_llm_client()
    response = request_response(client, prompt)
    print(f"\nLLM response status: {response.status}")


if __name__ == "__main__":
    main()
