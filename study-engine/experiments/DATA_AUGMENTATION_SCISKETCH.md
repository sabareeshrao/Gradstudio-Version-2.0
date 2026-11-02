# Data Augmentation · SciSketch Code-First Experiment

Source: `study-engine/unlisted/data-augmentation.json` (original unchanged).

Unlisted duplicate: `study-engine/unlisted/data-augmentation-scisketch.json`, opened by
`study-engine/?module=data-augmentation-scisketch`.

All seven source question texts, all 28 options, answer keys, tags, explanations and original figures are preserved verbatim.
New diagrams are responsive HTML and editable inline SVG. They use seven separate scene architectures:
1. Bicycle source → exposure / flip → valid examples.
2. Small data and overfitting vs augmented distribution.
3. Distinct image, text, and audio pipelines.
4. Online runtime vs offline precomputed augmentation.
5. Label validity: digit six vs potentially rotated nine.
6. Mixup, CutMix and synthetic generation.
7. Strict train/validation/test split plus augmentation evaluation.

Research inspiration: SciSketch (EMNLP 2025), https://aclanthology.org/2025.emnlp-demos.28/.
This project implements **code-first planning, semantic grouping, and native web diagrams**;
it does not execute the original SciSketch model.

Separation-by-construction: labels use HTML normal flow; illustrations contain no positioned
SVG text; diagrams reflow from grids into vertical cards on small screens, with no fixed
horizontal panning.

A/B controls per question: Enhanced / Original / Compare both. They do not change quiz scoring.
New experiment is **not** added to the 58-topic catalog.

Quality gates:
- `node study-engine/experiments/verify-data-augmentation-scisketch.mjs`
- `node study-engine/experiments/verify-data-augmentation-scisketch-browser.mjs`
- GitHub Pages publication runs both as blocking steps, in addition to the Transformer tests.
- Browser test checks 7 questions × 3 comparison modes × 4 viewport widths:
  1280, 900, 390 and 320px. It examines panel bounds, intersections, SVG containment,
  quiz options and scrolling. Manual review still matters for aesthetics and semantics.
