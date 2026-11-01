# Gradstudio AI Replication Playbook — English Visual Study Modules

**Purpose:** Use this file as a durable, repo-based reference when another AI (or another chat) is asked to build or revise a Gradstudio topic. Read [BEGINNER_ENGLISH_EDITORIAL_RULES.md](./BEGINNER_ENGLISH_EDITORIAL_RULES.md) too. The retained [Train/Validation/Test Split module](./modules/train-validation-test-split.json), [Backpropagation module](./modules/backpropagation.json) and the original [Multimodal Training template](../index.html) are current visual and content references. Data Leakage is an archived historical example, not one of the approved 58 topics.

## Non-negotiable content contract

1. The user supplies a keyword, topic/subject, seven questions and (sometimes) seven answers. Preserve **every question verbatim** except strip display-only prefixes such as `Layer 1` and `Question:`. Never replace technical words or simplify the wording of their questions.
2. If the user supplies correct answers, each must appear **verbatim as one of the four options**. Do not shorten, pad, or paraphrase those correct answers to fit a length heuristic. Store its actual A–D key in `answer`.
3. Exactly **four substantive options** per question. The other three must be **plausible misconceptions about the question's *same topic***, not definitions of unrelated concepts. Readers must need understanding—not keyword recognition—to choose.
4. Each incorrect option should be wrong for a **specific, teachable reason** (wrong timing, invalid assumption, reversed direction, overlooked boundary, incomplete mechanism, invalid comparison). Check there is only one correct option. Avoid laughably false claims, conspicuous extremes, repetitive wording, and clues such as “only option mentioning the keyword.”
5. Keep the options similar in reading effort (approximately ±15% in word count is a useful review threshold), but **never sacrifice meaning to achieve exact word parity**. The correct answer should not consistently be the longest or most polished-looking.
6. Each visible answer explanation must start **Explanation:**, directly address **all subquestions** before an example, use clear mentor-friendly English with precise technical terms, and stay at **100 words or fewer**. Use a different, relevant and technically accurate example for each of the seven questions. Do not display “YouTube mentor style” or similar labels.
7. Preserve existing diagrams, explanation details, themes, answer keys, and Telugu content when revising existing lessons. For new topics make **seven distinct instructional visuals** and a useful hero, not interchangeable box layouts. Include accurate equations, matrix details, timelines, workflows, plots or code wherever the question calls for them.
8. Do not claim a browser check, successful deployment, teaching-quality audit or passing strict length audit unless actually checked.

## The distractor test (the previous major failure)

**Bad pattern:** Question: “What is Data Leakage?” A: “Overfitting is ...”; B: “Data Leakage is ...” (correct); C: “Data Drift is ...”; D: “Label Noise is ...”. A novice can win by keyword matching.

**Good pattern:** All A–D options attempt to explain **what Data Leakage is and why model scores can mislead**. The wrong options make credible but concrete mistakes: they assume additional *available* training records are leakage, that a low independent test score itself constitutes leakage, or that hiding evaluation labels creates leakage. The correct option alone identifies information unavailable at prediction time entering training or evaluation.

**Editorial test for *every* question:** Hide the answer key. Could a reader identify the answer from unrelated keywords, phrasing, absolutes or length without understanding the concept? If yes, rewrite the incorrect options. Then check the three incorrect options are clearly technically false, not secretly valid under another interpretation.

## Repository structure and module creation

- Shared interactive HTML: `study-engine/index.html`, `study-engine/app.js`, `study-engine/core.css`. **Reuse these; do not copy the whole HTML boilerplate.**
- Lesson data: `study-engine/modules/<slug>.json`. A lesson contains `version`, `keyword`, `title`, `subtitle`, `hero`, `diagramStyle`, `questions`, optionally `sources`, and `footer`.
- Each `questions[]` item: `tag`, `stem`, `figure`, `options` (four full-text strings in A–D order), `answer` (one of `a`, `b`, `c`, `d`), `explanation`, optionally `technicalExplanation`.
- Each new module gets concept-specific responsive CSS under `study-engine/diagrams/<slug>.css`. The JSON `diagramStyle` points to `diagrams/<slug>.css`.
- Register `{ "slug": "<slug>", "title": "Title", "domain": "Topic · Subject" }` in the `modules` array of `study-engine/modules/index.json`.
- View the lesson at `https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module=<slug>`. This URL is the *expected* GitHub Pages location, not proof of deployment.
- The study engine offers 15 themes and quiz/reveal behavior; preserve them.

## Required visualization and Python code checks

- Draw figures that directly **teach the specific asked concept**: distinct mechanisms for each level, visible arrows with correct direction, clear legends, nonoverlapping annotations, and correct numerical examples. Check mobile overflow.
- For a Python-implementation question, provide runnable and technically valid code plus an explanatory figure. Test the code separately when practical.
- **Prevent the Q5 Data Leakage visibility bug:** `core.css` styles ordinary `code` with a light background. On a dark code panel, override `pre` and `pre code` background and foreground explicitly (for example, dark `#172b3b` and light `#f4f9ff`), remove inherited code borders/padding, retain `white-space:pre`, and make the `pre` horizontally scrollable. Confirm computed colors or inspect an actual screenshot. Apply stable fallback styles when dynamic module CSS loads late.
- Give inline SVG marker and gradient IDs unique names where needed; duplicate IDs can make arrows disappear.

## Source/content/visual QA before commit

1. **Source lock:** All seven supplied question stems remain unchanged apart from removable labels. Compare all user-supplied correct-answer strings byte-for-byte against the keyed option; verify the keys are correct.
2. **Pedagogical review:** For every Q, write down what parts it asks and ensure the correct option **and** explanation answer them all. Review each distractor for realistic same-topic error and ensure exactly one right answer.
3. **Clue check:** Reject keyword giveaway, overly short/absurd distractors, predictable key patterns, and distinctive correct-answer length. Use character and word counts as warnings, not substitute measures of quality.
4. **Explanation check:** At most 100 visible words, labeled only “Explanation,” starts with direct answer, has a unique and accurate example, no unintroduced jargon.
5. **Visual check:** Seven distinct educational diagrams, accessible SVG descriptions, responsive/mobile scrolling, working code-contrast rules and functional reveal behavior. **Actually inspect rendering** if available.
6. **Repository check:** Validate JSON parsing, all four options and correct-answer keys, source stylesheet and manifest entry, run `node study-engine/verify-module-options.mjs study-engine/modules/<slug>.json` if available. Its length results are *warnings* unless run with `--strict-length`; do not claim it measures pedagogical correctness.
7. **Publishing:** Commit module JSON, CSS and manifest. Fetch the committed files back for verification and supply the **real commit SHA** and the expected Pages HTML link. Report any unavailable visual test honestly.

## Source-of-truth hierarchy

1. User-provided exact questions and correct answers
2. Verified scientific/technical meaning and whether each part of the question is answered
3. This replication playbook and the English editorial rules
4. The existing module visuals/engine, adapted to the requested topic
5. Word-count and cosmetic layout heuristics (never override completeness)

**Scope:** English modules only unless explicitly asked otherwise. Never edit Telugu translations as a side effect of English revisions. When requesting translation, share the specific audited commit SHA, so a translator can work from an exact revision.


## Visual fidelity gate — raised after the Data Leakage v3 redesign

Do **not** treat a colored rectangle with text as a high-quality teaching diagram. Match the visual ambition of `modules/neural-network.json` and `modules/transformer.json` when planning scenes.

- Make a **hero illustration plus seven custom visual lessons**, each tied to the question's exact mechanism, not a seven-fold copy of the same box-and-arrow card.
- Use **varied visual languages** where relevant: illustrated real-world records, visual timelines, plots with labelled axes and numerical examples, fold matrices, actual code with side-by-side process flow, grouped-identity panels, and production lineage maps.
- Show **why** the concept works and the common error; mark invalid paths and valid paths clearly without hiding the distinction behind decorative text.
- Use typography with readable labels, clear connector direction, accessible SVG `role="img"` plus `aria-label`, scoped unique gradient/marker IDs, gentle depth and color with semantic meaning.
- Keep drawings informative on mobile. A wide detailed SVG may be horizontally scrollable if labels would otherwise be tiny; add a visible swipe hint and test code panels separately.
- Test actual rendered visuals on desktop and mobile when a browser is available. **Structural checks alone cannot prove visual quality.** State clearly if rendering could not be independently inspected.
- Guard preservation: a diagram upgrade must not rewrite user questions, correct answers, answer keys, explanatory text, tested code or Telugu materials unless explicitly requested.

**Current visual reference:** Use `modules/train-validation-test-split.json`, `diagrams/train-validation-test-split.css`, `modules/backpropagation.json` and the original root `index.html`. Historical Data Leakage illustrations are recoverable through Git history, not part of the active 58-topic library.

## SVG arrowhead quality rule — mandatory for EVERY English lesson

**Failure to avoid:** An SVG `<marker>` without `markerUnits="userSpaceOnUse"` defaults to units of the connector stroke width. A 9-unit marker on a 3px line becomes a **27px chunky arrowhead**; it can obscure nodes and overlap illustrations, especially on phones. Do not use large filled triangles, thick arrow tips, or an arrowhead wider than the gap it occupies.

1. Always use `markerUnits="userSpaceOnUse"`, `viewBox="0 0 10 10"`, `markerWidth="9"`, `markerHeight="9"`, `refX="8"`, `refY="5"`, and `orient="auto"`. Use an **open chevron**, not a filled wedge: `<path d="M1.5 2.2 L7.8 5 L1.5 7.8" fill="none" stroke="#4b8fa1" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>`.
2. Keep connector lines approximately 1.5–3px wide. Align the tip to the destination without covering the target or the illustrated object. Leave at least ~12px of clear arrow travel before the tip; avoid 9px arrow lines squeezed between panels. Marker IDs must be unique **within each SVG**.
3. Do not apply full-width/min-width CSS to **nested** SVG illustrations; use a direct-child selector like `.art > svg`. For desktop and mobile, prove that the **page itself** remains within the viewport; only intentionally wide diagram regions may scroll. On narrow phones, split a multi-panel SVG into stacked zoomed/cropped panels rather than shrinking labels or forcing a user to pan through a 1000px graphic.
4. Inspect the rendered arrowheads and text on **desktop and mobile**. Check every arrow in the hero plus Q1–Q7 for clear head size, consistent line weight, spacing, non-overlap, visible direction and legible labels. Static JSON validation alone is not a browser screenshot test.
5. Run `node study-engine/verify-svg-arrowheads.mjs` before publication. The deployment workflow enforces this rule for all approved English modules plus Data Augmentation. The shared runtime `study-engine/svg-arrowheads.js` also normalizes imported arrowheads in English and Telugu overlays as a safety net, but new source assets **must** obey the rule directly.
