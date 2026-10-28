# Gradstudio Version 2.0 — module template rules

This repository's `index.html` is the visual and interaction standard for subsequent study modules. For another topic, duplicate the file and replace the educational content while retaining the design and assessment rules.

## Content and sequence

1. Start visible question labels and question text at **Q1 / 1.**, then increment continuously. Do not reuse upstream textbook question IDs in the user-facing numbering.
2. Keep explanations substantive and beginner-friendly. Put prerequisites immediately before the concepts they unlock when possible.
3. End every module with **exactly one scenario-based interview question**, with a reasoned answer or model response.
4. Record topic/page provenance in a short caption without exposing irrelevant book metadata; do not invent facts outside the provided source.

## Assessment integrity

1. Every question has four defensible, parallel alternatives; three are plausible but demonstrably incorrect or suboptimal.
2. Do not reveal the answer by length, bold keywords, absolute language, excessive detail, or a predictable letter pattern.
3. Within a question, keep choice lengths roughly similar (aim for longest/shortest ratio <= 1.4). Keep supporting statistics and full reasoning in the **post-submission explanation**, not only the right option.
4. Check that a reader must understand the distinction, not merely recognize an obviously absurd distractor.
5. Validate the `data-answer` key, input name, displayed option labels, progress count, answer highlighting, and reset behavior after edits.

## Visual design

1. Make a diagram teach a specific mechanism: use charts, scenes, trajectories, vector plots, miniature UIs, or spatial relationships. Avoid presenting ordinary paragraphs as a stack of boxes.
2. Prefer HTML and CSS with content-driven height for labels and responsive grids. Do not force text inside fixed-height SVG containers.
3. If SVG is needed, avoid tiny text, hard-coded positions that collide, and oversized arrowheads. Use small, consistent connectors.
4. Every figure needs an accessible text description. Diagrams must remain useful on desktop and narrow mobile screens.
5. Use `min-width:0`, `overflow-wrap:anywhere`, reasonable spacing, and accessible focus styles on interactive components.
6. Treat any chart scores/coordinates used for teaching as **illustrative**, never real measurement.

## Module completion QA

- No horizontal page overflow at 360px, 768px or 1280px.
- No overlaps, clipped text or unreadable annotation inside figures.
- Numbering starts at 1 and is consecutive.
- Correct choices are not conspicuously longer than distractors.
- Exactly one final interview scenario.
- Quiz check, reset, and progress work.
- All Concept Lab interactions work and remain specific to the current topic.
- **No study module displays a theme selector or a palette gallery.** The selected module color is fixed.

## Separation of themes from study modules

The 15 palettes are maintained in the **standalone Design Library** at [themes/index.html](themes/index.html). This page alone may display the palette gallery and shareable `?theme=...` preview URLs.

Every study module, including the original multimodal module and new keyword study modules, must use **one fixed theme only**. When the user does not name a theme, choose one of the 15 styles without asking, hardcode the chosen palette into the module, and never show a theme selection UI inside the lesson. Do not put palette cards, 15-theme selectors, color-picker buttons, or theme parameter logic in study HTML/JS. A small link to the separate Design Library is acceptable, but no embedded gallery.

Quality gate: inspect accent, page background, contrast, diagrams and legibility for the chosen theme. Avoid visually redundant colors in the gallery. Keep the Concept Lab interactions aligned with the module's teaching objective.

The original interactive lab uses relative `lab-v3.js` and `lab-v3.css` files. For new topics, replace topic-specific examples and interactions; do not copy the AI lab into a Web API lesson.

## Keyword Study variants — eight-question standard

For user-supplied technical keywords, follow [the Keyword Study standard](keyword-study/STANDARD.md), beginning with [Web API demo 001](keyword-study/web-api/). Each module contains exactly seven progressively harder questions plus one final interview MCQ (eight total). Preserve the subject/domain/book/keyword metadata, provide four plausible length-balanced options per question, and include one genuinely distinctive diagram per question. Concept Lab interactions must be specific to the current keyword rather than copied from the previous AI module.
