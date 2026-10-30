# Gradstudio Visual Gold Standard — Reference the Original Multimodal Training Diagrams

**Status: MANDATORY.** This guide defines visual acceptance for every diagram in every keyword module. Read it **together with the original root `index.html`**, not instead of it.

**Primary reference:** [../index.html](../index.html) — the original Multimodal Training page. Its seven distinct question-card visuals are the **minimum artistic and instructional benchmark**, not just its radio buttons or CSS.

## 1. Mandatory original-template inspection

Before generating, repairing, or approving any diagrams, the author must open the actual original `index.html`, inspect **all seven** question-card diagrams, and record the specific design properties they demonstrate:

| Original diagram | Identifying class / scene | Why it is the benchmark |
|---|---|---|
| 01 — Natural supervision | `d-scale` / `scene-photo` | A custom illustrated photographic scene and paired image–text teaching object, not text in boxes |
| 02 — Embedding relationships | `d-space` / `space-chart` | Data positioned spatially on meaningful axes; distance conveys concept |
| 03 — Representation vs generation | `d-dual` / `dual-flow` | Different pathways and distinct graphical representations that expose the difference |
| 04 — General-purpose model | `d-hub` / `hub-layout` | A relationship/hub composition, showing reuse from one core to different tasks |
| 05 — Retail adaptation | `d-retail` / `retail-layout` | A realistic, product-specific miniature interface with a visible business outcome |
| 06 — Prompt, RAG, fine-tuning | `d-paths` / `path-source` | Three structurally different mechanisms placed into a purposeful comparative composition |
| 07 — Interview application | `interview-section` / `interview-schematic` | A real-world system schematic combining business inputs, model behavior, and decision consequences |

**Critical:** These seven *teach through different visual languages*. Their CSS structure must not be blindly duplicated into new topics, and the same dog/retail examples must not be copied when unrelated. Recreate their **level of customization, concrete objects, graphical storytelling, and visual diversity**, not their subject matter.

**Source-inspection requirement:** The AI must report which of these seven reference visuals it inspected. Merely reading this document and asserting “the template has diagrams” does NOT satisfy the requirement. Browser screenshots of the original are the visual benchmark whenever browser access exists.

## 2. Never create a text-box diagram

**Hard rejection:** A figure whose main content is sentences inside colored rectangles, cards, or rounded boxes connected by arrows is **not a diagram** for this curriculum.

The visual must not rely on reading a sequence of captions to communicate the concept. Reject:

- Three or four feature cards with a heading and explanation in each.
- “Input → Model → Output” as three generic rectangles with arrows and no depicted transformation.
- The same layout with a new title, different color, relabeled box, flipped arrow, or different domain noun.
- Lists of pros/cons inside panels presented as a diagram.
- Generic `v-rail`, `v-branch`, `tkfigure`, `tkterminal`, `studio-story`, or any other reusable row/card shell presented **by itself** as premium art.
- One large introductory SVG and seven simple text panels.
- Decorative icons pasted beside text while the underlying concept is not drawn.

**Text inside the graphic is allowed ONLY where it is the subject itself** (realistic UI, tokens, code, data labels, annotated API payloads, axis tick labels, small object labels). Short labels orient the learner; they must not carry the entire explanation. No explanatory paragraphs inside shapes. Put detailed explanation **below/outside** the illustration or in the ~50-word answer rationale.

**Non-negotiable diagnostic:** Remove the text labels mentally. If almost nothing meaningful remains besides blank rounded rectangles/arrows, reject and redesign.

## 3. Exactly distinct composition on every card

**Within one eight-question module, no two question diagrams may share the same overall composition.** The same rule applies across a batch of consecutive modules: do not clone the eight figure layouts and just change their subject text.

A “different diagram” requires a different **primary visual organization and mechanism**: not just a different question title, text, color, icon, or data sample.

Before building, assign every figure a **visual fingerprint**:

`rank | question | misconception | visual object(s) | dominant spatial composition | mechanism/relationship | what changes | learner takeaway`

Compare all fingerprints across the proposed eight figures and against the latest adjacent modules. If two look structurally interchangeable when their labels are hidden, at least one must be redesigned.

**Forbidden production tactic:** Generating a shared eight-diagram storyboard template, then filling the eight slots for ranks 006, 007, 008, 009, 010, etc. Shared fonts, theme colors, quiz mechanics, SVG sizing constraints, and layout margins ARE reusable. **Diagram composition itself is not reusable as identical boilerplate.**

## 4. Each question card must be visual-first

A top-quality diagram should show the concept's real objects and behavior. Choose an appropriate visual grammar *specific to the concept*, for example:

- **Pretraining:** illustrated data corpus, token/target transformations, learning curves with axes and non-fabricated labels, or weights changing over a training sequence.
- **Fine-tuning:** meaningful layer/weight-change illustration or contrasting observable behavior for the same task before and after adaptation.
- **Foundation models:** actual reusable model hub connected to noticeably different mini-applications, not task labels in boxes.
- **Training objectives:** a token prediction with numeric losses shown visually, target shifts or an interactive probability distribution.
- **Tokenization/BPE:** a true merge process with token pieces joining, color transitions, changing vocabulary or merge counts.
- **Token IDs:** annotated token-ID lookup with a consistent model vocabulary and realistic token map.
- **Token/word embeddings:** real spatial scatter, vector components, matrix lookup highlight or nearest-neighbor motion.
- **Positional embeddings:** clearly encoded position/order, superposed signals, position-dependent traces or a purposeful waveform.

These are **possible mechanisms, not eight reusable layouts**. For every card, determine the unique technical detail to draw. Prefer graphing, mapping, spatial relation, transformation, real artifacts, or motion over exposition.

## 5. Required card-by-card quality review

The AI must do ALL of the following, for **each individual diagram**, before claiming high quality:

1. **Original comparator:** Look at the original seven Multimodal reference diagrams. State internally which benchmark characteristic the new scene meets (pictorial detail, meaningful spatial geometry, realistic artifact, technical transformation, etc.).
2. **Unique geometry:** Compare the new diagram's visual fingerprint with each of the seven other cards and nearby modules. No interchangeable skeleton.
3. **No text-box cheat:** Confirm there are no text paragraphs inside shapes, no generic box chains, and the concept remains visually meaningful when the labels are ignored.
4. **Mechanism legibility:** The visual itself should make the main relationship obvious without reading the answer explanation. A short caption may clarify simplified mechanics.
5. **Concrete and credible:** Objects, inputs, outputs, arrows and colors must represent something real in the subject. Explain illustrative values as examples, never measured data.
6. **Pixel-level QA:** Inspect an actual screenshot of the card on desktop and mobile. Verify no oversized icons, clipping, overlapping, or one-character-per-line text.
7. **Side-by-side comparison:** Compare a screenshot/contact sheet of the eight finished diagrams against the original seven visual references. If the new set feels like a stack of generic cards, reject the **entire visual batch**.
8. **Rework until qualified:** Failure on any diagram blocks **Complete** status. Submit as draft/in need of visual QA if browser rendering is unavailable; do not certify it from HTML or JS syntax alone.

## 6. Required visual evidence (when browser tools exist)

- Screenshot or visually inspect **all seven original diagram cards** from root `index.html`.
- Screenshot **every new question card** at a normal desktop width (e.g. 1280px) and inspect at 390px mobile. Reflow if necessary.
- Build a side-by-side grid/contact sheet for all new diagrams; review repetition and balance as a *set*.
- For each diagram, log a factual PASS/FAIL: visual-led explanation; originality of composition; actual concept drawn; no text-card substitution; legible responsive rendering.
- A reviewer should be able to identify the underlying mechanism even with most text labels hidden.
- Screenshots should be taken from the actual delivered standalone HTML. A mockup or source-code inspection alone is insufficient.
- If browser access is unavailable, **state “visual QA not performed” and do not label the module premium, visually verified, or finished**. A draft can be saved, but final completion requires real visual review.

## 7. Mandatory release gate and existing-quality debt

**Hard fail** for any: reused visual skeleton within the same module or adjacent keyword batch, text-box-led graphic, missing scene or technical visualization, diagram not visually distinguishable from other cards, visually broken mobile layout, or misleading simulated measurement.

**Source-level warning for existing modules:** Ranks 006–010 contained recurring `studio-story-1` … `studio-story-8` figure structures from module to module; ranks 011–015 frequently used the same `tkv`, `tkfigure`, `tkstep`, `tkterminal`, `tkroute` pattern across separate topics. These patterns are NOT automatic proof that each individual figure is bad, but are strong indicators of an unacceptably repetitive, non-custom visual production process. **Do not treat these ranks as approved examples simply because they are published.** Audit and redesign their figures individually against the original Multimodal benchmark.

The published modules and their current index status are an inventory, not proof of visual excellence. Do not silently change questions, explanations, answer keys, or rank links while fixing the diagrams.

### AI author sign-off (required)

Before claiming completion, state and truthfully verify:

> “I inspected all seven original Multimodal Training diagram cards, designed eight visually distinct compositions for the new keyword, checked that no diagram is merely explanatory text in boxes, and visually inspected the rendered desktop and mobile pages. Each card meets or exceeds the original's visual teaching standard.”

**Never sign that statement unless each step was actually performed.**
