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

## Batch 5 — completed English modules
21. Large Vision-Language Model (LVLM) (`large-vision-language-model`)
22. Multimodal Learning (`multimodal-learning`)
23. Generative Adversarial Network (GAN) (`generative-adversarial-network`)
24. Training Step (`training-step`)
25. Loss Function (`loss-function`)

**Verification:** All five committed English modules retain their original 35 question stems, answer keys, technical explanations, and 35 unique figure strings. All 140 options were rewritten as full teaching sentences with related distractors and passed the answer-length guardrail: longest-to-shortest option word ratio at most 1.15, with the correct choice never uniquely longest by words or characters. The 35 beginner explanations use distinct practical scenarios, the plain **Explanation:** heading, and 68–84 words apiece. No Telugu lessons, shared theme files, quiz behavior, or unrelated English modules were edited.

## Batch 6 — completed English modules
26. Activation Function (`activation-function`)
27. Softmax (`softmax`)
28. Residual Connection (`residual-connection`)
29. Positional Encoding (`positional-encoding`)
30. Rotary Position Embedding (RoPE) (`rotary-position-embedding`)

**Verification:** All 35 question stems and answer keys, their original 35 distinct diagram figures, and their optional technical explanations were preserved. Rewrote 140 A–D choices in beginner-friendly technical English and replaced 35 visible explanations with concrete topic-specific examples. Each visible explanation is labeled **Explanation:** and contains 70–82 words. Every question passes the 1.15 maximum option word-ratio check, and the correct answer is never uniquely longest by word count or character count. The five source JSON modules were committed and read back from GitHub for final verification; no Telugu files, shared themes, quiz code, or unrelated modules were edited.

## Batch 7 — completed English modules
31. Query Projection (`query-projection`)
32. Key Projection (`key-projection`)
33. Value Projection (`value-projection`)
34. Multi-Head Attention (`multi-head-attention`)
35. Transformer Encoder (`transformer-encoder`)

**Verification:** Preserved all 35 original question stems, 35 answer keys, 35 unique diagrams, and original advanced technical explanations. Rewrote 140 multiple-choice answers into related, beginner-friendly teaching sentences and all 35 beginner explanations using distinct examples. Each explanation begins **Explanation:** and contains 66–81 words. Every question passes the same 1.15 maximum option word-ratio check, and correct answers are never uniquely longest by word or character length. All five JSON modules were committed and read back from GitHub. Telugu lessons, shared quiz code, themes, and unrelated modules were not edited.

## Batch 8 — completed English modules
36. Transformer Decoder (`transformer-decoder`)
37. Context Window (`context-window`)
38. Autoregressive Language Model (`autoregressive-language-model`)
39. Next-Token Prediction (`next-token-prediction`)
40. Neural Network Pruning (`neural-network-pruning`)

**Verification:** All 35 original question stems, answer keys, distinct figures, and advanced technical explanations were preserved. Rewrote 140 A–D choices with full, teaching-oriented English and 35 beginner-facing explanations with different concrete scenarios. Each explanation starts with **Explanation:** and contains 68–81 words. Every question passes the existing maximum 1.15 option word-count ratio and the correct answer is not uniquely longest by words or characters. All five updated JSON files were committed and read back from GitHub; Telugu lessons and shared study-engine rendering, themes, and unrelated modules were unchanged.

## Batch 9 — completed English modules
41. Quantization (`quantization`)
42. Knowledge Distillation (`knowledge-distillation`)
43. Convolutional Neural Network (CNN) (`convolutional-neural-network`)
44. Recurrent Neural Network (RNN) (`recurrent-neural-network`)
45. Long Short-Term Memory (LSTM) (`long-short-term-memory`)

**Verification:** All 35 original question stems, answer keys, technical explanations, and distinct diagrams are preserved. Rewrote the 140 answer choices in beginner-friendly technical English and all 35 visible explanations with varied real-world teaching examples. Each explanation starts with **Explanation:**, uses 68–83 words, and remains within the 100-word limit. Each question passes the 1.15 maximum option word-count ratio; the correct answer is not uniquely longest by word or character count. The five committed JSON modules were fetched again from GitHub for final verification. Telugu materials, shared quiz code, and unrelated modules were unchanged.

## Batch 10 — completed English modules
46. Random Forest (`random-forest`)
47. Decision Tree Classifier (`decision-tree-classifier`)
48. Logistic Regression (`logistic-regression`)
49. Linear Regression (`linear-regression`)
50. K-Means Clustering (`k-means-clustering`)

**Verification:** All 35 original question stems, 35 answer keys, 35 unique diagram figures (verified against their original lengths), and advanced technical explanations were preserved. Rewrote all 140 answer choices into understandable technical English and all 35 visible explanations with varied examples. Each explanation begins **Explanation:** and contains 66–81 words (under the 100-word maximum). Every question passes the maximum option word-count ratio of 1.15, and the correct option is not uniquely longest by words or characters. All five updated JSON modules were committed and fetched again from GitHub for verification. No Telugu content, shared quiz-rendering code, themes, or unrelated modules were edited.

**Completion:** Batches 1–10 cover the 50 planned English study topics (7 questions and 28 answer choices per topic; 350 questions and 1,400 choices total). Batch 46–50 source checks passed; live GitHub Pages rendering was not independently tested.
