# 58-topic English MCQ remediation — verified status

Source of truth: [TOPIC_AND_QUESTION_ONLY.md](./TOPIC_AND_QUESTION_ONLY.md) (58 topics × 7 questions = **406 questions**, with written correct answers).
Implementation: [study-engine/modules](../study-engine/modules). QA rules: [AI_REPLICATION_PLAYBOOK.md](../study-engine/AI_REPLICATION_PLAYBOOK.md). Verify using [verify-canonical-mcq-audit.mjs](../study-engine/verify-canonical-mcq-audit.mjs).

## Completed — canonical answer alignment

- All **406 original question stems** read back identically to the supplied source.
- All **406 keyed correct options** read back **byte-for-byte identical** to the source's correct answers, without changing answer positions.
- All **406 learner-facing explanations** were updated to start with the source answer, and all contain **100 words or fewer** on a mechanical word count.
- All **406 existing figures** remain present. Existing technical explanation fields, diagram CSS, the shared renderer, and Telugu files were left intact.
- Changes were written through the connected GitHub repository. This report describes content-source verification, **not** verified live Pages rendering or certified pedagogy.

## Not completed — distractor editorial rewrite and mentor-quality review

The **1,218 previously written wrong options have not been thoroughly rewritten or human-equivalent semantically certified** against the new gold answers. An automated review flags **394 / 406 questions** for at least one possible length clue (correct option uniquely longest by words or characters, or four-choice word ratio over 1.15). An option passing that heuristic is not necessarily a good distractor.

The audit also finds old responses that explicitly reveal their own incorrectness (e.g., “that describes ... rather than ...”). Some older explanatory paragraphs were short and may lack distinct real-world examples. The automatic explanation merge preserved the direct correct answer and some pre-existing examples where they fit, but it is **not** a completed 406-question editorial quality review. Do not tell learners or translators that the whole MCQ dataset passes the current educational standard yet.

**Remaining substantive task:** Rewrite each of the three incorrect options per question to stay on the same topic, make one realistic technical error, avoid keyword/length giveaways, and keep all original correct answers unchanged. Then individually review explanations (especially any awkwardly trimmed quotes or missing examples), accessibility, code visibility, and browser rendering.

## Per-topic queue

| # | Topic | Gold answers aligned | Automated length/clue warnings | Status |
|---:|---|:---:|:---:|---|
| 01 | Transformer | 7/7 | 7/7 | Needs distractor review |
| 02 | Retrieval-Augmented Generation (RAG) | 7/7 | 7/7 | Needs distractor review |
| 03 | Deep Learning | 7/7 | 7/7 | Needs distractor review |
| 04 | Neural Network | 7/7 | 7/7 | Needs distractor review |
| 05 | Artificial Intelligence (AI) | 7/7 | 7/7 | Needs distractor review |
| 06 | Prompt Engineering | 7/7 | 7/7 | Needs distractor review |
| 07 | Attention Mechanism | 7/7 | 7/7 | Needs distractor review |
| 08 | Self-Attention | 7/7 | 7/7 | Needs distractor review |
| 09 | Backpropagation | 7/7 | 7/7 | Needs distractor review |
| 10 | Gradient Descent | 7/7 | 6/7 | Needs distractor review |
| 11 | Generative Model | 7/7 | 7/7 | Needs distractor review |
| 12 | Tokenization | 7/7 | 7/7 | Needs distractor review |
| 13 | Embedding Vector | 7/7 | 7/7 | Needs distractor review |
| 14 | Vector Database | 7/7 | 7/7 | Needs distractor review |
| 15 | AI Agent Framework | 7/7 | 7/7 | Needs distractor review |
| 16 | Supervised Learning | 7/7 | 7/7 | Needs distractor review |
| 17 | Reinforcement Learning | 7/7 | 7/7 | Needs distractor review |
| 18 | Computer Vision | 7/7 | 6/7 | Needs distractor review |
| 19 | Natural Language Processing | 7/7 | 7/7 | Needs distractor review |
| 20 | Diffusion Model | 7/7 | 7/7 | Needs distractor review |
| 21 | Large Vision-Language Model | 7/7 | 7/7 | Needs distractor review |
| 22 | Multimodal Learning | 7/7 | 7/7 | Needs distractor review |
| 23 | Generative Adversarial Network | 7/7 | 7/7 | Needs distractor review |
| 24 | Training Step | 7/7 | 7/7 | Needs distractor review |
| 25 | Loss Function | 7/7 | 7/7 | Needs distractor review |
| 26 | Activation Function | 7/7 | 7/7 | Needs distractor review |
| 27 | Softmax | 7/7 | 7/7 | Needs distractor review |
| 28 | Residual Connection | 7/7 | 7/7 | Needs distractor review |
| 29 | Positional Encoding | 7/7 | 7/7 | Needs distractor review |
| 30 | Rotary Position Embedding (RoPE) | 7/7 | 7/7 | Needs distractor review |
| 31 | Query Projection | 7/7 | 7/7 | Needs distractor review |
| 32 | Key Projection | 7/7 | 7/7 | Needs distractor review |
| 33 | Value Projection | 7/7 | 7/7 | Needs distractor review |
| 34 | Multi-Head Attention | 7/7 | 7/7 | Needs distractor review |
| 35 | Transformer Encoder | 7/7 | 7/7 | Needs distractor review |
| 36 | Transformer Decoder | 7/7 | 7/7 | Needs distractor review |
| 37 | Context Window | 7/7 | 7/7 | Needs distractor review |
| 38 | Autoregressive Language Model | 7/7 | 7/7 | Needs distractor review |
| 39 | Next-Token Prediction | 7/7 | 7/7 | Needs distractor review |
| 40 | Neural Network Pruning | 7/7 | 7/7 | Needs distractor review |
| 41 | Quantization | 7/7 | 7/7 | Needs distractor review |
| 42 | Knowledge Distillation | 7/7 | 7/7 | Needs distractor review |
| 43 | Convolutional Neural Network (CNN) | 7/7 | 7/7 | Needs distractor review |
| 44 | Recurrent Neural Network (RNN) | 7/7 | 7/7 | Needs distractor review |
| 45 | Long Short-Term Memory (LSTM) | 7/7 | 7/7 | Needs distractor review |
| 46 | Random Forest | 7/7 | 7/7 | Needs distractor review |
| 47 | Decision Tree Classifier | 7/7 | 7/7 | Needs distractor review |
| 48 | Logistic Regression | 7/7 | 7/7 | Needs distractor review |
| 49 | Linear Regression | 7/7 | 7/7 | Needs distractor review |
| 50 | K-Means Clustering | 7/7 | 7/7 | Needs distractor review |
| 51 | Principal Component Analysis (PCA) | 7/7 | 7/7 | Needs distractor review |
| 52 | Stochastic Gradient Descent (SGD) | 7/7 | 6/7 | Needs distractor review |
| 53 | Adam Optimizer | 7/7 | 5/7 | Needs distractor review |
| 54 | Learning Rate | 7/7 | 4/7 | Needs distractor review |
| 55 | Overfitting | 7/7 | 7/7 | Needs distractor review |
| 56 | Generalization | 7/7 | 6/7 | Needs distractor review |
| 57 | Train-Validation-Test Split | 7/7 | 5/7 | Needs distractor review |
| 58 | Cross-Validation Evaluation | 7/7 | 6/7 | Needs distractor review |

## How another AI should resume accurately

1. Load the canonical Markdown answer table and this report before editing any module.
2. Select a module and read all seven stems, existing A–D options, keyed correct answers, and explanations.
3. **Lock the supplied correct text and A–D position.** Make all three incorrect choices believable *about the same subject*, not definitions of unrelated concepts. Avoid any self-disqualifying language.
4. Check completeness of every prompt part, unique examples, explanation ≤100 words, stable diagrams, source names and formulas, code contrast, and mobile display.
5. Run `node study-engine/verify-canonical-mcq-audit.mjs` and (optionally) `--strict-length`. Mechanical heuristics **do not replace semantic review**.
6. Commit and verify each changed module. Do not modify Telugu sources unless explicitly requested.

### Prioritized example

Transformer Q1 still has distractors that refer to recurrent networks, retrieval and position numbers in a way that may give away the correct answer. The new correct option is from the source file, but the incorrect alternatives need a proper near-miss rewrite. Data Leakage's revised distractors are a *style reference*, not words to reuse.

**Status classification: Canonical source migration COMPLETED; comprehensive distractor/mentor editorial QA NOT COMPLETED.**
