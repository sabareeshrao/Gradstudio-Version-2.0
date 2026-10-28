# Gradstudio Version 2.0 — Theme and Pages Guide

One interactive HTML module supports **15 deliberately differentiated color palettes**. All themes share the same seven questions and interactive Concept Lab. You don't need 15 separate HTML downloads.

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

Use the **Themes** button in the sticky top navigation bar to open the dropdown of all 15 palettes. Pick a name to recolor the page instantly; the dropdown closes automatically. The selected theme is saved in the browser and is also shareable through `?theme=...`. The dropdown has color previews, keyboard focus support, Escape-to-close, click-outside-to-close, and a Copy link button. The large gallery has been removed from the lesson body. Some choices use light study pages; others use dark, high-contrast designs.

## Enable GitHub Pages

1. Open https://github.com/sabareeshrao/Gradstudio-Version-2.0/settings/pages
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main`, folder `/(root)`, then click **Save**.
4. After publication, use **Visit site** to open the module.

Expected address: https://sabareeshrao.github.io/Gradstudio-Version-2.0/

Example dark theme: https://sabareeshrao.github.io/Gradstudio-Version-2.0/?theme=jade

Example light theme: https://sabareeshrao.github.io/Gradstudio-Version-2.0/?theme=sky

These URLs are expected addresses, not confirmation that the site is currently live.

**Visibility note:** GitHub Pages availability for a private repository depends on GitHub plan. Pages sites may be publicly accessible even when the repository itself is private. Do not change repository visibility without approval.

## Files and reuse

- `index.html`: study content, question bank, sticky top-bar theme dropdown, and shared theme definitions
- `lab-v3.js`: interactive image matching, retail adaptation comparison, and decision practice
- `lab-v3.css`: responsive Concept Lab presentation
- `TEMPLATE_RULES.md`: standards for future modules
- `Gradstudio-15-Themes-Standalone.html`: preserved original standalone edition with the former large theme gallery
- `Gradstudio-15-Themes-Dropdown-Standalone.html`: new offline single-file edition, including the top-bar dropdown and all Concept Lab assets

For a new module, reuse the same visual architecture and theme list. Replace domain-specific learning material with examples grounded in the new topic.

## Distinctness rule

Never add two themes that look like different names for nearly the same color. Review **both** the primary accent and the complete page treatment (background, surface, borders, active buttons, and headings). If two themes share a similar hue, their visual contrast must be clearly different—for example, a light study page versus a strongly contrasting dark page. Prefer replacing a near-duplicate instead of adding another variation. Check readable contrast for button labels and instructional text.
