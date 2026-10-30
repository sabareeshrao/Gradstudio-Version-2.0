# Gradstudio — Interactive Study Library

**Organized technical learning modules with visual diagrams, MCQs, and 15 color themes.**

**Ranked-PDF curriculum progress:** 15 / 265 keywords completed in the historical rank-order track; next is **016 — Context length**. Separately, the shared study engine currently lists **21 hosted keyword modules**. These are different progress measures.

### Shared study engine — latest additions (October 30, 2026)

- **[Open all 21 hosted modules](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/)** — one shared HTML/CSS/JavaScript engine, quiz scoring, progress, reset and 15 themes. Per-topic JSON plus bespoke diagram CSS keeps lesson content separate from boilerplate.
- **Latest four interactive lessons:** [Tokenization](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=tokenization) · [Vector Database](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=vector-database) · [Generative Model](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=generative-model) · [Embedding Vector](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=embedding-vector).
- **[Engine source and instructions](study-engine/README.md)** — canonical manifest at [`study-engine/modules/index.json`](study-engine/modules/index.json); the 21 hosted modules can be opened independently via `?module=<slug>`.
- **Learning quality rules:** exactly four plausible A–D choices per user-supplied question, no answer-length giveaways, preserve question wording while removing redundant leading “Layer N” labels, and design a unique SVG lesson diagram for every question plus an illustrated hero.
- **Beginner-first answer boxes:** an 18–30-word everyday explanation (allowed 12–42), with more technical reasoning hidden behind “Read the detailed explanation.”
- **Quality checks:** [answer-option bias](study-engine/verify-module-options.mjs), [diagram quality](study-engine/verify-diagram-quality.mjs), and [explanation clarity](study-engine/verify-explanation-quality.mjs). These are structural safeguards; diagrams still need desktop and mobile visual inspection.
- GitHub Pages links require a successful deployment. Archived standalone lessons remain available independently; new hosted modules reuse the engine.

### Current Batch 01 lessons — ranked 1–10 (October 30, 2026)

[**Open the latest lessons index**](https://sabareeshrao.github.io/Gradstudio-Version-2.0/lessons/latest.html) · [HTML entrypoints](lessons/README.md) · [Shared Study Engine](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/)

| Rank | Keyword | Catalog ID | Open latest |
|---:|---|---|---|
| 1 | Transformer | AI-00879 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=transformer) |
| 2 | Retrieval-augmented generation (RAG) | AI-01286 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=rag) |
| 3 | Deep learning | AI-00676 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=deep-learning) |
| 4 | Neural network | AI-00678 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=neural-network) |
| 5 | Artificial intelligence | AI-00001 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=artificial-intelligence) |
| 6 | Prompt engineering | AI-01417 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=prompt-engineering) |
| 7 | Attention mechanism | AI-00885 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=attention-mechanism) |
| 8 | Self-attention | AI-00886 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=self-attention) |
| 9 | Backpropagation | AI-00694 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=backpropagation) |
| 10 | Gradient descent | AI-00294 | [Interactive lesson](https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=gradient-descent) |

All 16 older standalone HTML lessons were moved into [archive/legacy-lessons](archive/legacy-lessons/), preserving their original content. Existing historical Pages URLs remain supported by deployment-time compatibility aliases.

### Start here

- **[Ranked keyword index](KEYWORD_INDEX.md)** — complete 265-keyword curriculum in PDF order, with progress and working lesson links.
- **[Original ranked PDF](archive/references/Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf)** — authoritative keyword names, topics, and ranking.
- **[Question registry](QUESTION_REGISTRY.md)** — 120 published questions; use for strict semantic no-repetition checks.
- **[Instructions for AI builders](AGENTS.md)** · [Visual gold standard — original Multimodal diagrams](docs/VISUAL_GOLD_STANDARD.md) · [Quality and build standard](docs/STUDY_MODULE_BUILD_STANDARD.md) · [Theme guide](docs/THEME_GUIDE.md)

### Legacy standalone modules (now archived)

| Rank | Keyword | Browser preview | Downloadable HTML source |
|---:|---|---|---|
| 001 | Large language models (LLMs) | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Large-Language-Models-LLMs-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 002 | Generative Pre-trained Transformer (GPT) | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/GPT-LLM-Foundation-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/GPT-LLM-Foundation-Keyword-Study-008.html) |
| 003 | Transformer architecture | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Transformer-Architecture-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/Transformer-Architecture-Keyword-Study-008.html) |
| 004 | Generative artificial intelligence (GenAI) | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Generative-AI-GenAI-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/Generative-AI-GenAI-Keyword-Study-008.html) |
| 005 | Autoregressive language modeling | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Autoregressive-Language-Modeling-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 006 | Pretraining | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Pretraining-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/Pretraining-Keyword-Study-008.html) |
| 007 | Fine-tuning | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Fine-tuning-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/Fine-tuning-Keyword-Study-008.html) |
| 008 | Foundation models | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Foundation-models-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/Foundation-models-Keyword-Study-008.html) |
| 009 | Language model training objectives | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Language-model-training-objectives-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/llm-foundations/Language-model-training-objectives-Keyword-Study-008.html) |
| 010 | Tokenization | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Tokenization-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/text-processing/Tokenization-Keyword-Study-008.html) |
| 011 | Byte pair encoding (BPE) | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-011-Byte-Pair-Encoding-BPE-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/text-processing/Rank-011-Byte-Pair-Encoding-BPE-Keyword-Study-008.html) |
| 012 | Token IDs | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-012-Token-IDs-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/text-processing/Rank-012-Token-IDs-Keyword-Study-008.html) |
| 013 | Token embeddings | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-013-Token-Embeddings-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/text-processing/Rank-013-Token-Embeddings-Keyword-Study-008.html) |
| 014 | Word embeddings | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-014-Word-Embeddings-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/text-processing/Rank-014-Word-Embeddings-Keyword-Study-008.html) |
| 015 | Positional embeddings | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-015-Positional-Embeddings-Keyword-Study-008.html) | [Full HTML source](archive/legacy-lessons/text-processing/Rank-015-Positional-Embeddings-Keyword-Study-008.html) |

The **browser preview** opens the actual interactive quiz on GitHub Pages. The **archived source link** opens the complete, independent HTML file in GitHub, which you can save and open offline in Chrome. The archived source and historical preview are deliberately separate.

### Repository structure

```text
Gradstudio-Version-2.0/
├── README.md                      Start here
├── AGENTS.md                      Instructions for future AI assistants
├── KEYWORD_INDEX.md              All 265 ranked keywords
├── QUESTION_REGISTRY.md          120 published questions
├── index.html                     Original Multimodal study homepage
├── lab-v3.css                     Homepage styles
├── lab-v3.js                      Homepage script
├── lessons/                       Latest ranked HTML entrypoints (1–10)
├── study-engine/                  21 hosted modules, shared UI and validation gates
├── docs/                          Quality standard, template and theme guides
├── templates/                     Standalone 15-theme reference examples
├── archive/
│   ├── legacy-lessons/           Earlier independent HTML modules
│   ├── ai-keyword-catalog/       4,857-keyword source catalog
│   └── references/               Original ranked glossary PDF
└── .github/workflows/             Pages deployment workflow
```

### Future modules

For new hosted keyword lessons, add a keyword JSON module under `study-engine/modules/`, its diagram CSS under `study-engine/diagrams/` where needed, and a slug entry in `study-engine/modules/index.json`. Create or update `lessons/` entrypoints only when required for the separate ranked batch. Use complete standalone HTML only when requested. Inspect the [seven original Multimodal diagrams](index.html) and [visual gold standard](docs/VISUAL_GOLD_STANDARD.md) before designing: for user-supplied seven-question modules, provide a bespoke hero plus seven distinct illustrated question diagrams, not repeated text boxes. Read the [build standard](docs/STUDY_MODULE_BUILD_STANDARD.md), compare against the [question registry](QUESTION_REGISTRY.md) to avoid repeats (even if wording changes), then update the [central index](KEYWORD_INDEX.md) and registry.

**Existing preview URLs remain compatible:** the Pages workflow publishes full copies of each self-contained HTML lesson at their original root URLs, even though the GitHub source files now live in topic folders. The former root **GitHub source-code URLs** are no longer the canonical locations; use the updated links above.

*GitHub Pages deployment is configured; live page rendering was not independently verified during this repository cleanup.*
