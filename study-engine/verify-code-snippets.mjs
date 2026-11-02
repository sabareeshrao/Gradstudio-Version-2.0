#!/usr/bin/env node
/**
 * Gradstudio English classroom code source audit.
 * Every displayed HTML pre block must have at most 15 logical lines.
 * This covers approved lessons and unlisted research templates.
 * SVG-drawn snippets need an additional human legibility check.
 */
import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const base = dirname(fileURLToPath(import.meta.url));
const limit = 15;
let files = 0, snippets = 0, issues = [];
for (const subdir of ['modules', 'unlisted']) {
  const dir = resolve(base, subdir);
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir).filter(x => x.endsWith('.json') && x !== 'index.json')) {
    const path = resolve(dir, name);
    const lesson = JSON.parse(readFileSync(path, 'utf8'));
    if (!Array.isArray(lesson.questions)) continue;
    files++;
    const htmls = [['hero', lesson.hero || ''], ...lesson.questions.map((q,i) => ['Q' + (i+1), q.figure || ''])];
    for (const [place,html] of htmls) {
      const blocks = [...html.matchAll(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi)];
      for (const [i,m] of blocks.entries()) {
        snippets++;
        const plain = m[1].replace(/<[^>]*>/g, '').replace(/\r\n?/g, '\n').replace(/^\n+|\n+$/g, '');
        const count = plain.length ? plain.split('\n').length : 0;
        if (count > limit) issues.push(name + ' ' + place + ' code #' + (i+1) + ': ' + count + ' lines');
      }
    }
  }
}
if (issues.length) {
  console.error('FAIL: Code blocks exceed ' + limit + ' lines:\n' + issues.join('\n'));
  process.exit(1);
}
console.log('PASS: ' + snippets + ' HTML code blocks across ' + files + ' lesson JSON files are <= ' + limit + ' lines.');
console.log('Note: SVG-drawn code still needs visual/editorial review for syntax colors and readability.');
