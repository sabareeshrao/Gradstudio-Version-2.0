# English study-engine — 50-topic semantic completeness audit

Date: 2026-10-31
Scope: `study-engine/modules/`, all 50 planned English lessons (350 questions)

## Problem found
An example question asked both **what an Artificial Neural Network is** and **how it was inspired by biological neurons**. The correct choice described connected, trainable mathematical units and biological inspiration without explicitly defining an ANN. Similar coverage gaps appeared in multi-part architecture, implementation and comparison questions. The old mechanical answer-length check encouraged overly short responses.

## Correction made
- All **350 correct choices** were edited to present the asked definition, process, distinction or trade-offs more directly. Introductory “What is …?” questions begin with a definition.
- All **350 learner-facing explanations** were rewritten to **begin with the direct answer**, then use the existing practical example when space permits. Every explanation remains below 100 words.
- Existing question stems, A–D answer positions, 35 figures per five-topic batch, and optional advanced technical explanations were kept unchanged.
- Existing incorrect choices (three per question) were retained from the previous editorial pass to avoid changing the answer key or introducing new wrong claims in bulk. They remain part of the translator's comparative review.
- Telugu files, shared study-engine renderer, styling and module index were not modified.

## Review requirements for the translator
1. Read **the entire question** first, including every “and,” “including,” and listed subtopic.
2. Check that the correct choice states what the topic is when asked, then addresses how/why or the compared methods, not just a related fact.
3. Check the explanation states the direct answer **before** its illustration, uses simple English without dropping essential technical meaning, and does not exceed 100 words.
4. Compare all four options for meaningful, technically related distinctions, misleading absolutes, and **correct-answer length bias**. This revision prioritizes completeness; **333 of 350 correct choices are uniquely longest by word count** in the staged audit and therefore require a further option-balance review. Do not interpret those warnings as editorial approval.
5. Verify that a numerical example, formula or assertion is correct and is supported by the corresponding question and original technical explanation.
6. Ensure no real-world illustration is repeated within a lesson; preserve the diagrams and answer keys while translating.
7. Treat this GitHub commit as the English reference version; do not base translation checks on a stale deployed GitHub Pages cache.

## Automated checks / limitations
The staged-content audit checked 50 parseable JSON modules, 7 questions and 4 choices per module, word-limited learner explanations, and exact preservation of question stems, answer keys, diagram strings and technical-explanation fields. Automated tests cannot prove full semantic coverage or pedagogical quality. The existing word-length checker has been changed to report bias as a **review warning** by default and can still enforce a hard fail with `--strict-length`. Human review remains required.

## Staged content results
- 50 updated lesson JSON modules; 350 question stems and 1,400 total A–D choices.
- 350 correct-option revisions; 350 revised visible explanations; original 1,050 distractors retained.
- All 350 explanations are within the 100-word cap; A–D counts, stored keys, figures and technical explanations were preserved.
- **Outstanding editorial debt:** 333/350 correct options are uniquely longest by words. Length-bias improvement is not complete in this commit and must not be represented as a passing parity audit.
