# RAG from scratch — guided coding replay

[Open simulator](https://sabareeshrao.github.io/Gradstudio-Version-2.0/github-timestamps/rag/)

We build the local Python application one step at a time. The online source under project/ mirrors the instructions, not the learner's actual machine. The timeline is append-only, one simulated minute per action, starting D01 00:01. Output is illustrative until the learner verifies it. No API keys or virtual environment files are committed. The original PetClinic replay is unchanged.

## Stage 1 — initialization

Python version check, create folder, open VS Code, create and activate .venv, write main.py, execute it. PowerShell activation is shown; macOS/Linux: source .venv/bin/activate. If python is unavailable use py (Windows) or python3 (macOS/Linux) as applicable.

Expected output: RAG Application Started. No retrieval functionality yet.

## Stage 2 — knowledge base and document loading

D01 00:15–00:36. Create `data/ai.txt`, implement `loader.py` with UTF-8 text reading, and integrate it into `main.py`. The application locates the document relative to the script, then prints its contents. No embeddings, chunking or retrieval yet.

## Stage 3 — multiple document loading

D01 00:37–01:12. Add two sample text documents. Implement sorted, nonrecursive .txt discovery and load document contents into a dictionary keyed by filename. Preserve source names for future citations. Ignore matching directories. No chunking or retrieval yet.

## Stage 4 — text preprocessing

D01 01:13–01:29. Normalize CRLF and CR to LF, collapse horizontal whitespace, trim spaces around line breaks, collapse excess blank lines, and strip outer whitespace. Preserve single line breaks, paragraph boundaries, case and punctuation. Integrate per-document cleaning while retaining source names. Plain prose only; this policy is not suitable for indentation-sensitive code or tabular data without adjustment.

## Stage 5 — text chunking

D01 01:30–02:09. Split normalized text into windows of 20 words with 5 words of overlap. Validate parameters, stop after reaching the end, preserve source filename and per-document chunk ID. Word-based chunking flattens paragraph whitespace and is a teaching implementation, not token-aware or semantic chunking.

Next stage: embedding generation, only after learner advances.
