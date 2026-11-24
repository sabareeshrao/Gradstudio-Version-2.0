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
    }
  ]
};
