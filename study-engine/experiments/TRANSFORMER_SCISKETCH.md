# Transformer — SciSketch-inspired HTML/SVG visual comparison (all seven)
Research: SciSketch (EMNLP 2025), https://aclanthology.org/2025.emnlp-demos.28/
This is a **research-inspired code-first implementation**, NOT an execution of the SciSketch pretrained model or its image-generation pipeline.

## Immutable source
- Canonical lesson remains `study-engine/modules/transformer.json`.
- Unlisted A/B version `study-engine/unlisted/transformer-scisketch.json` keeps the original hero, seven question stems, all 28 options, answer keys and explanations **unchanged**.
- Each Question 1–7 gets its own custom diagram art in inline SVG/HTML with a native `<details>` comparison control that reveals the **original** figure; no raster images or generated asset embedding.
- Comparison controls use no form inputs and do not interfere with quiz scoring.

## Seven bespoke technical scenes
1. Contextual token neighborhood and context-enriched vector
2. RNN sequential dependence versus parallel attention projections
3. Tokenization, token embedding, position signals, attention and logits
4. Original encoder-decoder Transformer internals with explicit encoder KV → decoder cross-attention
5. PyTorch forward and training-step code next to a tensor-and-gradient-flow diagram
6. BERT full attention, GPT lower-triangular mask, T5 cross attention
7. Scaling atlas: dense attention + FlashAttention, KV cache/GQA, RoPE, sparse attention, distributed training

## QA
- Run `node study-engine/experiments/verify-transformer-scisketch.mjs`: this is a mandatory blocking CI step in the existing Pages workflow.
- After deployment, visually inspect desktop and 390px mobile viewport, compare all seven A/B panels, check typography, clipping and gestures, plus quiz grading and Reveal/Hide.
- The static test establishes structure and source integrity; it does **not** establish rendered aesthetics or complete technical accuracy.
- Keep the approved 58-topic manifest unchanged. Preview: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=transformer-scisketch.
