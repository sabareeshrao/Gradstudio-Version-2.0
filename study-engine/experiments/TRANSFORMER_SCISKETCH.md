# GradStudio · Transformer three-way research comparison

**Research:** PaperBanana — Zhu et al., ICML 2026, https://proceedings.mlr.press/v306/zhu26ag.html; SciSketch — EMNLP 2025 https://aclanthology.org/2025.emnlp-demos.28/; VizLinter — IEEE TVCG 2022 https://pubmed.ncbi.nlm.nih.gov/34587044/.

## Design and evaluation
- The canonical `study-engine/modules/transformer.json` remains untouched.
- The unlisted duplicate `study-engine/unlisted/transformer-scisketch.json` retains all seven source questions, 28 options, answer keys and explanations verbatim.
- On every question, a native dropdown offers Original, SciSketch-inspired, PaperBanana-inspired, Compare all 3. Dropdown has no radio inputs and no effect on scoring.
- PaperBanana is *adapted*: its planning / styling / critique principles inspire new HTML/inline SVG art. We did **not** execute PaperBanana's original image model or embed any generated raster assets.
- Each new SVG is a different technical composition, not merely recolored old artwork.
- VizLinter-inspired audit `study-engine/experiments/diagram-comparison.js` measures text rectangles using browser `getBBox()`, detects text intersections and out-of-bounds labels, checks marked connector paths and chart bars; reports potential issues. It does not replace actual human visual QA.
- Targeted repairs in SciSketch Q2 remove connector curves through title/labels; SciSketch Q3 removes annotation over logits bar.
- Pages workflow's blocking `verify-transformer-scisketch.mjs` checks source lock, all three variants for all seven, Q2/Q3 repair, attention geometry and raster exclusion.
- Preview: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=transformer-scisketch.
