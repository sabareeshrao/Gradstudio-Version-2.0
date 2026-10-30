# Gradstudio — AI Module Build & Quality Standard

**Version:** 1.4  
**Status:** Required standard for future keyword-study modules  
**Repository:** https://github.com/sabareeshrao/Gradstudio-Version-2.0  
**Audience:** Any AI assistant, coding agent, developer, reviewer, or maintainer creating or fixing a module.

> **Operating rule: Develop modularly. Deliver monolithically. Preserve questions. The original seven Multimodal Training diagrams—not generic boxes—are the mandatory visual gold standard. No two question-card diagrams may share a composition.**

## 0. Purpose, scope, and order of authority

Gradstudio turns a technical keyword (or supplied questions) into a complete, beginner-friendly but technically rigorous, visually engaging MCQ learning page.

Apply these instructions to every new module, whether one keyword or a batch of 5, 10, or more. They govern content, layout, diagrams, interaction, accessibility, files, regression checks, and GitHub delivery.

**Instruction priority when there is a conflict:**

1. The user's latest explicit requirements for that module.
2. Verbatim questions and source material the user supplied.
3. This document.
4. The existing reference templates and old module content.

Never “fix,” summarize, simplify, or paraphrase supplied question wording unless the user explicitly asks. An older example does not override these rules.

## 1. Canonical references: read before writing

| Repository path | Use | Important limitation |
|---|---|---|
| `index.html` | **Mandatory original visual gold standard:** inspect ALL SEVEN question-card diagrams (`d-scale`, `d-space`, `d-dual`, `d-hub`, `d-retail`, `d-paths`, `interview-section`), as well as UI and 15 themes | Never treat it merely as a CSS/quiz-shell reference. Reproduce its craftsmanship, not the same topic imagery. |
| `lessons/api-design/Web-API-Keyword-Study-008.html` | Corrected standalone baseline for options, responsive figures, diagrams, and the **small SVG icon sizing repair** | Web API content is an example, not content to copy to unrelated topics. |
| `lessons/llm-foundations/GPT-LLM-Foundation-Keyword-Study-008.html` | Example of topic-specific questions, explanatory diagrams, and small interactive demonstrations | Do not copy GPT content, interaction scenarios, or illustrative probabilities into other topics. |
| `THEME_GUIDE.md` | Authoritative names and IDs of the 15 existing palettes | Do not silently add, rename, duplicate, or delete themes. |
| `TEMPLATE_RULES.md` | Quick compatibility checklist linking to this full standard | This document takes precedence if older text conflicts. |

**Before editing:** fetch the latest repository files. Do not rely on memory of what they used to contain. Preserve the root homepage and historical standalone backups unless explicitly directed to change them.

## 2. Inputs and module contract

### 2.1 Only three metadata fields are visible

At the top, display exactly this metadata table shape:

| Field | Details |
|---|---|
| Subject | User supplied, or carefully derived from the keyword |
| Domain | User supplied, or carefully derived from the keyword |
| Keyword | Exact requested keyword |

Do not append Book, Pages, Total Questions, Difficulty, Source, Instructor, Batch, or other metadata fields. The page may still contain a normal heading, context, and question numbers.

When the user explicitly gives a domain, keep it. Example: **Generative Pre-trained Transformer (GPT)** belongs to **LLM Foundation**. Do not silently reclassify it.

### 2.2 User provides only a keyword

Generate a short, accurate, independently written context followed by **eight MCQs**, one per learning stage:

1. INTRODUCTION — What is it?
2. FUNDAMENTALS — Why is it needed, and which problem does it solve?
3. WORKING MECHANISM — How does it actually work?
4. TECHNICAL UNDERSTANDING — What are its components, inputs, outputs, or rules?
5. PRACTICAL APPLICATION — How would it be used or implemented?
6. ADVANCED UNDERSTANDING — What limitations, failures, or design constraints matter?
7. SMART-LEVEL REASONING — Can the learner reason through a realistic edge case?
8. INTERVIEW QUESTION — Can the learner explain a realistic scenario and sensible trade-offs?

**The eighth item must be one substantive scenario-based interview question.** Progress conceptually; do not make earlier items trivially repetitive or jump to expert-only jargon.

### 2.3 User supplies the question list

- Preserve each original question **character-for-character in substance and wording**, including its punctuation, technical terms, and ordering; do not improve its English.
- Keep the exact number of user-supplied questions, even when it is not eight, unless the user explicitly asks to add questions.
- Use a separate visible question number/badge starting at **01 / Q1** and increasing consecutively. Do not insert extra digits into the supplied question sentence.
- Keep all supplied headings or stage labels as given, if any.
- Add only the necessary options, correct answer, concise explanation, and teaching diagram.
- If a supplied question is genuinely ambiguous, do not silently change the stem; identify the ambiguity and select defensible wording for options, or disclose the issue.

### 2.4 User provides book excerpts, transcripts, or reference files

Ground claims, examples, and explanations in the supplied material unless the user explicitly requests outside research. Do not silently introduce advanced material, fabricated citations, invented figures, or unprovided page numbers. If outside verification or research is requested, distinguish it from the source-derived content. Don't insert a book title into visible metadata.

### 2.5 Work involving several keywords

Each keyword receives its own independent module, questions, diagrams, QA report, and full HTML file. **Never reduce design quality simply to finish more topics.** Do not claim a batch is completed if only a subset has been built.

## 3. Assessment quality: questions and four options

### 3.1 Exactly one best answer

- Write **four** alternatives, A–D, for each question.
- Only one is the defensibly best choice under the question's assumptions.
- Wrong options must be plausible mistakes a motivated beginner could genuinely make, not ridiculous statements.
- Options must test the *conceptual distinction* asked by the question, not general reading ability.
- Verify there is no second technically valid answer hidden in a distractor. Consider ordinary edge cases and implicit assumptions.

### 3.2 Level 1–2 reading, without making the content childish

- Level 1: simple sentence structure and familiar words around an essential technical term.
- Level 2: realistic developer examples and one additional concept when needed.
- Avoid needlessly complicated prose, stacked subordinate clauses, and dense academic vocabulary.
- Also avoid one-word or cartoonishly short distractors; simplicity must not erase technical meaning.
- Define a new necessary term in the short explanation or the relevant diagram.
- Prefer a concrete action or scenario over abstract marketing language.

### 3.3 Fight answer-length bias and guessing shortcuts

- Keep the four options **similar in visual size and complexity**. Target longest/shortest word-count ratio **no greater than 1.4**, where the subject allows it.
- A useful starting range is roughly **12–25 words per option**, but correctness takes priority over any mechanical word limit.
- Never make the correct choice consistently longest, most qualified, boldest, or most technical.
- Do not use "always," "never," "only," "obviously," "all of the above," or "none of the above" as a cheap giveaway.
- Avoid three implausible statements plus one sensible statement.
- Keep grammatical structure parallel where possible.
- Do not rely on extremely long exact code examples in one option when others are short. Use balanced endpoint examples.
- Bold, accent colors, or explanatory tooltips must **not** reveal the answer before submission.

### 3.4 Answer positioning

For a default eight-question module, distribute correct answers **two each across A, B, C, D**, without a predictable A-B-C-D cycle. For a user-supplied non-eight count, keep distribution as even as reasonably possible. The correctness of the choices is more important than distribution; never rearrange into a wrong key merely to balance letters.

### 3.5 Explanation constraint

- Target **50 words** after revealing an answer, with an acceptable working range of **40–60 words**, unless the user requests a different limit.
- Include: (a) the correct underlying idea; (b) one mechanism, distinction, or realistic example; and (c) why it matters.
- Do not restate the entire question or repeat the right option word for word.
- No essay-length explanation, redundant introduction, large table, or lengthy “why every other option is wrong” section by default.
- When an edge case truly needs more words, simplify the thought without sacrificing accuracy; disclose a necessary qualification in the diagram if useful.
- Never claim educational toy scores, token probabilities, vectors, or generated outputs were measured from an actual model unless verified.

### 3.6 Strict zero-redundancy policy (mandatory for every module)

**Changing the words does not create a new question.** If two questions measure the same knowledge, apply the same reasoning path, or differ only through synonyms, word order, examples, or topic labels, they are **duplicates** and must not both be published.

This is an **intent-level and learning-objective check**, not merely a text-string check. It applies:

1. **Within one module:** No two of the eight question stems may ask for the same conceptual answer, even if they use different words or different stories.
2. **Across existing modules in the same curriculum:** Inspect current questions in adjacent keywords (especially GPT, Transformer Architecture, GenAI, Autoregressive Language Modeling, and LLMs). Avoid retesting their already-covered learning objectives with a renamed subject.
3. **Across future batches:** Check the published question inventory before generating any new set. Maintain a persistent inventory when practical; do not assume a keyword title guarantees uniqueness.
4. **Preserve user-authored questions:** Never silently edit supplied stems to satisfy this policy. If the supplied questions overlap, flag the specific pair and ask whether both should remain; do not change their words or silently delete one.
5. **Distinct progression:** Every question must have its own *primary competency*: what a learner should be able to explain, distinguish, calculate, diagnose, design, or decide after answering it.
6. **Different scenario is not sufficient:** Replacing "shopping app" with "banking app," replacing "GPT" with "LLM," or turning "explain" into "why" without a different technical decision is still a duplicate.
7. **Shared prerequisites may appear in context or diagrams:** Brief background may recur when needed, but the **assessed target** and the **reason needed to solve the question** must be new.
8. **No filler questions:** If eight truly different concepts cannot be justified without going beyond the supplied material, report the coverage limitation rather than inventing reworded repeats.

**Required pre-publish redundancy audit:**
- Create an internal table of question number → unique competency → expected answer reasoning → nearest existing question from other modules → why not duplicate.
- Compare normalized/near-identical wording, then perform a **semantic** check based on answer and reasoning. An exact-string-only comparison is insufficient.
- Reject candidates whose correct answers and core explanations are interchangeable, even if the question stems look different.
- Ensure question 8 adds a **new integrative decision or trade-off** rather than restating question 7.
- Re-run the check after edits, since replacement options or explanations can accidentally collapse two different questions into the same concept.

**Pass condition:** Eight nonredundant, independently defensible learning objectives, with no semantic duplicates within the module or substantially equivalent repeats of existing curriculum questions. If existing curriculum already has redundant questions, note that debt without silently rewriting unrelated modules.

## 3.7 Non-negotiable visual-reference gate

**Mandatory companion standard:** [VISUAL_GOLD_STANDARD.md](VISUAL_GOLD_STANDARD.md). Before building ANY keyword module, inspect the **actual seven diagrams in the original root [Multimodal Training `index.html`](../index.html)**. Reading CSS declarations is not enough. That original is the benchmark for diagram quality, visual inventiveness, and use of concrete objects—not merely the approved quiz UI.

**Every question card must be individually top-notch.** No two diagrams in a module or adjacent keyword batch may reuse the same dominant composition, even when titles, colors, examples, text, icons or arrows change. Reusing a uniform `studio-story-1 … -8` or `tkfigure` storyboard for a new keyword is a hard fail. Share the boilerplate quiz shell, NEVER the eight visual compositions.

**No text in boxes masquerading as diagrams.** Never use panels of sentences, generic feature cards, or simple colored rectangles connected by arrows as the teaching visual. Small technical labels, token strings, axes, code or text inside a depicted realistic UI may be necessary; those are not explanatory text-box substitutes. If removing explanatory prose leaves only empty cards and arrows, the diagram fails.

**Approval requires rendered visual evidence.** Inspect all eight actual diagrams on desktop and mobile and compare them as a visual set to the seven original Multimodal diagrams. If not reviewed in a browser, report "visual QA not performed" and do not claim a premium or fully finished diagram set. Follow the explicit hard-fail rubric and sign-off in the companion standard.

## 4. Diagram quality is the primary selling point

**A diagram is a teaching instrument, not decoration. Every question gets one visually unique, bespoke composition at least as instructive and polished as the original Multimodal Training's seven different diagrams. See [VISUAL_GOLD_STANDARD.md](VISUAL_GOLD_STANDARD.md).**

### 4.1 Design the learning mechanism before drawing

For each question, write an internal design brief:

- **Confusion:** What is the one thing beginners often misunderstand?
- **Visible objects:** What would they encounter in practice (request, device, code, browser, token, model, database, response, etc.)?
- **Action or relationship:** What moves, changes, connects, branches, or gets compared?
- **Visible outcome:** What becomes clearer after studying it?
- **Test:** Can a learner explain the key idea from the visual without reading an essay?

Only then choose the visual form. Do not reuse the original diagrams' exact subject artwork, but the resulting composition and craft must meet their benchmark. Eight nearly identical flowcharts/cards are forbidden.

### 4.2 Recommended visual forms

| Learning need | Strong visual form | Weak substitute |
|---|---|---|
| Definition or family relationship | Hierarchy with meaningful examples and distinct objects | Three plain boxes containing definitions |
| Two competing approaches | Side-by-side miniature real-world scenes with contrasted outcomes | Two paragraphs in colored cards |
| Process or data flow | Ordered journey with real payloads, route/transform state and result | Oversized decorative arrows |
| Component anatomy | Annotated real request, response, editor, model, or UI | Static glossary of component names |
| Practical application | Functional-looking UI, product, diagrammed app, endpoint mapping | Generic icons floating in space |
| Failure or edge case | Before/after trace showing where it fails and how protection works | Red “error” label alone |
| Systems design or trade-offs | Layered architecture with responsibilities and visible constraints | A large empty architecture box |
| Numeric or probabilistic intuition | Small chart, token map, timeline, or controllable demonstration | Invented unexplained metrics |

Use screenshots or real-world-style illustrations only when necessary and appropriate. Native HTML/CSS and carefully scoped inline SVG are good for fully self-contained output. The diagram should make an abstract concept **more concrete**, not merely repeat words from the question.

### 4.3 Visual craft rules

- Every question's diagram has a **different instructional job AND a unique dominant visual composition**. Two diagrams with the same skeleton and changed labels are forbidden, even when they compare different concepts.
- Prefer layered scenes, miniature interfaces, traces, timelines, token paths, charts, realistic object illustrations, and before/after states.
- Use a coherent design system: consistent corner radii, strokes, spacing, typography, connector thickness, and color semantics.
- Avoid giant icons, bulky arrowheads, meaningless shadows, heavy borders, unnecessary labels, and empty decorative space.
- Use arrows sparingly. They must indicate a real direction or dependency; they must not block or overlap important content.
- Keep labels legible on mobile. Target at least about **12 CSS pixels** for essential annotations; important labels should be larger.
- Don't cram long paragraphs into tiny SVG rectangles. Prefer accessible HTML text with content-driven height.
- Provide a useful accessible label/description for each figure.
- Illustrative values, invented documents, fake API responses, and simulated model behavior must be explicitly identified as examples.
- Keep diagrams technically honest: distinguish simplified illustration from actual internal mechanism. Never describe a toy attention visualization as a measured attention map.
- Do not reuse unrelated example objects (dogs/cats, retail adaptation, refund policy, etc.) just because they are present in a template.

### 4.4 Mandatory SVG and CSS containment rule

The original Multimodal CSS includes a broad **`.q-fig svg { width:100%; height:auto }`** rule for full-width illustrations. This previously caused **every small icon to become huge**.

**Never let that bug return.**

- All small inline icons MUST have a dedicated class, such as `.diagram-icon`, with explicit width, height, min/max width, min/max height and flex-basis.
- Use a selector **more specific** than the broad figure-SVG rule; place the override after the base styles.
- Recommended ordinary icon size: **18–24 px**. A genuinely central device illustration may be larger, but only by deliberate design.
- Apply `width:100%` only to artwork intended to fill the available width, never to small decorative/icon SVGs.
- Verify computed icon dimensions in a browser, not merely that the selector appears in the CSS.
- For flex/grid children use `min-width:0` and suitable `overflow-wrap`. Text must remain horizontal and readable, not squeezed into one character per line.
- Preserve proper viewBox ratios and avoid global SVG rules that unintentionally affect unrelated visuals.

### 4.5 Interactivity quality

An interactive visual is worthwhile only when a user's action reveals a **mechanism**.

Examples: click “Next token” and see context + next-token choices change; select a request scenario and watch its HTTP outcome; change a retrieval option and see which evidence is used.

Every control must:
- Have an actual action and visible feedback;
- Be keyboard usable and have an accessible label;
- Have correct initial state and reset/restart behavior;
- Work offline;
- Disclose simulated data;
- Not pretend to execute an actual GPT model, Web API, or network request when it doesn't.

Do not force interaction into every diagram. A superb static figure is better than a meaningless toy control. If the user specifically asks for a Concept Lab, its input → internal change → outcome must be visibly clear and topic-specific.

## 5. UI parity: reuse the approved template, not a new product

**This is a strict regression rule.**

Preserve the approved Multimodal-style:
- Maximum reading width and overall vertical rhythm;
- Sticky top bar with module label, progress bar, answer counter, and **Themes** button;
- Question cards, number badges, readable question text, and one diagram per question;
- **Ordinary small circular radio inputs**, matching choice row alignment and padding;
- Check Answers, result/score message, correct/incorrect states, explanation reveal, and Reset;
- Mobile layout, readable type, and focus states.

Do not replace the standard native circle inputs with giant custom disks, cards, or wide empty radio columns. Do not copy large boilerplate pieces from an older prototype if corrected equivalents exist.

If the user asks for a global UI fix, change the reusable standard and thoughtfully propagate the repair to affected modules only after checking each module. If the user asks for a topic-specific fix, don't change other modules.

### 5.1 The existing 15 themes

Use exactly these IDs, in the existing order:

1. `sunset`
2. `forest`
3. `sky`
4. `rose`
5. `midnight`
6. `cocoa`
7. `paper`
8. `obsidian`
9. `lemon`
10. `glacier`
11. `scarlet`
12. `jade`
13. `peach`
14. `carbon`
15. `cobalt`

The dropdown belongs **in the top bar**, not in a large gallery inside the lesson. Choosing a theme must immediately recolor the page; support selected-state indication, Escape-to-close, outside-click dismissal, and a shareable `?theme=...` URL. Persist the choice where browser storage is available, with a safe fallback for local `file://` viewing. Preserve readable contrast across light and dark palettes.

A module-specific scene may use educational colors to differentiate concepts, but should not lose readability because a global theme is dark. Never create near-identical new theme colors without explicit approval.

## 6. Modular authoring, monolithic delivery

In development, reuse shared templates, CSS tokens, question structures, and diagram helper patterns. A local generator, data model, or development-time assets are acceptable.

**The final delivered artifact MUST be one complete independent `.html` file**:
- Starts with a proper `<!DOCTYPE html>` and includes the full `<html>`, `<head>`, `<body>` and metadata viewport;
- Embeds **all required CSS in `<style>`**;
- Embeds **all required JavaScript in `<script>`**;
- Embeds diagrams as inline HTML, CSS, or SVG;
- Includes all questions, alternatives, explanations, theme data, and interaction logic;
- Does not require a separate `.css`, `.js`, JSON, font, CDN, external image, runtime build step, internet access, or another HTML file.

Clicking **Download Raw** from GitHub or saving the standalone file and opening it in Chrome must show the complete module with everything working offline.

**Be precise about “modular”:** shared development files are a way to avoid repetitive editing; they must be bundled into the finished standalone HTML. Do not claim an automated module generator exists unless one has actually been built and tested.

### 6.1 File naming and version integrity

Use stable, readable names such as:
- `lessons/api-design/Web-API-Keyword-Study-008.html`
- `lessons/llm-foundations/GPT-LLM-Foundation-Keyword-Study-008.html`
- `<Keyword-Slug>-Keyword-Study-008.html` for a new eight-question module

Choose a safe slug and avoid collisions. If revising an existing module, update that same file when the user asks to improve it; don't proliferate ambiguous “v2-final-fixed-new” variants. Keep prior standalone backups intact unless the user explicitly asks to replace or remove them.

**Do not overwrite `index.html` or the preserved Multimodal original** while creating an unrelated keyword page.

### 6.2 Safe content embedding

Escape user-provided text before adding it to HTML. Prevent untrusted question text from becoming executable markup. Avoid unsafe dynamic HTML insertion for untrusted content. Keep scripts scoped so multiple interactive labs don't collide over global IDs or event handlers. No hidden external network calls, analytics, or tracking.

## 6.3 Central ranked curriculum index and attached source PDF — mandatory

The repository contains a **canonical ranked keyword curriculum**:

- [KEYWORD_INDEX.md](../KEYWORD_INDEX.md): the **single central file** listing every keyword in rank order, with importance, exact topic, completion status, and clickable links to completed standalone HTML files.
- [references/Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf](../references/Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf): an **identical copy of the ranked 265-term PDF** used as the source of truth.
- [QUESTION_REGISTRY.md](../QUESTION_REGISTRY.md): the existing exact MCQ stems for semantic no-repetition checks, with links back to their HTML modules.
- [README.md](../README.md): repository landing page pointing to all three.

**Required AI workflow for any future keyword:**

1. Read the source PDF and central index first. Preserve its **rank, exact keyword, exact topic, and importance tier**. The source PDF controls ranking; do not alphabetize or reorder.
2. Unless the user explicitly asks for another rank, pick the **earliest Pending item** in `KEYWORD_INDEX.md`. User-requested keywords and ranks always take precedence.
3. Check the question registry and existing modules for **semantic duplication**. Reworded or recontextualized questions count as duplicates, even across module boundaries.
4. Create and independently verify the complete monolithic HTML module. Link only to an actual committed file; never mark a draft as Complete.
5. **Immediately after a successful module commit**, update the matching row in `KEYWORD_INDEX.md` from Pending → Complete, add its verified relative HTML link, append the question stems and lesson link to `QUESTION_REGISTRY.md`, and update completion counts and the next pending rank in both the central index and README.
6. **Never** silently delete old rows, duplicate ranks, change the canonical 265-term order, or substitute guesses for source PDF content. If the PDF is updated, audit changed ranks and regenerate the list with an explicit reconciliation.
7. If the index and PDF disagree, pause the index edit, inspect the actual PDF rank and reconcile the discrepancy before claiming completion. If the question registry lacks a published module, backfill it before generating further content.
8. Use root-relative GitHub links to actual committed files under `lessons/<topic>/`; keep filenames stable. The central index is the human/AI navigation source, not a separate runtime dependency of standalone HTML modules.

**Hard-fail rule:** A new lesson is **not fully delivered** if its HTML was pushed but the central ranked index and exact-question registry were not updated. Conversely, an index link is not valid until the HTML file exists.

## 6.4 Repository layout and preview compatibility

The canonical full HTML files live in `lessons/llm-foundations/`, `lessons/text-processing/` and `lessons/api-design/`, not at repository root. Build guidelines live in `docs/`, reference PDF in `references/`, theme examples in `templates/`, and the early prototype in `archive/`. Keep `index.html`, `lab-v3.css` and `lab-v3.js` at root because the original homepage depends on those paths.

The GitHub Pages workflow publishes the full lesson HTML at BOTH its nested URL and its previous flat root browser URL by copying files into a deployment-only staging directory. Thus existing Pages preview bookmarks remain supported. Old GitHub code viewer `blob/main/<filename>.html` URLs cannot redirect: update source links to `blob/main/lessons/<topic>/<filename>.html`.

After every new module, update `../KEYWORD_INDEX.md` and `../QUESTION_REGISTRY.md` with the new `lessons/<topic>/` source link and the unchanged root-style Pages preview URL. Never create manual root duplicates of the HTML: the Pages workflow performs that compatibility copy.

## 7. Required build workflow for every keyword

1. **Inspect:** Read this standard and [VISUAL_GOLD_STANDARD.md](VISUAL_GOLD_STANDARD.md); visually study all seven actual original Multimodal `index.html` question-card diagrams, corrected Web API module, and current theme guide.
2. **Scope:** Determine subject, domain, keyword, supplied source constraints and whether questions must be preserved verbatim.
3. **Blueprint:** Map each question to one distinct learning objective, one answer concept, and one diagram mechanism. Look for repetition or missing prerequisites.
4. **Draft content:** Write/retain the question stems, four alternatives, answer keys, and 40–60-word explanations.
5. **Audit distractors:** Check technical truth, plausibility, length balance, language accessibility, one best answer and answer-letter distribution.
6. **Design scenes:** Build the diagrams using content-driven layout and purposeful art. Add optional interaction only where it teaches.
7. **Assemble:** Plug topic content into the existing approved UI; embed all styles, scripts, diagrams and theme definitions in one file.
8. **Run static validation:** Test every invariant in section 8, including a unique figure-composition fingerprint, before committing.
9. **Run browser validation:** Actually open the HTML in a browser at desktop and mobile sizes. Check critical interactions and each diagram, then fix any bugs.
10. **Commit safely:** Create or update only the intended keyword file in the correct repo; confirm the resulting GitHub file content.
11. **Verify delivery:** Check the raw file and the Pages address when accessible, and distinguish repository success from Pages deployment success.
12. **Report:** Provide the file link and a compact QA summary, including any browser tests that could not be performed.

For a batch, repeat these gates **for each module**, not just the first sample.

## 8. Quality assurance: mandatory checks

### 8.1 Static / machine-checkable acceptance

- [ ] Exactly three visible metadata fields: Subject, Domain, Keyword.
- [ ] Correct count, exact original wording if supplied, and visible numbers start at 1 with no skips.
- [ ] Default keyword-only module has exactly eight MCQs and one final interview question.
- [ ] Exactly four choices per question, unique input names, and exactly one valid correct key.
- [ ] Each explanation is 40–60 words by default.
- [ ] For eight questions, two correct answers per A/B/C/D, unless doing so creates an incorrect key.
- [ ] No conspicuous answer-length patterns or trivial distractors.
- [ ] No semantically repeated learning objective within this module or compared with published curriculum modules, even when wording changes.
- [ ] One **unique dominant visual composition** per question, different from the other seven and nearby modules; all scenes benchmarked against the original seven figures.
- [ ] No text-in-box substitutes; removing explanatory labels must leave a meaningful graphic mechanism. No cloned eight-scene storyboard.
- [ ] No duplicated element IDs or missing IDs used by JavaScript.
- [ ] JavaScript parses and does not report console errors at load or interaction.
- [ ] No missing or externally required CSS, JS, image, font, data or network dependency.
- [ ] Theme IDs match the shared 15-theme list.
- [ ] All module text is HTML-escaped where needed.
- [ ] Full HTML is present in the repository file, not a short loader, redirect, or embedded frame pointing elsewhere.

### 8.2 Browser visual acceptance — not optional when browser available

Open the actual standalone HTML in Chromium or another real browser at **360, 390, 768, 1280 and 1440 CSS px** (or nearest available). For each figure:

- [ ] Nothing overlaps, leaks out of cards, clips, or scrolls the whole page horizontally.
- [ ] No text is squeezed into a vertical one-character column.
- [ ] All essential words, labels, code and numbered steps remain readable.
- [ ] Device/icon SVGs remain properly sized; inspect computed sizes of small icons.
- [ ] Arrowheads are modest, directions are meaningful, and lines don't cross text.
- [ ] Layout reflows logically at narrow widths instead of shrinking a desktop diagram to unreadability.
- [ ] Light and dark backgrounds still show sufficient text and control contrast.
- [ ] The eight diagrams are visually distinct from one another AND nearby modules, show technical mechanisms or concrete scenes, and match the original Multimodal benchmark in craftsmanship; no text-box-led compositions.

Take actual screenshots or inspect a rendered browser view. HTML validity and JavaScript syntax **alone do not prove visual quality**.

### 8.3 Interaction and accessibility acceptance

- [ ] Mouse and keyboard can select each option.
- [ ] Check Answers reveals the correct key, marks answers properly and updates score/progress.
- [ ] Reset returns the entire quiz and interactive demos to a clean initial state.
- [ ] The theme dropdown can open, close, select and indicate themes; Escape and outside-click work.
- [ ] All 15 themes can be selected and are visually readable; spot-check each one, including dark themes.
- [ ] Diagrams and buttons have accessible names; decorative icons are hidden from screen readers where appropriate.
- [ ] Keyboard focus is visible; tab order remains sensible.
- [ ] No button is inert, decorative-only, or misleading.
- [ ] The complete page still works offline by opening its downloaded file locally.

For instructional data charts, do not claim toy coordinates, percentages, scores, generated outputs, or simulated results are real observations.

### 8.4 What to report honestly

Use one of:
- **Verified in a browser:** state which viewport(s), tests and theme checks actually passed.
- **Structurally checked only:** state that JavaScript, markup, question counts etc. passed, but *visual browser QA has not been completed*.
- **Needs repair:** identify failing screens/figures and fix before claiming high-quality completion.

Never say “perfect,” “fully tested,” or “no overlap” merely because a file was uploaded or source parsed.

## 9. Visual and content scoring gate

Score each module on a **100-point internal rubric**:

| Area | Points | Pass expectation |
|---|---:|---|
| Technical accuracy and correct question interpretation | 20 | No significant factual errors or invented source claims |
| MCQ difficulty, distractors and beginner readability | 20 | Meaningful choices; no length or pattern giveaways |
| Diagram teaching value and variety | 20 | Each visual reveals a mechanism with relevant objects |
| Diagram polish and mobile clarity | 15 | No oversized icons, crowding, unreadable text or overlaps |
| Original template fidelity and accessibility | 10 | Correct UI, keyboard behavior, focus and contrast |
| Monolithic completeness and working interactions | 15 | Runs without any companion file or external service |

**Release target: at least 90/100, with zero critical failures. Any cloned diagram skeleton or text-box-led illustration automatically fails regardless of points; the seven original Multimodal figures and [VISUAL_GOLD_STANDARD.md](VISUAL_GOLD_STANDARD.md) are the visual acceptance reference.** This is a reviewer checklist, not an automatically computed grade. A single broken diagram, wrong answer key, altered supplied question, broken theme control, or missing offline dependency is a **hard fail regardless of score**.

If visual QA is unavailable, **do not assign the visual portion as “passed”**; report provisional structural completion instead.

## 10. Maintenance and regression discipline

1. Keep **one canonical definition** of the approved shell, assessment behavior, themes and visual rules. When possible, reuse the same source during development rather than duplicating fixes by hand.
2. **Topic content is separate from the shell during authoring**: metadata, context, questions, option sets, keys, explanations, and visual specifications. The export remains fully monolithic.
3. For a bug like oversized SVG icons, fix the *specific shared selector or layout rule*, not dozens of unrelated diagrams individually.
4. Test that a global fix doesn't change full-width artwork, theme colors, option alignment, other modules, or mobile behavior.
5. Update existing standalone HTML files **only when the user requests an update or an agreed batch migration**. Regeneration cannot magically change copies previously downloaded by a user.
6. Keep a concise commit message describing the fix, and verify the exact repository path afterward.
7. Preserve recoverable history and original backups. Avoid force-push, sweeping deletion, and replacing unrelated files.
8. Keep `TEMPLATE_RULES.md` and `THEME_GUIDE.md` consistent with this standard; don't leave contradictory older instructions unmarked.
9. If a new requirement becomes universal, add it here before scaling to many keywords.
10. Before batch generation, QA a representative module, then still QA every output independently.


## Browser preview is mandatory for every completed HTML module

**Never present a GitHub `/blob/main/file.html` link as if it runs the quiz.** GitHub's file viewer displays HTML source code, not an interactive website.

Every completed lesson must have **two distinctly named links**, in the central rank table and the final answer:

1. **Preview in browser (primary):** `https://sabareeshrao.github.io/Gradstudio-Version-2.0/<exact-file-name>.html`. This is the intended interactive GitHub Pages page.
2. **View HTML source (secondary):** the GitHub `blob/main/<exact-file-name>.html` page or the exact repository-relative `<file>.html` link for people who want full code or offline download.

For all new modules, update `KEYWORD_INDEX.md` with **two separate columns, Browser preview and HTML source**, and update `README.md` plus `QUESTION_REGISTRY.md` with usable preview links. Preserve PDF rank ordering and existing questions. When giving users a single link to study, default to **Preview in browser**, not HTML source.

**Deployment acceptance:** Check the published Pages URL actually returns the intended interactive HTML (rather than a 404, a code viewer, or an outdated module). If unable to verify Pages deployment, explicitly mark it **unverified**. Do not claim a working live preview just because `has_pages=true` or because the source file exists. When Pages is unavailable, give the raw standalone HTML and instructions to open it locally; do not disguise a code link as a preview.

**Release blocker:** Missing browser preview link in the central index is incomplete delivery. A present but unverified URL must be disclosed, and a broken URL should be fixed or explicitly reported.

## 11. Delivery format and final AI report

For a successful module provide:

- Keyword and subject/domain;
- Number of questions, options and diagrams;
- Confirmation of the original wording rule when questions were supplied;
- Correct answer/explanation length checks and whether letters are reasonably balanced;
- **Primary:** Browser preview link to the rendered interactive HTML (GitHub Pages), verified or clearly labeled unverified;
- **Secondary:** Source file link to **the complete HTML** in GitHub;
- Raw HTML link for saving;
- The preview's deployment/testing state: verified working, unverified, or broken;
- What was tested, at which viewports, and what is still unverified.

No user should have to download a separate theme, JS, CSS, font, diagram pack, JSON file, or template to open the finished module.

## 12. Final AI pre-flight checklist

Before saying “done,” answer all of these **yes**:

1. Did I read the actual current standards and template files?
2. Did I preserve every supplied question exactly?
3. Are all options genuinely plausible and close in length?
4. Are correct answers accurate and the key properly wired?
5. Are explanations concise, substantive and around 50 words, and are all question objectives semantically nonredundant?
6. Does each diagram teach something visibly **different** and worthwhile?
7. Have I checked SVG icon sizes, text wrapping and mobile overflow?
8. Does the page match the original question UI and top theme dropdown?
9. Does it work offline as **one independent HTML file**?
10. Have I tested actual browser rendering, or disclosed clearly that I could not?
11. Have I avoided editing the original template or unrelated modules?
12. Did I verify the GitHub file and provide a clear link?

If any answer is no, repair it or report the precise limitation. **Never hide the failure behind a confident completion message.**
