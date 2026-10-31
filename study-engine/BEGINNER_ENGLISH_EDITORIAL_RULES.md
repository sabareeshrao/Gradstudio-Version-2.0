# Gradstudio — Beginner-Friendly English MCQ Rules

Use these rules when updating existing English study-engine modules in numbered batches.

## Scope and preservation
- Update **only the requested batch**. Do not modify other English modules or any Telugu materials.
- Preserve the existing question stems (except the already-agreed removal of redundant “Layer N” prefixes), answers, diagram markup, diagram-specific CSS, theme choices, and quiz behavior.
- Each module has seven questions with four options (A–D).

## Four options that actually teach
- Write **complete, natural sentences in simple English**. Keep technical terms when they name a real concept and explain them through context.
- Each option should communicate a coherent, related technical idea, not a random or absurd distractor.
- Make the four options **similar in reading effort**, usually around 22–30 words each; do not turn them into one-line definitions or long walls of text.
- **Do not reveal the correct choice by length**. Existing `verify-module-options.mjs` checks maximum word-length ratio 1.15 and whether the correct choice is uniquely longest by words or characters.
- Avoid repeating identical answer phrasing, mechanically padding an option just to pass the length check, or using an obvious “always/never” clue.
- The correct answer must remain supported by the question and diagram. Preserve the stored answer key unless it was factually incorrect and a separate correction was explicitly requested.

## Explanation (visible after checking)
- Label the learner-facing text simply **Explanation:**. Never display “YouTube mentor style,” “YouTuber,” or similar style tags.
- Keep each visible explanation **at or under 100 words**.
- Use a warm, conversational teaching voice: a concrete situation, the actual mechanism, and a short takeaway. Do not stack definitions or unexplained acronyms.
- Use **a different relevant example for every question**; do not recycle an imagination/scenario within or across a batch.
- Keep the deeper optional technical explanation when a module already has one; do not replace the beginner explanation with that advanced text.

## Diagram and layout guardrail
- Preserve seven original, concept-specific diagrams and their responsive styling.
- Do not replace rich diagrams with generic cards or text-only placeholders just to save tokens.
- Reuse the shared study engine, not another copy of the full HTML boilerplate.

## Batch audit before committing
1. Exactly seven unchanged question stems per module.
2. Four conceptually distinct options per question, keyed A–D.
3. Correct choice not uniquely longest in words **or characters**, and word-count ratio at most 1.15.
4. Visible explanation starts with **Explanation:** and contains no more than 100 words.
5. Every question has a different specific example or situation.
6. All seven question figures and diagram styles remain present; no changes to Telugu assets.
7. Confirm the GitHub file commit and provide the module's GitHub Pages link. Do not claim a successful live deployment unless tested.

## Batch 1 — completed English modules
1. Transformer (`transformer`, AI-00879)
2. Retrieval-Augmented Generation (RAG) (`rag`, AI-01286)
3. Deep Learning (`deep-learning`, AI-00676)
4. Neural Network (`neural-network`, AI-00678)
5. Artificial Intelligence (`artificial-intelligence`, AI-00001)

The remaining modules can be revised in subsequent user-selected batches.

## Batch 2 — completed English modules
6. Prompt Engineering (`prompt-engineering`, AI-01417)
7. Attention Mechanism (`attention-mechanism`, AI-00885)
8. Self-Attention (`self-attention`, AI-00886)
9. Backpropagation (`backpropagation`, AI-00694)
10. Gradient Descent (`gradient-descent`, AI-00294)

**Verification:** All 35 questions retained their stems, answer keys, and individual diagrams. The 140 answer choices use complete teaching-oriented English with balanced word/character lengths. All visible explanations are labelled **Explanation:**, use a different concrete scenario per question, and are within 100 words. Future batches must maintain these requirements.

## Batch 3 — completed English modules
11. Generative Model (`generative-model`, AI-01158)
12. Tokenization (`tokenization`, AI-01035)
13. Embedding Vector (`embedding-vector`, AI-00725)
14. Vector Database (`vector-database`, AI-01315)
15. AI Agent Framework (`ai-agent-framework`, AI-01499)

**Verification:** 35 question stems, answer keys, and seven custom figures per module retained. All 140 choices now use complete beginner-friendly teaching sentences, pass the existing strict word/character length heuristic, and each explanation is labeled **Explanation:** and has at most 100 words (actual range: 69–81 words). Examples are distinct across this batch. No Telugu content or shared rendering code was edited.

## Batch 4 — completed English modules
16. Supervised Learning (`supervised-learning`, AI-00483)
17. Reinforcement Learning (`reinforcement-learning`, AI-01623)
18. Computer Vision (`computer-vision`, AI-01759)
19. Natural Language Processing (`natural-language-processing`, AI-01031)
20. Diffusion Model (`diffusion-model`, AI-01205)

**Verification:** Preserved 35 existing question stems, 35 answer keys, and all 35 original teaching figures. Rewrote 140 four-choice answers and 35 accessible explanations with distinct teaching examples; each visible explanation is labeled **Explanation:** and contains 65–79 words. Every question passes the answer-length heuristic (correct answer not uniquely longest by words or characters, word-count ratio ≤ 1.15). Preserved advanced technical explanations, common study-engine styling, and Telugu assets.
