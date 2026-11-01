# Data Augmentation — Diagram Engineer Handoff

**Agent:** Account 2 · Agent 1 (High-fidelity SVG Diagram Engineer)
**Source content commit:** `06da98f5fd659889c30e679f4c86cb7b982b0df4`
**Topic:** Data Augmentation
**Stage:** Visual-only; the user-provided questions and correct options remain locked in `content-pipeline/01-content/data-augmentation.json`.

## Assets
- `hero.svg` — hero · Overview. One source, transformed training views, invariant bicycle label and generalization.
- `layer-1.svg` — Q1 · What augmentation makes. Bicycle contact sheet and label-preserving transformations.
- `layer-2.svg` — Q2 · Small data and overfitting. Feature-space boundary: sparse versus augmented views.
- `layer-3.svg` — Q3 · Image, text, audio. Three media-specific methods with semantic validity.
- `layer-4.svg` — Q4 · Online and offline. Two timing and storage timelines.
- `layer-5.svg` — Q5 · Preserve the correct label. A six shifted versus a six rotated into a nine-like shape.
- `layer-6.svg` — Q6 · Mixup, CutMix, synthetic data. Soft labels, region weights, generation quality.
- `layer-7.svg` — Q7 · Optimization without data leakage. Split-first evaluation and deployment-realism checklist.
- `diagrams.css` — isolated, responsive theme-safe figure styling.
- `preview.html` — staging-only contact sheet to visually review desktop/mobile compositions.

## Final auditor integration
- Read the **latest `main`** plus the content commit; do not rewrite or overwrite content stage.
- Use the hero graphic as the hero illustration and the seven figures in their listed question order.
- In the canonical JSON, embed each SVG markup (recommended for self-contained lesson) inside `<section class="da-hero">...` or `<div class="da-figure">...` wrappers with a surrounding `<div class="da-art">`; add `diagrams.css` at the canonical diagram stylesheet path if/when approved.
- If retaining SVG files rather than inlining, ensure URLs resolve from `study-engine/`, are available on GitHub Pages, and pass CORS and loading tests.
- Check every text label, arrow direction, scroll area, small-screen readability and high-contrast theming **in a real browser**.
- Verify that Q6 Mixup/CutMix targets are mixed by proportions and that augmentation is restricted to training data during evaluation.
- **Do not publish yet.** Content stage indicates that Data Augmentation is **not on the approved 58-topic whitelist**; curriculum expansion needs explicit user authorization.

## QA scope
- Each SVG has a unique accessible title/description and explicit `role="img"`.
- Each scene has its own illustration composition, not seven cloned generic boxes.
- Assets use 1000×430 viewBoxes and a mobile horizontal inspection viewport.
- The diagram engineer did not touch the shared engine, module manifest, question stems, correct answers, distractors, or Telugu files.
- Actual browser screenshots and layout inspection are required for final acceptance; structural SVG checks alone are insufficient.
