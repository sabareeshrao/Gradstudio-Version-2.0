# Transformer · SciSketch Visual Experiment (pilot)

- **Research:** Wang et al., *SciSketch: An Open-source Framework for Automated Schematic Diagram Generation in Scientific Papers*, EMNLP 2025 — https://aclanthology.org/2025.emnlp-demos.28/
- **Scope:** Duplicate full original Transformer seven-question module in `study-engine/unlisted/transformer-scisketch.json` without altering canonical `study-engine/modules/transformer.json`.
- **Treatment:** Q6 only. Original figures for hero, Q1–Q5 and Q7 are unchanged. Q6 contains a planned, handcrafted code-first inline SVG and expandable original diagram for visual A/B comparison. This is an adaptation of SciSketch's code-based principles, **not** an execution of the original SciSketch model or its image-based pipeline.
- **Technical source lock:** Preserve all seven stems, 28 answer options, answer keys, and explanations character-for-character; no edits to learner-facing assessment content.
- **SVG semantics:** BERT all-to-all visibility (16 links); GPT causal mask (10 allowed of 16); T5 encoder states with three explicit decoder cross-attention connections. One inline SVG, no PNG/JPEG/assets.
- **Deployment:** Module lives in `study-engine/unlisted` to preserve the approved 58-topic whitelist, accessed via `study-engine/?module=transformer-scisketch`.
- **Validation:** Run `node study-engine/experiments/verify-transformer-scisketch.mjs` and browser-render / visually review desktop and mobile; do not claim the latter unless executed.
