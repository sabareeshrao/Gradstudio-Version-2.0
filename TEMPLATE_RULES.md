# Gradstudio Version 2.0 — Quick Template Rules

> **Start here:** [STUDY_MODULE_BUILD_STANDARD.md](./STUDY_MODULE_BUILD_STANDARD.md) is the definitive detailed specification. [AGENTS.md](./AGENTS.md) tells new coding agents to read it first. If these shorter rules conflict, the full standard wins.

## Baseline

- Original look and behavior: `index.html` (Multimodal Training).
- Corrected self-contained output reference: `Web-API-Keyword-Study-008.html`.
- Topic-specific GPT example: `GPT-LLM-Foundation-Keyword-Study-008.html`.
- Color definitions and names: `THEME_GUIDE.md`.

## Required output

- Show only **Subject, Domain, Keyword** in the metadata.
- If only a keyword is given, create **eight progressively harder questions**, ending with exactly one scenario-based interview question.
- If questions are supplied, preserve their exact wording and order, even if the count is not eight. Number visibly from 1 without altering the question sentence.
- **Strict zero-repetition:** Audit all questions against each other and existing curriculum modules. A reworded question that asks for the same concept, reasoning, or answer is still a duplicate. Define one unique tested learning objective per question; compare semantics, not just exact wording. Preserve any user-supplied stems and flag conflicts rather than editing them.
- Four genuinely plausible, similarly sized options per MCQ, exactly one correct. Avoid easy answer-length clues, predictable patterns, and jargon-heavy reading fatigue.
- Explain each answer in approximately **50 words** (normally 40–60).
- Use **one high-quality, concept-specific diagram per question**. Real mechanisms, real objects, varied visual forms; never just boxes of text.
- No icon explosion: the broad `.q-fig svg { width:100% }` rule is for illustrations. Scope small SVG icons with a stronger CSS selector and an intentional ~18–24px size. Test computed dimensions.
- Keep the approved Multimodal question UI, normal small radio circles, scoring, Reset, progress and sticky 15-theme dropdown.
- Every finished module is **one complete HTML file** with inline CSS, JS, SVG and all educational content. No companion assets or network connection required.

## Ranked curriculum and no-repetition tracking

- **Central ranked file:** [KEYWORD_INDEX.md](KEYWORD_INDEX.md) lists all 265 keywords in exactly the order of the [attached ranked PDF](references/Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf), with topic, importance, completion status and committed HTML links.
- **Question audit:** [QUESTION_REGISTRY.md](QUESTION_REGISTRY.md) records published question stems. Wording changes, synonyms and new scenarios do not make repeated learning objectives unique.
- Before starting, read the index, PDF, registry and full build standard. Default to the **earliest pending rank**, unless the user explicitly requests a different term.
- After creating and verifying the HTML, update the same ranked row, add the module link, append its eight question stems to the registry and refresh the README progress. A module with an unupdated central tracker is not considered finished.

## Quality gate

Check the eight original question stages, source grounding, option plausibility and answer keys, unique diagrams, theme switching, keyboard usability, 360/390/768/1280/1440px layout, text wrapping, icon sizing, reset and quiz logic, and offline opening. Never claim browser-verified visual quality on the basis of source inspection alone.

When a bug is universal, improve reusable authoring patterns and migrate approved outputs carefully; do not overwrite unrelated modules, root templates, or originals without a request.

**Full quality rubric, complete build sequence, and pass/fail criteria:** [STUDY_MODULE_BUILD_STANDARD.md](./STUDY_MODULE_BUILD_STANDARD.md).
