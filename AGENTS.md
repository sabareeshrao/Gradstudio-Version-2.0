# AGENTS.md — Read first for Gradstudio module work

This repository creates premium visual MCQ study modules. **Before creating, editing, fixing, or batch-generating a study module, read [STUDY_MODULE_BUILD_STANDARD.md](./STUDY_MODULE_BUILD_STANDARD.md) completely.** It is the binding authoring and QA contract.

## Non-negotiable rules

1. **Do not change user-supplied questions.** Keep text and order verbatim; question numbers begin at 1 and are separate from the stem.
2. For a keyword-only request, default to eight progressive questions ending in **one scenario-based interview question**, with four credible options per question.
3. Use beginner-friendly but meaningful English, balanced answer lengths and letters, and approximately 50 words per explanation.
4. Create **one genuinely instructive and premium visual per question**. No generic text-in-box diagrams, oversized SVG icons, bulky arrows, text overlap or mobile overflow.
5. **Reuse the existing Multimodal/Gradstudio UI exactly:** ordinary circular radio buttons, card structure, scoring, reset, sticky top bar and 15-theme dropdown. The corrected `Web-API-Keyword-Study-008.html` illustrates the SVG icon-sizing fix.
6. **Author modularly; export monolithically.** Every delivered HTML file includes all CSS, JS, images/diagrams, options, explanations and theme data. It must open offline without any companion file.
7. Only three metadata fields: **Subject, Domain, Keyword**.
8. Verify question/answer mapping, source accuracy, mobile and desktop layout, interactions and all 15 themes. Never claim visual browser QA without actually doing it.
9. Preserve `index.html`, existing standalone originals and unrelated modules when adding a new keyword.
10. If a universal design or assessment rule changes, update `STUDY_MODULE_BUILD_STANDARD.md` and keep compatibility docs aligned.

**Authoritative reference order:** user requirements and supplied questions > `STUDY_MODULE_BUILD_STANDARD.md` > current templates/examples.

**Default eight-stage progression:** Introduction; Fundamentals; Working Mechanism; Technical Understanding; Practical Application; Advanced Understanding; Smart-Level Reasoning; Interview Question.

**Required final response:** GitHub source link, raw standalone HTML link, Pages link if deployed, counts/QA facts, and any unverified tests.

Do not bypass the detailed acceptance checks and quality rubric in the full standard.
