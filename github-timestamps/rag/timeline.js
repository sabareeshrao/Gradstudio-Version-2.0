export const project = {
  "name": "rag-from-scratch",
  "startMinute": 1,
  "stages": [
    {
      "id": 1,
      "title": "Project initialization and entry point",
      "actions": [
        {
          "kind": "terminal",
          "command": "python --version",
          "output": "Python 3.12.4 (example)",
          "label": "Check Python version"
        },
        {
          "kind": "terminal",
          "command": "mkdir rag-from-scratch",
          "label": "Create project directory"
        },
        {
          "kind": "terminal",
          "command": "cd rag-from-scratch",
          "label": "Enter project directory"
        },
        {
          "kind": "terminal",
          "command": "code .",
          "label": "Open VS Code"
        },
        {
          "kind": "terminal",
          "command": "python -m venv .venv",
          "label": "Create isolated Python environment"
        },
        {
          "kind": "terminal",
          "command": ".\\.venv\\Scripts\\Activate.ps1",
          "label": "Activate environment (PowerShell; macOS/Linux: source .venv/bin/activate)"
        },
        {
          "kind": "create",
          "file": "main.py",
          "language": "python",
          "command": "VS Code Explorer: New File → main.py",
          "label": "Create main.py"
        },
        {
          "kind": "add",
          "file": "main.py",
          "at": 0,
          "text": "def main():",
          "label": "Write Python source line"
        },
        {
          "kind": "add",
          "file": "main.py",
          "at": 1,
          "text": "    print(\"RAG Application Started\")",
          "label": "Write Python source line"
        },
        {
          "kind": "add",
          "file": "main.py",
          "at": 2,
          "text": "",
          "label": "Write Python source line"
        },
        {
          "kind": "add",
          "file": "main.py",
          "at": 3,
          "text": "",
          "label": "Write Python source line"
        },
        {
          "kind": "add",
          "file": "main.py",
          "at": 4,
          "text": "if __name__ == \"__main__\":",
          "label": "Write Python source line"
        },
        {
          "kind": "add",
          "file": "main.py",
          "at": 5,
          "text": "    main()",
          "label": "Write Python source line"
        },
        {
          "kind": "terminal",
          "command": "python main.py",
          "output": "RAG Application Started",
          "label": "Expected output — verify locally"
        }
      ]
    },
    {
      "id": 2,
      "title": "Knowledge base and document loading",
      "actions": [
        {
          "kind": "terminal",
          "command": "mkdir data",
          "label": "Create knowledge base directory"
        },
        {
          "kind": "create",
          "file": "data/ai.txt",
          "language": "text",
          "command": "VS Code Explorer: data → New File → ai.txt",
          "label": "Create knowledge document"
        },
        {
          "kind": "add",
          "file": "data/ai.txt",
          "at": 0,
          "text": "Artificial intelligence enables machines to perform tasks that normally require human intelligence.",
          "label": "Write source line"
        },
        {
          "kind": "add",
          "file": "data/ai.txt",
          "at": 1,
          "text": "",
          "label": "Write source line"
        },
        {
          "kind": "add",
          "file": "data/ai.txt",
          "at": 2,
          "text": "Machine learning is a subset of artificial intelligence that learns patterns from data.",
          "label": "Write source line"
        },
        {
          "kind": "add",
          "file": "data/ai.txt",
          "at": 3,
          "text": "",
          "label": "Write source line"
        },
        {
          "kind": "add",
          "file": "data/ai.txt",
          "at": 4,
          "text": "Retrieval-Augmented Generation retrieves relevant information from external documents before generating an answer.",
          "label": "Write source line"
        },
        {
          "kind": "create",
          "file": "loader.py",
          "language": "python",
          "command": "VS Code Explorer: New File → loader.py",
          "label": "Create document loader"
        },
        {
          "kind": "add",
          "file": "loader.py",
          "at": 0,
          "text": "from pathlib import Path",
          "label": "Write source line"
        },
        {
          "kind": "add",
          "file": "loader.py",
          "at": 1,
          "text": "",
          "label": "Write source line"
        },
        {
          "kind": "add",
          "file": "loader.py",
          "at": 2,
          "text": "",
          "label": "Write source line"
        },
        {
          "kind": "add",
          "file": "loader.py",
          "at": 3,
          "text": "def load_document(path: Path) -> str:",
          "label": "Write source line"
        },
        {
          "kind": "add",
          "file": "loader.py",
          "at": 4,
          "text": "    return path.read_text(encoding=\"utf-8\")",
          "label": "Write source line"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 0,
          "text": "from pathlib import Path",
          "label": "Integrate document loader"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 1,
          "text": "from loader import load_document",
          "label": "Integrate document loader"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 2,
          "text": "",
          "label": "Integrate document loader"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 3,
          "text": "",
          "label": "Integrate document loader"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 6,
          "text": "",
          "label": "Integrate document loader"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 7,
          "text": "    document_path = Path(__file__).resolve().parent / \"data\" / \"ai.txt\"",
          "label": "Integrate document loader"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 8,
          "text": "    content = load_document(document_path)",
          "label": "Integrate document loader"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 9,
          "text": "    print(content)",
          "label": "Integrate document loader"
        },
        {
          "kind": "terminal",
          "command": "python main.py",
          "output": "RAG Application Started\nArtificial intelligence enables machines to perform tasks that normally require human intelligence.\n\nMachine learning is a subset of artificial intelligence that learns patterns from data.\n\nRetrieval-Augmented Generation retrieves relevant information from external documents before generating an answer.\n",
          "label": "Expected output — verify locally"
        }
      ]
    },
    {
      "id": 3,
      "title": "Multiple document loading",
      "actions": [
        {
          "kind": "create",
          "file": "data/llm.txt",
          "language": "text",
          "command": "VS Code Explorer: data → New File → llm.txt",
          "label": "Create knowledge document"
        },
        {
          "kind": "add",
          "file": "data/llm.txt",
          "at": 0,
          "text": "A large language model is trained on large amounts of text.",
          "label": "Write document line"
        },
        {
          "kind": "add",
          "file": "data/llm.txt",
          "at": 1,
          "text": "",
          "label": "Write document line"
        },
        {
          "kind": "add",
          "file": "data/llm.txt",
          "at": 2,
          "text": "Tokens are the units of text processed by a language model.",
          "label": "Write document line"
        },
        {
          "kind": "add",
          "file": "data/llm.txt",
          "at": 3,
          "text": "",
          "label": "Write document line"
        },
        {
          "kind": "add",
          "file": "data/llm.txt",
          "at": 4,
          "text": "Transformers use attention mechanisms to process relationships between tokens.",
          "label": "Write document line"
        },
        {
          "kind": "create",
          "file": "data/rag.txt",
          "language": "text",
          "command": "VS Code Explorer: data → New File → rag.txt",
          "label": "Create knowledge document"
        },
        {
          "kind": "add",
          "file": "data/rag.txt",
          "at": 0,
          "text": "Document chunking divides large documents into smaller sections.",
          "label": "Write document line"
        },
        {
          "kind": "add",
          "file": "data/rag.txt",
          "at": 1,
          "text": "",
          "label": "Write document line"
        },
        {
          "kind": "add",
          "file": "data/rag.txt",
          "at": 2,
          "text": "Embeddings represent text as numerical vectors.",
          "label": "Write document line"
        },
        {
          "kind": "add",
          "file": "data/rag.txt",
          "at": 3,
          "text": "",
          "label": "Write document line"
        },
        {
          "kind": "add",
          "file": "data/rag.txt",
          "at": 4,
          "text": "Semantic search retrieves information based on meaning rather than exact keyword matches.",
          "label": "Write document line"
        },
        {
          "kind": "insert",
          "file": "loader.py",
          "at": 5,
          "text": "",
          "label": "Add automatic document loading"
        },
        {
          "kind": "insert",
          "file": "loader.py",
          "at": 6,
          "text": "",
          "label": "Add automatic document loading"
        },
        {
          "kind": "insert",
          "file": "loader.py",
          "at": 7,
          "text": "def load_documents(directory: Path) -> dict[str, str]:",
          "label": "Add automatic document loading"
        },
        {
          "kind": "insert",
          "file": "loader.py",
          "at": 8,
          "text": "    documents = {}",
          "label": "Add automatic document loading"
        },
        {
          "kind": "insert",
          "file": "loader.py",
          "at": 9,
          "text": "    for path in sorted(directory.glob(\"*.txt\")):",
          "label": "Add automatic document loading"
        },
        {
          "kind": "insert",
          "file": "loader.py",
          "at": 10,
          "text": "        if path.is_file():",
          "label": "Add automatic document loading"
        },
        {
          "kind": "insert",
          "file": "loader.py",
          "at": 11,
          "text": "            documents[path.name] = load_document(path)",
          "label": "Add automatic document loading"
        },
        {
          "kind": "insert",
          "file": "loader.py",
          "at": 12,
          "text": "    return documents",
          "label": "Add automatic document loading"
        },
        {
          "kind": "strike",
          "file": "main.py",
          "at": 1,
          "label": "Mark obsolete line"
        },
        {
          "kind": "remove",
          "file": "main.py",
          "at": 1,
          "label": "Remove obsolete line"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 1,
          "text": "from loader import load_documents",
          "label": "Import collection loader"
        },
        {
          "kind": "strike",
          "file": "main.py",
          "at": 7,
          "label": "Mark obsolete line"
        },
        {
          "kind": "remove",
          "file": "main.py",
          "at": 7,
          "label": "Remove obsolete line"
        },
        {
          "kind": "strike",
          "file": "main.py",
          "at": 7,
          "label": "Mark obsolete line"
        },
        {
          "kind": "remove",
          "file": "main.py",
          "at": 7,
          "label": "Remove obsolete line"
        },
        {
          "kind": "strike",
          "file": "main.py",
          "at": 7,
          "label": "Mark obsolete line"
        },
        {
          "kind": "remove",
          "file": "main.py",
          "at": 7,
          "label": "Remove obsolete line"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 7,
          "text": "    data_directory = Path(__file__).resolve().parent / \"data\"",
          "label": "Integrate collection loading"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 8,
          "text": "    documents = load_documents(data_directory)",
          "label": "Integrate collection loading"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 9,
          "text": "    print(f\"Loaded {len(documents)} documents\")",
          "label": "Integrate collection loading"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 10,
          "text": "    for name, content in documents.items():",
          "label": "Integrate collection loading"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 11,
          "text": "        print(f\"\\nSource: {name}\")",
          "label": "Integrate collection loading"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 12,
          "text": "        print(content)",
          "label": "Integrate collection loading"
        },
        {
          "kind": "terminal",
          "command": "python main.py",
          "output": "RAG Application Started\nLoaded 3 documents\n\nSource: ai.txt\nArtificial intelligence enables machines to perform tasks that normally require human intelligence.\n\nMachine learning is a subset of artificial intelligence that learns patterns from data.\n\nRetrieval-Augmented Generation retrieves relevant information from external documents before generating an answer.\n\n\nSource: llm.txt\nA large language model is trained on large amounts of text.\n\nTokens are the units of text processed by a language model.\n\nTransformers use attention mechanisms to process relationships between tokens.\n\n\nSource: rag.txt\nDocument chunking divides large documents into smaller sections.\n\nEmbeddings represent text as numerical vectors.\n\nSemantic search retrieves information based on meaning rather than exact keyword matches.\n\n",
          "label": "Expected output — verify locally"
        }
      ]
    },
    {
      "id": 4,
      "title": "Text preprocessing and whitespace normalization",
      "actions": [
        {
          "kind": "create",
          "file": "preprocessor.py",
          "language": "python",
          "command": "VS Code Explorer: New File → preprocessor.py",
          "label": "Create preprocessing module"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 0,
          "text": "import re",
          "label": "Write preprocessing code"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 1,
          "text": "",
          "label": "Write preprocessing code"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 2,
          "text": "",
          "label": "Write preprocessing code"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 3,
          "text": "def clean_text(text: str) -> str:",
          "label": "Write preprocessing code"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 4,
          "text": "    text = text.replace(\"\\r\\n\", \"\\n\").replace(\"\\r\", \"\\n\")",
          "label": "Write preprocessing code"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 5,
          "text": "    text = re.sub(r\"[^\\S\\n]+\", \" \", text)",
          "label": "Write preprocessing code"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 6,
          "text": "    text = re.sub(r\" *\\n *\", \"\\n\", text)",
          "label": "Write preprocessing code"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 7,
          "text": "    text = re.sub(r\"\\n{3,}\", \"\\n\\n\", text)",
          "label": "Write preprocessing code"
        },
        {
          "kind": "add",
          "file": "preprocessor.py",
          "at": 8,
          "text": "    return text.strip()",
          "label": "Write preprocessing code"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 2,
          "text": "from preprocessor import clean_text",
          "label": "Import preprocessing function"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 12,
          "text": "        cleaned_content = clean_text(content)",
          "label": "Clean each document"
        },
        {
          "kind": "strike",
          "file": "main.py",
          "at": 14,
          "label": "Mark raw output line"
        },
        {
          "kind": "remove",
          "file": "main.py",
          "at": 14,
          "label": "Remove raw output line"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 14,
          "text": "        print(cleaned_content)",
          "label": "Print normalized text"
        },
        {
          "kind": "terminal",
          "command": "python -c \"from preprocessor import clean_text; print(repr(clean_text('  Artificial    Intelligence\\r\\n\\t is powerful.\\n\\n\\nMachine Learning  ')))\"",
          "output": "'Artificial Intelligence\\nis powerful.\\n\\nMachine Learning'",
          "label": "Test whitespace normalization"
        },
        {
          "kind": "terminal",
          "command": "python main.py",
          "output": "RAG Application Started\nLoaded 3 documents\n\nSource: ai.txt\nArtificial intelligence enables machines to perform tasks that normally require human intelligence.\n\nMachine learning is a subset of artificial intelligence that learns patterns from data.\n\nRetrieval-Augmented Generation retrieves relevant information from external documents before generating an answer.\n\n\nSource: llm.txt\nA large language model is trained on large amounts of text.\n\nTokens are the units of text processed by a language model.\n\nTransformers use attention mechanisms to process relationships between tokens.\n\n\nSource: rag.txt\nDocument chunking divides large documents into smaller sections.\n\nEmbeddings represent text as numerical vectors.\n\nSemantic search retrieves information based on meaning rather than exact keyword matches.",
          "label": "Expected output — verify locally"
        }
      ]
    },
    {
      "id": 5,
      "title": "Word-based text chunking with overlap and source metadata",
      "actions": [
        {
          "kind": "create",
          "file": "chunker.py",
          "language": "python",
          "command": "VS Code Explorer: New File → chunker.py",
          "label": "Create chunking module"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 0,
          "text": "def chunk_text(",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 1,
          "text": "    text: str, chunk_size: int = 20, overlap: int = 5",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 2,
          "text": ") -> list[str]:",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 3,
          "text": "    if chunk_size <= 0 or not 0 <= overlap < chunk_size:",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 4,
          "text": "        raise ValueError(\"Require 0 <= overlap < chunk_size\")",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 5,
          "text": "",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 6,
          "text": "    words = text.split()",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 7,
          "text": "    chunks = []",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 8,
          "text": "    step = chunk_size - overlap",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 9,
          "text": "",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 10,
          "text": "    for start in range(0, len(words), step):",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 11,
          "text": "        end = start + chunk_size",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 12,
          "text": "        chunks.append(\" \".join(words[start:end]))",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 13,
          "text": "        if end >= len(words):",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 14,
          "text": "            break",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 15,
          "text": "",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 16,
          "text": "    return chunks",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 17,
          "text": "",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 18,
          "text": "",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 19,
          "text": "def create_chunks(source: str, text: str) -> list[dict[str, str]]:",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 20,
          "text": "    return [",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 21,
          "text": "        {\"id\": f\"{source}:{index}\", \"source\": source, \"text\": chunk}",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 22,
          "text": "        for index, chunk in enumerate(chunk_text(text), start=1)",
          "label": "Write chunking code"
        },
        {
          "kind": "add",
          "file": "chunker.py",
          "at": 23,
          "text": "    ]",
          "label": "Write chunking code"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 3,
          "text": "from chunker import create_chunks",
          "label": "Integrate chunking"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 12,
          "text": "    all_chunks = []",
          "label": "Integrate chunking"
        },
        {
          "kind": "strike",
          "file": "main.py",
          "at": 15,
          "label": "Mark obsolete output"
        },
        {
          "kind": "remove",
          "file": "main.py",
          "at": 15,
          "label": "Remove obsolete output"
        },
        {
          "kind": "strike",
          "file": "main.py",
          "at": 15,
          "label": "Mark obsolete output"
        },
        {
          "kind": "remove",
          "file": "main.py",
          "at": 15,
          "label": "Remove obsolete output"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 15,
          "text": "        all_chunks.extend(create_chunks(name, cleaned_content))",
          "label": "Integrate chunking"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 16,
          "text": "",
          "label": "Integrate chunking"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 17,
          "text": "    print(f\"Created {len(all_chunks)} chunks\")",
          "label": "Integrate chunking"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 18,
          "text": "    for chunk in all_chunks:",
          "label": "Integrate chunking"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 19,
          "text": "        print(f\"\\nChunk: {chunk['id']}\")",
          "label": "Integrate chunking"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 20,
          "text": "        print(f\"Source: {chunk['source']}\")",
          "label": "Integrate chunking"
        },
        {
          "kind": "insert",
          "file": "main.py",
          "at": 21,
          "text": "        print(chunk[\"text\"])",
          "label": "Integrate chunking"
        },
        {
          "kind": "terminal",
          "command": "python -c \"from chunker import chunk_text; print(chunk_text('one two three four five six seven eight nine ten', 6, 2))\"",
          "output": "['one two three four five six', 'five six seven eight nine ten']",
          "label": "Test overlap"
        },
        {
          "kind": "terminal",
          "command": "python main.py",
          "output": "RAG Application Started\nLoaded 3 documents\nCreated 7 chunks\n\nChunk: ai.txt:1\nSource: ai.txt\nArtificial intelligence enables machines to perform tasks that normally require human intelligence. Machine learning is a subset of artificial intelligence\n\nChunk: ai.txt:2\nSource: ai.txt\na subset of artificial intelligence that learns patterns from data. Retrieval-Augmented Generation retrieves relevant information from external documents before generating\n\nChunk: ai.txt:3\nSource: ai.txt\nfrom external documents before generating an answer.\n\nChunk: llm.txt:1\nSource: llm.txt\nA large language model is trained on large amounts of text. Tokens are the units of text processed by a\n\nChunk: llm.txt:2\nSource: llm.txt\nof text processed by a language model. Transformers use attention mechanisms to process relationships between tokens.\n\nChunk: rag.txt:1\nSource: rag.txt\nDocument chunking divides large documents into smaller sections. Embeddings represent text as numerical vectors. Semantic search retrieves information based on\n\nChunk: rag.txt:2\nSource: rag.txt\nsearch retrieves information based on meaning rather than exact keyword matches.\n",
          "label": "Expected output — verify locally"
        }
      ]
    }
  ]
};
