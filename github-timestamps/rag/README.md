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

## Stage 6 — embedding generation

D01 02:10–02:58. Install requirements, load the pretrained English-oriented all-MiniLM-L6-v2 model once on CPU, batch-encode chunk texts as unit-normalized NumPy vectors, and retain row-to-chunk correspondence. Expected matrix shape (7, 384). First run needs internet to download model files; no API key. Dependency versions are not pinned yet. No real model inference claimed by the replay; numerical values are displayed only when executed locally.

## Stage 7 — vector storage

D01 02:59–04:00. Save NumPy embeddings and UTF-8 JSON metadata (model name and ordered chunks), then reload and validate rank, width, row count, finite values and model name. Generated storage files, virtual environments and .env are ignored by Git. The application still re-embeds on every run; cache reuse and retrieval are future work. Two-file persistence is educational, not transactional; same-sized mismatched data is not detected. No real model inference claimed by the replay.

## Stage 8 — cosine similarity

D01 04:01–04:40. Compute cosine similarity using dot product and Euclidean norms, reject invalid dimensions, non-finite inputs and zero vectors, and clip roundoff to [-1, 1]. Score each stored vector against the first stored vector to demonstrate self-similarity. Educational exhaustive loop; no ranking or user-query encoding yet. Non-self scores depend on actual model inference.

## Stage 9 — semantic search

D01 04:41–05:32. Read one nonblank user question, encode it with the existing model, compare it to the reloaded vectors with cosine_scores, rank in descending order using stable NumPy argsort, and return up to three results with metadata and scores. Synthetic-vector ranking and syntax checks executed successfully; real embedding inference remains unverified. No relevance threshold, cache reuse or LLM answer generation yet. Full exhaustive search and unpinned dependencies remain teaching limitations.

## Stage 10 — document retrieval

D01 05:33–06:09. Add retriever.py as a policy wrapper around semantic_search; retain at most top_k results whose cosine score is >= min_score. Default top_k=3 and min_score=0.35 are teaching settings, not calibrated relevance guarantees. Validate threshold range, preserve ranking and metadata, and stop with a no-context message when nothing passes. Synthetic-vector tests (13 checks) and syntax compilation executed on reproduced source; real embedding inference remains unverified. No context-string construction, LLM, cache reuse or deduplication yet.

Next stage: prompt augmentation, only after learner advances.
