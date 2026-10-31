# Telugu + English Lessons — Gradstudio

Original English lessons and shared Study Engine are **untouched**. This folder contains separate, bilingual learner-facing translations.

## Pilot lesson: Transformer

- [Open the bilingual HTML](01-transformer.html)
- [Open the live GitHub Pages preview](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Telugu%20Translation/01-transformer.html)
- [Original English lesson](../lessons/01-transformer.html)
- [Translated content JSON](transformer.te.json)

## Translation and illustration rules (approved sample direction)

1. **All diagrams remain in English** — figure headings, tiles, labels, SVG text, legends, code, formulas, example tokens, explanatory figure captions and hero artwork must match the original English module exactly. Never mechanically translate SVG labels.
2. **Questions are modern Telugu + English**, as in everyday Telugu tech writing. Keep standard AI terms such as Transformer, Attention, Encoder, Decoder, Embedding, Token, Training, Masking, Loss and PyTorch in English; write the sentence structure in clear Telugu. Avoid archaic, formal Telugu terminology.
3. **Four A–D answer choices** per question; use the same correct answer index as the original module. Keep similar word/character lengths and realistic distractors so the correct answer does not stand out.
4. **Explanations have two levels**: a short, beginner-friendly **Simple Explanation** (visible after checking) and an optional **Detailed Explanation** (collapsed by default). Both use clear Telugu + common English technical words.
5. **The question appears immediately below its diagram**. Preserve all seven original distinct technical diagrams and their CSS.
6. **Keep the quiz functional**: correct scoring, reset, all 15 themes, responsive viewing, and English technical code unchanged.
7. **Never modify** `lessons/`, `study-engine/modules/*.json`, or English diagram styles for a Telugu translation.

## Automated check

Run `node "Telugu Translation/verify-translation.mjs"` to check figure equality, bilingual text, unchanged answers and basic option-length bias against the English source.

Translate additional lessons only after this pilot is reviewed.
