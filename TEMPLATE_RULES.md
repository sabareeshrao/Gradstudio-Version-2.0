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
- Quiz check, reset, progress, embedding matching, retail adaptation studio, case challenge, and all fifteen color selections work on GitHub Pages.

## Reuse of themes and Concept Lab

The fifteen themes are selected from the `THEMES` array near the end of `index.html`. Use `?theme=sunset`, `ocean`, `forest`, `sky`, `rose`, `midnight`, `cocoa`, `ruby`, `arctic`, `slate`, `lime`, `coral`, `fuchsia`, `periwinkle`, or `silver`. These variants share one HTML file. Do not duplicate lesson content for each theme.

The interactive Concept Lab is implemented by `lab-v3.js` and `lab-v3.css`, linked as relative assets in `index.html`. Reuse the mechanism of input, observable state change, and explanatory outcome for new modules, but rewrite topic-specific examples instead of reusing unrelated retail or animal examples. Identify all model outputs, toy vectors, scores, and training effects as educational illustrations, not measured model results. Keep those relative assets alongside each HTML entry point in GitHub Pages.
