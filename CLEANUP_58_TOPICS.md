# Cleanup to the owner-approved 58 topics

This cleanup keeps **exactly 58 active English lessons**, the one shared engine, and the original **Multimodal Training & Model Adaptation** root template.

## Retired English modules (9)
- `masking` — removed its JSON and diagram CSS
- `stochastic-depth` — removed its JSON and diagram CSS
- `flops` — removed its JSON and diagram CSS
- `turing-test` — removed its JSON and diagram CSS
- `semantic-textual-similarity` — removed its JSON and diagram CSS
- `data-leakage` — removed its JSON and diagram CSS
- `model-evaluation` — removed its JSON and diagram CSS
- `feature-selection` — removed its JSON and diagram CSS
- `data-augmentation` — removed its JSON and diagram CSS

## Removed HTML clutter
- 16 archived standalone legacy English lesson files plus one Web API demo
- Two redundant standalone theme-demo HTML files (the **original root template remains**)
- Ten duplicate English redirect HTML files and one old index HTML from `lessons/`; these 11 URLs are now generated at deploy time
- Old 50-topic answer-style preview HTML, its five JSON snapshots and the obsolete legacy redirect generator

**Protected:** 58 English modules with their seven questions each; the root template `index.html`, `lab-v3.css`, `lab-v3.js`; all shared CSS/JavaScript/illustrations; 50 existing Telugu translations (same whitelisted topics); original reference PDF and catalog data.

The canonical ordering, IDs and subjects are in [study-engine/58_TOPIC_WHITELIST.json](study-engine/58_TOPIC_WHITELIST.json). The active library lives at [study-engine](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/).

Run `node study-engine/verify-58-topic-catalog.mjs` to check exact membership, quiz structure, CSS dependencies and original template. Git history retains previous versions of removed files.
