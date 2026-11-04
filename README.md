# Gradstudio — Expandable Visual AI Study Library

The original 58 English topics are preserved, and new AI topics can be published without separate curriculum approval. Each topic uses the shared study-engine HTML shell, its own seven-question JSON module and concept-specific diagrams.

- [Open all interactive topics](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/)
- [Original Multimodal Training & Model Adaptation template](https://sabareeshrao.github.io/Gradstudio-Version-2.0/) — preserved `index.html`, `lab-v3.css`, and `lab-v3.js`
- [Original 58-topic baseline (historical, not a publishing restriction)](study-engine/58_TOPIC_WHITELIST.json)
- [Original lesson links and study-engine guide](study-engine/README.md)
- [AI replication playbook](study-engine/AI_REPLICATION_PLAYBOOK.md) and [English editorial rules](study-engine/BEGINNER_ENGLISH_EDITORIAL_RULES.md)
- [Existing Telugu translations of the first 50 approved topics](Telugu%20Translation/README.md)

- [TensorFlow — 9-question illustrated lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=tensorflow) · [module JSON source](study-engine/modules/tensorflow.json)

The canonical manifest is `study-engine/modules/index.json`. Hosted URLs use `?module=<slug>`, without copying the HTML boilerplate into individual pages.

The original model-training template at the root and the entire shared engine are retained unchanged. Redundant standalone HTML demos, retired topics and preview experiments were removed from the working tree, but can be recovered from Git history. Historical `lessons/01-...` to `lessons/10-...` URLs are generated as redirects during deployment to preserve browser bookmarks.

Run `node study-engine/verify-58-topic-catalog.mjs` to validate all registered modules, preserve the original baseline and check required assets. Add new topics to `study-engine/modules/index.json` without a fixed topic cap. The original ranked PDF and historical technical keyword data remain available as non-hosted research references under `archive/`.
