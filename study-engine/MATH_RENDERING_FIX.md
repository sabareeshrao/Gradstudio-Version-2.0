# Repository-wide mathematics and diagram rendering fix

**Scope:** All registered English study modules and the dynamically generated Telugu/English lesson pages. Source question text, answer keys, translations and illustrations are preserved (except the Learning Rate plot's small boundary correction).

## Symptoms fixed

- Raw TeX such as `\\(w_{\\text{new}} = w_{\\text{old}} - \\eta \\frac{\\partial L}{\\partial w}\\)` was displayed verbatim in question titles.
- SGD equations containing `\\theta_{t+1}`, `\\eta` and `\\nabla` were displayed verbatim.
- Large learning-rate charts overflowed their visual hierarchy or drew curves past the plot axis.
- Scheduler cards, labels and strokes scaled excessively on wide screens.

## Fixed source files

| File | Change |
|---|---|
| `study-engine/math-render.js` | New shared math parser: immediately displays Unicode/plain-text equations, then renders actual SVG math via MathJax (two CDN fallbacks). Supports inline and display TeX; nested fractions are readable even without the library. |
| `study-engine/app.js` | Applies the math parser after each English module renders, before quiz interactions are ready. |
| `Telugu Translation/app-te.js` | Applies the same math renderer to translated lesson content, retaining Telugu questions and English diagrams. |
| `study-engine/core.css` | Gives math spans responsive widths, inline alignment, and horizontal scrolling for very long formulas. |
| `study-engine/index.html` | Busts the cached app/CSS URLs so new code loads immediately following deployment. |
| `study-engine/diagrams/learning-rate.css` | Caps illustration widths and height through aspect ratio, reduces scheduler SVG labels and gives charts safe overflow and responsive behavior. |
| `study-engine/modules/learning-rate.json` | Pulls a loss-curve path back inside the chart axes, leaving the learning content unchanged. |
| `study-engine/verify-math-rendering.mjs` | New preflight: validates engine integration, readable math fallback and equation-delimiter balance throughout the module registry. |
| `.github/workflows/deploy-pages.yml` | Adds **required** math checks before Pages deployment. |

## Example

Stored TeX is still:

`\\(w_{\\text{new}} = w_{\\text{old}} - \\eta \\frac{\\partial L}{\\partial w}\\)`

The page initially displays:

`w_(new) = w_(old) - η (∂ L)/(∂ w)`

Then, if MathJax loads, this becomes correctly typeset mathematical notation with subscripts and a fraction bar.

Another fallback example:

`\\theta_{t+1} = \\theta_t - \\eta \\nabla L_i(\\theta_t)`

becomes `θₜ₊₁ = θₜ − η ∇Lᵢ(θₜ)` (the actual fallback uses ordinary spacing around operators).

## Coverage and verification

- All **63** currently registered study modules checked for balanced inline/display math delimiters.
- Existing `lessons/01-...10-...` English HTML entries already redirect to the shared engine.
- All **50** Telugu pages load `Telugu Translation/app-te.js`, so one fix covers their translated dynamic content.
- All **17** archived stand-alone HTML files were checked; none contains these raw TeX delimiters or target math commands.
- JS syntax checked for the math renderer, both lesson entrypoints and the audit script.
- Verified fallback: `w_(new)`, `θₜ₊₁` and nested fraction `(e^(zᵢ))/(Σ_j e^(z_j))`.
- CSS plot limits and scheduler cards corrected at source level.

### Run locally

```sh
node --check study-engine/math-render.js
node --check study-engine/app.js
node --check "Telugu Translation/app-te.js"
node study-engine/verify-math-rendering.mjs
```

**Limit:** Source and syntax were verified. A live GitHub Pages browser/screenshot smoke test was not available, so that part remains to be checked in an actual browser after deployment.
