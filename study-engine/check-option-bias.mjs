#!/usr/bin/env node
/**
 * Gradstudio study-engine quiz quality gate.
 * Usage: node study-engine/check-option-bias.mjs [module-slug ...]
 * Checks visible option length (tags stripped), answer-position balance, and keys.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, 'modules');
const requested = process.argv.slice(2);
const names = requested.length ? requested : readdirSync(dir)
  .filter(name => name.endsWith('.json') && name !== 'index.json')
  .map(name => name.slice(0, -5));
const plain = input => String(input ?? '').replace(/<[^>]*>/g, '')
  .replace(/&(?:nbsp|amp|lt|gt|quot);/g, ' ').trim().replace(/\s+/g, ' ');
let failed = false;
for (const name of names) {
  let module;
  try { module = JSON.parse(readFileSync(path.join(dir, name + '.json'), 'utf8')); }
  catch (err) { console.error(name + ': unreadable module: ' + err.message); failed = true; continue; }
  const qs = module.questions || [];
  let longestCorrect = 0;
  const answerCounts = [0,0,0,0], bad = [];
  qs.forEach((q, idx) => {
    const ai = 'abcd'.indexOf(q.answer);
    if (q.options?.length !== 4 || ai < 0 || !q.stem || !q.explanation || !q.figure) {
      bad.push('layer ' + (idx + 1) + ': malformed question');
      return;
    }
    answerCounts[ai]++;
    const lengths = q.options.map(s => plain(s).length);
    if (lengths[ai] === Math.max(...lengths)) longestCorrect++;
    if (Math.max(...lengths) - Math.min(...lengths) > 55)
      console.warn(name + ' layer ' + (idx+1) + ': option lengths differ by over 55 characters; review manually.');
  });
  const longestLimit = Math.max(2, Math.floor(qs.length * .3));
  if (longestCorrect > longestLimit) bad.push('correct answer longest in ' + longestCorrect + '/' + qs.length + ' layers (limit ' + longestLimit + ')');
  if (qs.length >= 7 && Math.max(...answerCounts) > Math.ceil(qs.length * .55))
    bad.push('correct answer letter appears ' + Math.max(...answerCounts) + '/' + qs.length + ' times');
  if (bad.length) { failed = true; console.error('FAIL ' + name + ': ' + bad.join('; ')); }
  else console.log('PASS ' + name + ': ' + qs.length + ' layers; longest-correct ' + longestCorrect + '; key A/B/C/D = ' + answerCounts.join('/'));
}
if (failed) process.exitCode = 1;
