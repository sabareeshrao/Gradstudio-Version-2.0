# Keyword Study — reusable module standard

This document is the specification for **each new technical keyword**. The current example lives in `keyword-study/web-api/`.

## Required module header

| Field | Requirement |
|---|---|
| Subject | Exact discipline or field |
| Domain | Narrow subject area |
| Book | The book named by the user; do not claim details from unseen pages |
| Keyword | The technical keyword being studied |
| Total questions | **8** |
| Difficulty | **Introductory → Smart → Interview** |

## Exactly eight questions, in this order

| No. | Level | Purpose |
|---|---|---|
| 01 | INTRODUCTION | Define the keyword and distinguish it from an adjacent concept |
| 02 | FUNDAMENTALS | Explain why the concept exists and what problem it solves |
| 03 | WORKING MECHANISM | Follow a real or conceptual operating sequence |
| 04 | TECHNICAL UNDERSTANDING | Identify important components, inputs, rules, and outputs |
| 05 | PRACTICAL APPLICATION | Apply the concept to a plausible development task |
| 06 | ADVANCED UNDERSTANDING | Handle expected failures, constraints, and alternatives |
| 07 | SMART-LEVEL REASONING | Solve an edge case that requires more than memorization |
| 08 | INTERVIEW QUESTION | Make a defensible architecture or implementation decision, including trade-offs |

Convert **each of the eight** into **one four-option MCQ**. Preserve the user's conceptual progression and question intent. Keep the total at 8, with **exactly one final interview question**; do not quietly add prerequisite MCQs.

## Assessment rules

- Four defensible answers per MCQ: one correct and three plausible misunderstandings.
- Keep choices syntactically parallel and reasonably close in character length; target maximum/minimum length ratio **≤1.4** for each MCQ.
- Distribute the correct letters without repetitive, predictable patterns.
- Never bold or visually reveal the correct answer before the user checks.
- Detailed post-check explanations must give the right reasoning, relevant mechanics, and why other choices are not suitable. For the final interview MCQ, include a substantive model answer with practical trade-offs.
- Preserve independent, layman-friendly, technically rigorous explanations. Do not mention a teacher or instructor.
- Check numbering, input names, selection, scoring, reset, progress, and answer highlights.

## Diagram and interactive learning quality

- **One unique, concept-specific diagram for each MCQ.** Eight copies of text boxes with different labels do not qualify.
- Vary visual grammar based on meaning: architectural maps, device illustrations, request timelines, annotated request/response examples, resource trees, status ladders, retry traces, interface mockups, decision paths, or real comparative plots.
- A figure should visibly explain the causal mechanism or relationship. Use minimal arrows with modest heads, not bulky arrows or unexplained decorations.
- Use content-driven layout and responsive labels; prefer HTML/CSS over fixed-coordinate SVG text. Wrap content naturally; avoid overlaps, clipping, and horizontal scroll.
- Add **two or three working Concept Lab interactions designed for the current keyword**, not unrelated examples from a prior module. Each control must visibly affect a meaningful input, mechanism, and result.
- Label made-up vectors, metrics, API replies, or simulation outcomes as illustrative.
- Test across narrow mobile and desktop widths; confirm the interaction works using keyboard controls and readable focus indication.
- Never claim a visual browser test or live deployment unless actually verified.

## Visual styles, paths, and publishing

- **Choose exactly one theme when building a module.** If the user does not specify a theme, select one from the standalone [Design Library](../themes/) and apply it as a **fixed palette**. Never embed a theme selector, 15-palette list, theme switcher, shareable theme control, or theme-choice URLs in any keyword lesson.
- The independent [Theme Gallery](../themes/) exists for choosing design styles; it must not be embedded inside the study HTML.
- Keep theme CSS values and accessible contrasts inside the module, with no dependency on the separate gallery at runtime. The user should only see the topic, context, eight MCQs, diagrams, scoring and keyword-specific Concept Labs.
- Store each module in its own folder: `keyword-study/<keyword-slug>/index.html`, with relative assets beside it.
- GitHub Pages serves the study module at `/Gradstudio-Version-2.0/keyword-study/<keyword-slug>/` if Pages is enabled.
- Preserve the original template page as a separate study module; do not replace it with the new keyword content.
- When publishing a new module, add a discoverable index link without disturbing existing quiz functionality.

## Grounding and source limits

A keyword list and eight supplied question prompts are a **study outline**, not excerpts from the entire named book. Use the user-provided outline as the structure. Explain any added general technical knowledge as independent study material, and do not claim it is a quotation or verified fact from unseen source pages. When actual book pages are supplied, stay within the supplied pages unless the user requests external research.

## Mandatory separation QA

Before pushing any keyword module, verify its HTML and JavaScript contain **none** of `theme-gallery`, `themeList`, `themeChoices`, `copyTheme`, `setupThemes`, or `const THEMES=`. One deliberately chosen palette is a presentation detail, not a learner-facing control. The standalone design gallery at `themes/index.html` may contain these controls.
