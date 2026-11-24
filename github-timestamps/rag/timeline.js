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
    }
  ]
};
