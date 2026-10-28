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
- Quiz check, reset, progress, embedding explorer and adaptation picker all work offline.
