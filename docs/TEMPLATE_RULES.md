> **2026-10-30 current organization:** old standalone HTML references below now live under `archive/legacy-lessons/`; new hosted modules are canonical in `study-engine/` with active entry HTML under `lessons/`. Monolithic output rules apply only to standalone offline requests.

# Gradstudio Version 2.0 — Quick Template Rules

> **Start here:** [STUDY_MODULE_BUILD_STANDARD.md](./STUDY_MODULE_BUILD_STANDARD.md) is the definitive detailed specification. [AGENTS.md](../AGENTS.md) tells new coding agents to read it first. If these shorter rules conflict, the full standard wins.

## Baseline

- Original look and behavior: `../index.html` (Multimodal Training).
- Corrected self-contained output reference: `archive/legacy-lessons/api-design/Web-API-Keyword-Study-008.html`.
- Topic-specific GPT example: `archive/legacy-lessons/llm-foundations/GPT-LLM-Foundation-Keyword-Study-008.html`.
- Color definitions and names: `THEME_GUIDE.md`.

## Required output

- Show only **Subject, Domain, Keyword** in the metadata.
- If only a keyword is given, create **eight progressively harder questions**, ending with exactly one scenario-based interview question.
- If questions are supplied, preserve their exact wording and order, even if the count is not eight. Number visibly from 1 without altering the question sentence.
- **Strict zero-repetition:** Audit all questions against each other and existing curriculum modules. A reworded question that asks for the same concept, reasoning, or answer is still a duplicate. Define one unique tested learning objective per question; compare semantics, not just exact wording. Preserve any user-supplied stems and flag conflicts rather than editing them.
- Four genuinely plausible, similarly sized options per MCQ, exactly one correct. Avoid easy answer-length clues, predictable patterns, and jargon-heavy reading fatigue.
- Explain each answer in approximately **50 words** (normally 40–60).
- **MANDATORY VISUAL BENCHMARK:** Open the actual root [Multimodal Training page](../index.html) and inspect its **seven different original diagrams** before drawing anything. Its diagram quality, not just its radio buttons and 15 themes, is the gold standard. Read [VISUAL_GOLD_STANDARD.md](VISUAL_GOLD_STANDARD.md).
- Every question-card diagram must be a **bespoke visual composition**; **no two diagrams in the module or across adjacent keyword modules may share the same skeleton**. Changing text, colors, labels, icons or arrows does not make a new diagram.
- **NO explanatory text in rectangles masquerading as diagrams.** Real token/code/data/UI labels may be drawn when technically necessary, but no cards with sentences, simple box chains, or repetitive visual templates. If only empty boxes and arrows remain after removing the text, reject it.
- A module fails if ANY card does not match the original's pictorial/technical quality; inspect screenshots of all eight at desktop and mobile and compare against the seven originals. If no browser review took place, report that visual quality is unverified—not complete.
- No icon explosion: the broad `.q-fig svg { width:100% }` rule is for illustrations. Scope small SVG icons with a stronger CSS selector and an intentional ~18–24px size. Test computed dimensions.
- Keep the approved Multimodal question UI, normal small radio circles, scoring, Reset, progress and sticky 15-theme dropdown.
- Every finished module is **one complete HTML file** with inline CSS, JS, SVG and all educational content. No companion assets or network connection required.

## Ranked curriculum and no-repetition tracking

- **Central ranked file:** [KEYWORD_INDEX.md](../KEYWORD_INDEX.md) lists all 265 keywords in exactly the order of the [attached ranked PDF](../references/Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf), with topic, importance, completion status and committed HTML links.
- **Question audit:** [QUESTION_REGISTRY.md](../QUESTION_REGISTRY.md) records published question stems. Wording changes, synonyms and new scenarios do not make repeated learning objectives unique.
- Before starting, read the index, PDF, registry and full build standard. Default to the **earliest pending rank**, unless the user explicitly requests a different term.
- After creating and verifying the HTML, update the same ranked row, add the module link, append its eight question stems to the registry and refresh the README progress. A module with an unupdated central tracker is not considered finished.

## Browser preview links (mandatory)

- For each Complete row in [KEYWORD_INDEX.md](../KEYWORD_INDEX.md), put **two separate links**: **Preview in browser** (GitHub Pages, intended to render the running MCQ interface) and **View HTML source** (GitHub's code viewer).
- **Preview URL format:** `https://sabareeshrao.github.io/Gradstudio-Version-2.0/<exact-file-name>.html`. Do not call a `github.com/.../blob/main/...html` link a browser preview.
- Keep README and [QUESTION_REGISTRY.md](../QUESTION_REGISTRY.md) preview links aligned with the index.
- Confirm that the Pages preview actually loads the intended quiz whenever browser access permits; otherwise disclose **not verified** and offer the offline HTML file, not a misleading code-view link.
- In replies show **Preview in browser first**, then the separate source/download link.

## Repository folders and Pages compatibility

- New complete HTML modules go in `lessons/<topic>/`, not root. Site `index.html`, `lab-v3.js`, `lab-v3.css` must stay in root.
- Detailed rules are under `docs/`; theme example pages belong to `templates/`; old demos belong to `archive/`.
- The Pages deployment workflow copies every full HTML file into a deployed root alias, preserving all existing flat browser preview URLs. **Only one canonical source** per lesson remains in GitHub.
- For new work, update [the ranked index](../KEYWORD_INDEX.md) and [question registry](../QUESTION_REGISTRY.md) with the correct nested GitHub source path and old-style root Pages preview URL. Never manually duplicate lesson HTML in repository root.

- **Mandatory INTRO DIAGRAM:** Every module must contain one bespoke illustrated module-map hero **above Q1**, like the original Multimodal Training `index.html`. Total is **9 visuals** per eight-question module: 1 hero + 8 unique card diagrams. The hero must have unique composition, not generic text-in-box flow or a copy of Q1.
## Quality gate

Check the eight question stages, source grounding, plausible options and answer keys, **original seven Multimodal diagrams as visual reference**, eight individually unique custom compositions, zero text-box impostors, theme switching, keyboard use, 360/390/768/1280/1440px layout, text wrapping, icon sizing, reset, quiz logic and offline opening. Never claim browser-verified visual quality on the basis of source inspection alone.

When a bug is universal, improve reusable authoring patterns and migrate approved outputs carefully; do not overwrite unrelated modules, root templates, or originals without a request.

**Full quality rubric, complete build sequence, and pass/fail criteria:** [STUDY_MODULE_BUILD_STANDARD.md](./STUDY_MODULE_BUILD_STANDARD.md).
