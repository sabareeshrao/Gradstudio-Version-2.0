# RAG from scratch — guided coding replay

[Open simulator](https://sabareeshrao.github.io/Gradstudio-Version-2.0/github-timestamps/rag/)

We build the local Python application one step at a time. The online source under project/ mirrors the instructions, not the learner's actual machine. The timeline is append-only, one simulated minute per action, starting D01 00:01. Output is illustrative until the learner verifies it. No API keys or virtual environment files are committed. The original PetClinic replay is unchanged.

## Stage 1 — initialization

Python version check, create folder, open VS Code, create and activate .venv, write main.py, execute it. PowerShell activation is shown; macOS/Linux: source .venv/bin/activate. If python is unavailable use py (Windows) or python3 (macOS/Linux) as applicable.

Expected output: RAG Application Started. No retrieval functionality yet.

## Stage 2 — knowledge base and document loading

D01 00:15–00:36. Create `data/ai.txt`, implement `loader.py` with UTF-8 text reading, and integrate it into `main.py`. The application locates the document relative to the script, then prints its contents. No embeddings, chunking or retrieval yet.

Next stage: loading multiple documents, only after learner advances.
