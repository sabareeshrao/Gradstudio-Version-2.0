# Gradstudio Version 2.0 — Theme and Pages Guide

The 15 palettes are now stored in a **standalone design-only gallery**. A study module gets one chosen, fixed theme and does **not** include a theme picker. The gallery does not contain MCQs or Concept Labs.

**Open the design gallery:** https://sabareeshrao.github.io/Gradstudio-Version-2.0/themes/

## Available themes

| No. | Theme | Shareable parameter | Main accent | Page treatment |
|---|---|---|---|---|
| 01 | Sunset Orange | `?theme=sunset` | `#BD511B` | Light / warm ivory |
| 02 | Forest Green | `?theme=forest` | `#23784B` | Light / botanical |
| 03 | Sky Blue | `?theme=sky` | `#0878B6` | Light / sky |
| 04 | Rose Quartz | `?theme=rose` | `#B23E70` | Light / blush |
| 05 | Midnight Indigo | `?theme=midnight` | `#3A4B9D` | Light / cool indigo |
| 06 | Cocoa After Dark | `?theme=cocoa` | `#BD8D6B` | Dark / espresso |
| 07 | Ivory Ink | `?theme=paper` | `#145458` | Light / parchment |
| 08 | Obsidian Black | `?theme=obsidian` | `#252D36` | Light / grayscale |
| 09 | Electric Lemon | `?theme=lemon` | `#DDE748` | Dark / neon citrus |
| 10 | Glacier Ice | `?theme=glacier` | `#75D4FF` | Dark / arctic blue |
| 11 | Scarlet Signal | `?theme=scarlet` | `#FF6860` | Dark / coral-red |
| 12 | Jade Neon | `?theme=jade` | `#59E7BC` | Dark / bright jade |
| 13 | Peach Noir | `?theme=peach` | `#FFD0A1` | Dark / warm peach |
| 14 | Carbon Contrast | `?theme=carbon` | `#D0D4D9` | Dark / monochrome |
| 15 | Electric Cobalt | `?theme=cobalt` | `#8195FF` | Dark / electric blue |

The gallery previews both the accent color and its page background. Some choices use light study pages; others use intentionally dark, high-contrast canvases. Similar palettes from earlier versions were retired rather than simply renamed.

## Enable GitHub Pages

1. Open https://github.com/sabareeshrao/Gradstudio-Version-2.0/settings/pages
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main`, folder `/(root)`, then click **Save**.
4. After publication, open the **standalone gallery** under `/themes/`.

Expected design gallery address: https://sabareeshrao.github.io/Gradstudio-Version-2.0/themes/

Example dark theme: https://sabareeshrao.github.io/Gradstudio-Version-2.0/themes/?theme=jade

Example light theme: https://sabareeshrao.github.io/Gradstudio-Version-2.0/themes/?theme=sky

These URLs are expected addresses, not confirmation that the site is currently live.

GitHub Pages must be enabled in the repository settings before the published URLs become available.

## Files and reuse

- `themes/index.html`: exclusive palette gallery, preview mockup, and shareable color-selection links.
- `index.html`: original multimodal study module with one fixed style and no gallery.
- `keyword-study/web-api/index.html`: Web API MCQ module with a single fixed Glacier Ice theme and no gallery.
- `TEMPLATE_RULES.md` and `keyword-study/STANDARD.md`: binding guidance for future modules.

For each new module, pick one palette (randomly when the user leaves the choice to us), keep the theme fixed, and build topic-specific questions, unique diagrams, and Concept Lab interactions. **Never copy the design gallery into the learning page.**

## Distinctness rule

Never add two themes that look like different names for nearly the same color. Review **both** the primary accent and the complete page treatment (background, surface, borders, active buttons, and headings). If two themes share a similar hue, their visual contrast must be clearly different—for example, a light study page versus a strongly contrasting dark page. Prefer replacing a near-duplicate instead of adding another variation. Check readable contrast for button labels and instructional text.
