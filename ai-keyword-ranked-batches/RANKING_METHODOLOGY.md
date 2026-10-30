# Ranking Methodology

**Published:** October 30, 2026. **Population:** all 4,857 original terms in 43 domains.

This is an **editorial cross-domain importance and topical popularity ranking**, not an empirical search-volume list. Sources inform broad topic-level relevance, not exact popularity scores for all 4,857 terms:

- [2026 Stanford AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report): research, adoption and AI capabilities.
- [2025 Stack Overflow Developer Survey](https://survey.stackoverflow.co/2025/): AI tool usage and developer technology interest.
- [2025 Cisco AI Workforce Consortium Report](https://www.cisco.com/content/dam/cisco-cdc/site/m/ai-workforce-consortium/documents/2025-ai-workforce-consortium-full-report.pdf): industry priorities including RAG, vector DBs, MCP, agents, diffusion and LLMOps.

## Ordering procedure

1. Preserve all original source IDs, terms and their primary domains; do not add or drop entries.
2. **Top 200:** curated manually to prioritize important and widely used AI/LLM/ML concepts, with cross-domain representation.
3. **Remaining 4,657:** sorted by an editorial composite proxy of 45% fundamental importance, 35% practice/popularity, 15% transferability of the concept, and 5% recent momentum. Heuristics consider subject-domain baselines, generality of technique, term specificity and foundational position in the original domain. These scores are subjective and not observed frequencies. They are included in the CSV for auditing.
4. Score ties break by ascending original ID. Then assign one consecutive rank 1–4,857, splitting into 100-term batches (the last has 57).
5. Verify all 4,857 source IDs and all 4,857 keyword names occur once and there are precisely 49 batches.

Adjacent ranks are not statistically distinct. The ranking is a **learning priority suggestion**; niche importance may be far higher for a particular specialization. The original 43-domain catalog and separate 265-rank LLM curriculum were not changed.
