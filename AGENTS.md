# AGENTS.md — Read first for Gradstudio module work

> **Active-folder cleanup (2026-10-30):** The old independent HTML examples now reside in `archive/legacy-lessons/`. The `lessons/` folder lists current Batch 01 study modules using thin HTML entrypoints, with canonical content in `study-engine/modules/`. Historical nested Pages lesson URLs redirect to archived originals, while historical root URLs retain full HTML copies. For future hosted modules, keep following the shared Study Engine rule below.

> **New owner-approved hosted mode (2026-10-30):** For future user-provided question lists intended for GitHub Pages, build in [study-engine/](study-engine/README.md): preserve exact stems, use four beginner-friendly options and independent illustrated diagrams; reuse the shared CSS, themes, rendering and quiz logic. Publish `?module=<slug>` links. The existing single-file/offline rule still applies to standalone exports and legacy lesson artifacts. Do not duplicate engine boilerplate for each hosted keyword. No diagram-quality exception is permitted.

This repository creates premium visual MCQ study modules. **Before creating, editing, fixing, or batch-generating a study module, read [STUDY_MODULE_BUILD_STANDARD.md](./docs/STUDY_MODULE_BUILD_STANDARD.md) completely.** It is the binding authoring and QA contract.

## Non-negotiable rules

1. **Do not change user-supplied questions.** Keep text and order verbatim; question numbers begin at 1 and are separate from the stem.
2. For a keyword-only request, default to eight progressive questions ending in **one scenario-based interview question**, with four credible options per question.
3. Use beginner-friendly but meaningful English, balanced answer lengths and letters, and approximately 50 words per explanation.
4. **Mandatory original visual benchmark:** Open `index.html` and inspect all SEVEN original Multimodal Training diagrams (not merely CSS/quiz UI); study [docs/VISUAL_GOLD_STANDARD.md](docs/VISUAL_GOLD_STANDARD.md). Every card needs bespoke, technically meaningful artwork at or above the original's quality. **No two diagrams in one module or an adjacent keyword batch may share the same visual composition**, regardless of relabeled text/icons/colors. **Absolutely no explanatory text-in-box diagrams**, feature-card rows, or generic arrows masquerading as visuals. Short intrinsic token/data/UI labels are fine. Visually compare all eight rendered diagrams against the original seven before approval.
5. **Reuse the existing Multimodal/Gradstudio UI exactly:** ordinary circular radio buttons, card structure, scoring, reset, sticky top bar and 15-theme dropdown. The corrected `archive/legacy-lessons/api-design/Web-API-Keyword-Study-008.html` illustrates the SVG icon-sizing fix.
6. **Author modularly; export monolithically.** Every delivered HTML file includes all CSS, JS, images/diagrams, options, explanations and theme data. It must open offline without any companion file.
7. Only three metadata fields: **Subject, Domain, Keyword**.
8. Verify question/answer mapping, source accuracy, mobile and desktop rendering of **each of the eight different diagrams**, interactions and all 15 themes. **No screenshot/browser QA = no claim of premium visual quality or completed visual acceptance.** Reject any single generic box-based or cloned diagram.
9. Preserve `index.html`, existing standalone originals and unrelated modules when adding a new keyword.
10. If a universal design or assessment rule changes, update `docs/STUDY_MODULE_BUILD_STANDARD.md` and keep compatibility docs aligned.

11. **Strict no-redundancy:** Do not repeat a question's learning objective within or across keyword modules. Rewording, replacing a noun, or using a new example does not make a repeated question unique. Audit existing curriculum questions and each new question's core answer/reasoning. Keep user-supplied stems unchanged; flag overlaps instead of rewriting them.

12. **Rank-ordered curriculum control:** Before generating any keyword, read [KEYWORD_INDEX.md](KEYWORD_INDEX.md), the [ranked PDF](references/Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf), and [QUESTION_REGISTRY.md](QUESTION_REGISTRY.md). Follow exact PDF rank order unless the user names another keyword. After a verified commit, update the central index link/status, append exact question stems to the registry, and refresh README progress. Never mark a non-existent lesson as complete.

13. **Browser preview links:** Every completed entry in `KEYWORD_INDEX.md` MUST have a primary GitHub Pages **Preview in browser** link that opens the interactive lesson, and a separate **View HTML source** link for GitHub code. Add preview links to README and question registry too. Never confuse a `github.com/.../blob/...html` code viewer with a live preview. Verify Pages or report that deployment is unverified.

14. **Folder organization:** Keep the repository root clean: place keyword HTML under `lessons/llm-foundations/`, `lessons/text-processing/`, or another appropriate topic folder. Keep full manuals in `docs/`, standalone theme examples in `templates/`, and old prototypes in `archive/`. `index.html`, `lab-v3.css`, and `lab-v3.js` remain in root because the original homepage needs them. Do not copy lesson HTML manually into root: the Pages deployment workflow creates complete root-URL compatibility copies automatically. Update source-code links to actual nested paths while retaining historical root browser-preview URLs.

15. **Mandatory illustrated intro map:** Every keyword module requires a premium illustrated overview hero before Q1, matching the original Multimodal Training module map in visual teaching quality. Create **one distinct hero + eight individually distinct card diagrams**; never use the same intro-map skeleton across keyword modules. Do not approve missing or text-box-led hero diagrams. Inspect all nine rendered visuals.

**Authoritative reference order:** user requirements and supplied questions > `docs/STUDY_MODULE_BUILD_STANDARD.md` > current templates/examples.

**Default eight-stage progression:** Introduction; Fundamentals; Working Mechanism; Technical Understanding; Practical Application; Advanced Understanding; Smart-Level Reasoning; Interview Question.

**Required final response:** **Preview in browser** (GitHub Pages) first, then distinct **HTML source** (GitHub code) and optional raw HTML. Check the live preview if possible and clearly label it unverified when inaccessible. Include counts/QA facts and any unverified tests.

Do not bypass the detailed acceptance checks and quality rubric in the full standard.
