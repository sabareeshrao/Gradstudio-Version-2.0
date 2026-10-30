# Gradstudio — Interactive Study Library

**Organized technical learning modules with visual diagrams, MCQs, and 15 color themes.**

**Curriculum progress: 15 / 265 keywords completed.** Next in PDF rank order: **016 — Context length**.

### Start here

- **[Ranked keyword index](KEYWORD_INDEX.md)** — complete 265-keyword curriculum in PDF order, with progress and working lesson links.
- **[Original ranked PDF](references/Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf)** — authoritative keyword names, topics, and ranking.
- **[Question registry](QUESTION_REGISTRY.md)** — 120 published questions; use for strict semantic no-repetition checks.
- **[Instructions for AI builders](AGENTS.md)** · [Quality and build standard](docs/STUDY_MODULE_BUILD_STANDARD.md) · [Theme guide](docs/THEME_GUIDE.md)

### Completed modules

| Rank | Keyword | Browser preview | Downloadable HTML source |
|---:|---|---|---|
| 001 | Large language models (LLMs) | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Large-Language-Models-LLMs-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 002 | Generative Pre-trained Transformer (GPT) | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/GPT-LLM-Foundation-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/GPT-LLM-Foundation-Keyword-Study-008.html) |
| 003 | Transformer architecture | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Transformer-Architecture-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/Transformer-Architecture-Keyword-Study-008.html) |
| 004 | Generative artificial intelligence (GenAI) | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Generative-AI-GenAI-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/Generative-AI-GenAI-Keyword-Study-008.html) |
| 005 | Autoregressive language modeling | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Autoregressive-Language-Modeling-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 006 | Pretraining | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Pretraining-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/Pretraining-Keyword-Study-008.html) |
| 007 | Fine-tuning | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Fine-tuning-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/Fine-tuning-Keyword-Study-008.html) |
| 008 | Foundation models | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Foundation-models-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/Foundation-models-Keyword-Study-008.html) |
| 009 | Language model training objectives | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Language-model-training-objectives-Keyword-Study-008.html) | [Full HTML source](lessons/llm-foundations/Language-model-training-objectives-Keyword-Study-008.html) |
| 010 | Tokenization | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Tokenization-Keyword-Study-008.html) | [Full HTML source](lessons/text-processing/Tokenization-Keyword-Study-008.html) |
| 011 | Byte pair encoding (BPE) | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-011-Byte-Pair-Encoding-BPE-Keyword-Study-008.html) | [Full HTML source](lessons/text-processing/Rank-011-Byte-Pair-Encoding-BPE-Keyword-Study-008.html) |
| 012 | Token IDs | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-012-Token-IDs-Keyword-Study-008.html) | [Full HTML source](lessons/text-processing/Rank-012-Token-IDs-Keyword-Study-008.html) |
| 013 | Token embeddings | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-013-Token-Embeddings-Keyword-Study-008.html) | [Full HTML source](lessons/text-processing/Rank-013-Token-Embeddings-Keyword-Study-008.html) |
| 014 | Word embeddings | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-014-Word-Embeddings-Keyword-Study-008.html) | [Full HTML source](lessons/text-processing/Rank-014-Word-Embeddings-Keyword-Study-008.html) |
| 015 | Positional embeddings | [Open interactive quiz](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-015-Positional-Embeddings-Keyword-Study-008.html) | [Full HTML source](lessons/text-processing/Rank-015-Positional-Embeddings-Keyword-Study-008.html) |

The **browser preview** opens the actual interactive quiz on GitHub Pages. The **source link** opens the complete, independent HTML file in GitHub, which you can save and open offline in Chrome. The source and preview are deliberately separate.

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
├── lessons/
│   ├── llm-foundations/          Ranks 001–009
│   ├── text-processing/          Ranks 010–015
│   └── api-design/               Web API keyword module
├── docs/                          Quality standard, template and theme guides
├── templates/                     Standalone 15-theme reference examples
├── archive/                       Original Web API demo
├── references/                    Original ranked glossary PDF
└── .github/workflows/             Pages deployment workflow
```

### Future modules

Put **new complete HTML files** inside the corresponding `lessons/<topic>/` folder. Read the [build standard](docs/STUDY_MODULE_BUILD_STANDARD.md), compare against the [question registry](QUESTION_REGISTRY.md) to avoid repeats (even if wording changes), then update the [central index](KEYWORD_INDEX.md) and registry.

**Existing preview URLs remain compatible:** the Pages workflow publishes full copies of each self-contained HTML lesson at their original root URLs, even though the GitHub source files now live in topic folders. The former root **GitHub source-code URLs** are no longer the canonical locations; use the updated links above.

*GitHub Pages deployment is configured; live page rendering was not independently verified during this repository cleanup.*
