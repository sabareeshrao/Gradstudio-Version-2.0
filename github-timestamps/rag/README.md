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

## Stage 11 — prompt augmentation

D01 06:10–06:54. Add prompt_builder.py: preserve ranked chunk IDs, source names and text; omit similarity scores from evidence; serialize the question and context as Unicode JSON; separate system instructions from user data. Reject blank questions or missing context. Print the two messages instead of the raw result list. Eleven deterministic checks and syntax compilation executed locally on the same code. No actual LLM call, real embedding inference or prompt-injection immunity is claimed. Context deduplication, token budgeting and citation verification remain pending.

## Stage 12 — LLM integration

D01 06:55–07:38. Add openai dependency, llm.py client factory and request_response wrapper. Read OPENAI_API_KEY from the environment (never commit secrets), default to gpt-6-luna, allow OPENAI_MODEL override, map the system message to instructions and user JSON to input, limit output to 512 tokens, disable response storage with store=False, set SDK timeout=30 seconds and max_retries=0. main.py sends a request only after successful retrieval, then prints response status. API usage may be billed and retrieved context leaves the local machine. No generated answer extraction yet. Syntax compilation and stub-SDK mock assertions passed; actual SDK import was unavailable in the test runtime, so real SDK integration, API calls and embedding inference remain unverified. Do not confuse store=False with zero retention.

## Stage 13 — answer generation

D01 07:39–08:10. Add answer.py to validate response.status before reading output_text, strip surrounding whitespace, and reject empty answers with ValueError. Use deferred annotations and a type-checking-only SDK import for independent tests. main.py catches extraction ValueError, displays an unavailable-answer message, or prints the completed answer. Fourteen local tests on reproduced source passed (nine extraction checks and five main-flow checks with stubbed dependencies); syntax compilation passed. No real SDK/model calls or live answer quality tests. Incomplete responses are intentionally rejected, not retried. Citation validation, error handling for API requests, and cache reuse remain pending.

## Stage 14 — source citations

D01 08:11–08:56. Extract bracketed IDs ending in a colon and ASCII digits, deduplicate in answer order, match only against retrieved context, display matched source filenames and full chunk text, and warn on unknown or absent citations. Matching IDs is not factual verification; malformed or other bracket formats are not recognized. Fourteen deterministic checks on reproduced citation module passed; no live embedding or LLM call made. The answer is displayed with warnings rather than rejected.

## Stage 15 — REST API development

D01 08:57–10:58. Add FastAPI and Uvicorn; create RAGService and initialize an in-memory document index once per server process. Reuse the existing retrieval, prompt, LLM, answer and citation modules; serialize model encoding with a lock. CLI main.py and persisted vector store are unchanged; this API uses its own in-memory index and does not reload changed documents until restart. POST /ask validates trimmed 1–2000-character questions, returns structured answer/citations or no-context status, and maps expected OpenAIError/ValueError to generic HTTP 502. GET /health reports startup readiness, not upstream health. Bind only to localhost; no authentication or rate limiting yet. Syntax compilation and 21 checks passed against FastAPI TestClient with mocked pipeline and stub OpenAI SDK. No real inference, SDK request, paid API call or live server startup verified. Dependencies remain unpinned. Next stage: chat interface, only after learner advances.
