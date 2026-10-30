# Gradstudio Shared Study Engine

This folder is an **additive**, browser-hosted study-module system. Older independent lessons and the root homepage remain unchanged.

## Links
- Index: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/
- Softmax: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=softmax
- Masking: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=masking
- Positional Encoding: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=positional-encoding
- Stochastic Depth: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=stochastic-depth
- FLOPS: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=flops
- RAG: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=rag
- Turing Test: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=turing-test

- STS: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=semantic-textual-similarity

- Gradient Descent: https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=gradient-descent

## Architecture
- `index.html`: one reusable page shell with the sticky header and theme picker.
- `core.css`: reused layout, responsive behavior and theme-related styling.
- `quiz-theme.js`: one reusable 15-theme selector, grading, progress and reset system.
- `app.js`: manifest-driven loading, validation and rendering.
- `modules/index.json`: discoverable lesson manifest.
- `modules/<slug>.json`: **unique** exact question stems, four choices, answer, explanation, illustrated hero and seven custom diagrams.
- `diagrams/<slug>.css`: **unique** styling required by that keyword's illustrated scenes. Softmax needs no additional sheet because its original styles are the base.

## Workflow for every future keyword
1. Keep the user's question wording and exact count, but remove redundant leading `Layer 1:`, `Layer 2:`, etc. labels from stored `stem` values. Display quiz question numbers only as `Q1`, `Q2`, ...; do not repeat layer labels in the question. Leave legitimate technical uses of the word “layer” untouched.
2. Author four understandable, credible options per question, one best answer, and a concise explanation.
3. Design a **different instructional diagram for every question**, plus a bespoke intro illustration. No repeated generic box-and-arrow layouts.
4. Add `modules/new-keyword.json`; add `diagrams/new-keyword.css` if needed. Add a manifest entry.
5. Run `node study-engine/verify-module-options.mjs` before publishing: four answers per card, options within a 1.15 word-count ratio, and no correct option uniquely longest by words or visible characters. This test also runs in the Pages workflow. Validate diagrams on mobile and desktop, correctness, themes and buttons. Link to `?module=new-keyword` after Pages deployment succeeds.
6. For offline export, assemble a separate standalone HTML file. **The GitHub Pages version intentionally uses shared assets and is not file:// portable.**

The migrated Softmax, Masking and Positional Encoding questions and diagrams come from the prior seven-layer pages; their unique graphics are preserved instead of being re-generated as generic templates.

## Quality and security
The module JSON contains trusted, authored HTML for figures and explanations. Treat it like source code; review changes before publishing. The renderer restricts module slugs to entries in the local manifest. Module data is not intended to accept arbitrary untrusted user input.

## Notes
The repository's older standalone-HTML policy remains applicable to exported offline editions. This engine is the new **hosted-page** mode requested by the repository owner. GitHub Pages must build and deploy before live URLs work.

## Quiz answer-quality policy
- Exactly four plausible, understandable options per layer; all distractors must be substantively relevant.
- **Avoid answer-length clues:** correct choices should not consistently be the longest, and alternatives should have reasonably similar visible lengths. Distribute correct letters across A/B/C/D rather than putting most in one position.
- Before committing a keyword, run `node study-engine/check-option-bias.mjs` (checks every module) or `node study-engine/check-option-bias.mjs gradient-descent` (one module). The check fails when the correct option is longest in more than two of seven layers, or one answer letter dominates.
- Review option quality manually too. The checker does not prove options are unambiguous, accurate, or pedagogically fair.
