# Ranking Methodology — AI-Wide Global Ranking

**Release date:** October 30, 2026

**Source of truth:** [AI Keyword Catalog](../ai-keyword-catalog/README.md), 4,857 source IDs, 43 primary domains. This ranking does **not** change the original catalog, its identifiers or the existing ranked LLM curriculum.

## What this ranking means

This is a **study-priority editorial ranking** balancing fundamental importance, practical applicability and present-day popularity, not a claim that exact Google search volumes or counts of job listings are available for all 4,857 terms. Ranking #101 versus #102 should not be interpreted as a statistically significant difference. **Domain boundaries are ignored when assigning global order**, although the domain is retained as metadata for each entry.

## Evidence informing contemporary popularity

- [Stanford HAI — 2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report): broad organizational uptake, model capability development and research/industry trends.
- [Stack Overflow — 2025 Developer Survey](https://survey.stackoverflow.co/2025/): developer use of AI tools, LLM interest and adoption in software development.
- [Cisco-led AI Workforce Consortium — 2025 Report](https://www.cisco.com/content/dam/cisco-cdc/site/m/ai-workforce-consortium/documents/2025-ai-workforce-consortium-full-report.pdf): workforce demand for RAG, vector databases, MCP, agents, multimodal approaches, edge AI and LLMOps.

These inform **topic-level judgment**, not term-by-term popularity measurements.

## Deterministic procedure

1. Read all original keywords and original IDs exactly from [ALL_KEYWORDS.md](../ai-keyword-catalog/ALL_KEYWORDS.md).
2. Manually curate the first 100 terms by their combined relevance as fundamental knowledge and common current practice, prioritizing core transformer/RAG/deep-learning/agent/ML concepts. Their exact order is an editorial choice.
3. For positions 101–4,857 calculate a **heuristic editorial score** of **45% importance + 35% practical popularity proxy + 15% transferable learning breadth + 5% momentum**. Domain-level baseline weights encode broad importance/adoption; term-level signals raise general concepts and techniques, while extreme specificity lowers priority. These numbers are **internally assigned editorial ratings, not observational statistics**. Scores are available in [ranked-keywords.csv](ranked-keywords.csv).
4. Sort descending by score, then by ascending original catalog ID to break ties. Append to the top 100 without any domain reset.
5. Partition ranks 1–4,857 into sequential batches of 100, except final batch of 57.
6. Verify that every original source ID appears once, every rank is unique, batches cover all integers 1–4,857 and that source keyword/domain text is preserved. The **global rank and original catalog ID are different identifiers**.

**Reproducibility note:** A new edit to the underlying corpus, rankings or methodology requires regenerating all 49 batches together and validating the permutation. Treat the current CSV as the definitive snapshot of this ranked release. New search trends may change future editorial priorities.
