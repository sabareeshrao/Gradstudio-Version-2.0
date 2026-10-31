#!/usr/bin/env node
/**
 * Gradstudio custom-diagram quality gate (illustrated-v2 contract).
 * Run: node study-engine/verify-diagram-quality.mjs
 *      node study-engine/verify-diagram-quality.mjs neural-network
 *
 * This is a structural preflight, NOT a substitute for visual comparison
 * against the original Multimodal Training reference or mobile screenshot QA.
 * Existing modules are grandfathered; every subsequently added module must
 * explicitly adopt the illustrated-v2 contract.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const manifest=JSON.parse(readFileSync(path.join(here,'modules/index.json'),'utf8'));
const LEGACY=new Set(['softmax','masking','positional-encoding','stochastic-depth','flops','rag','turing-test','semantic-textual-similarity','gradient-descent']);
const requested=process.argv.slice(2);
const slugs=requested.length?requested:manifest.modules.map(m=>m.slug).filter(s=>!LEGACY.has(s));
let failed=0, checked=0;
const fail=(slug,message)=>{console.error('FAIL '+slug+': '+message);failed++};
for(const slug of slugs) {
  let lesson;
  try { lesson=JSON.parse(readFileSync(path.join(here,'modules',slug+'.json'),'utf8')); }
  catch(e){fail(slug,'Cannot parse module: '+e.message);continue}
  checked++;
  if(lesson.visualQuality!=='illustrated-v2')fail(slug,'New modules must declare visualQuality: illustrated-v2');
  if(!lesson.hero?.includes('<svg '))fail(slug,'Hero must contain a purpose-built illustrated scene, not text-only cards');
  // Guard against JavaScript string builders accidentally inserting the return value
  // of Array.forEach() (undefined), or otherwise serializing invalid placeholders.
  // Example of the correct builder: chunks.map(drawLabel).join(''), not '+=chunks.forEach(drawLabel)'.
  const brokenPlaceholder=/(?:^|>)\s*(?:undefined|NaN|\[object Object\])\s*(?:<|$)/i;
  if(brokenPlaceholder.test(lesson.hero||''))fail(slug,'Hero contains a rendered JavaScript placeholder such as undefined');
  // Prevent blank intro diagrams caused by HTML sections accidentally nested inside
  // SVG markup. Such markup can be silently reparented or ignored by browsers.
  const firstSvg=(lesson.hero||'').match(/<svg\b[^>]*>[\s\S]*?<\/svg>/i)?.[0]||'';
  if(/<(?:section|article|div|header|main|p|h[1-6])\b/i.test(firstSvg))
    fail(slug,'Hero SVG contains nested HTML elements; keep the SVG as a single valid drawing');
  const q=lesson.questions;
  if(!Array.isArray(q)||q.length<1){fail(slug,'Missing questions');continue}
  const scenes=[],figs=[];
  q.forEach((item,i)=>{
    if(!item.figure || typeof item.figure!=='string'){fail(slug,'Q'+(i+1)+' missing figure');return}
    const match=item.figure.match(/data-scene="([^"]+)"/);
    if(!match)fail(slug,'Q'+(i+1)+' missing unique composition fingerprint (data-scene)');
    else scenes.push(match[1]);
    figs.push(item.figure);
    // Reject malformed SVG paint values such as fill="#abc,#def" (renders black)
    // and labels accidentally serialized from an entire JavaScript array.
    for(const [,attribute,value] of item.figure.matchAll(/\b(fill|stroke|stop-color)="([^"]*)"/g)){
      if(/^(?:#[0-9a-fA-F]{3,8}\s*,\s*)+#[0-9a-fA-F]{3,8}$/.test(value))
        fail(slug,'Q'+(i+1)+' invalid SVG '+attribute+' contains a list of colors; use one color per shape');
    }
    const svgTexts=[...item.figure.matchAll(/<text\b[^>]*>([^<]+)<\/text>/g)]
      .map(m=>m[1].replace(/&amp;/g,'&').trim());
    const seen=new Map();
    for(const label of svgTexts){if(label.length>=75)seen.set(label,(seen.get(label)||0)+1)}
    for(const [label,count] of seen){
      if(count>=3)fail(slug,'Q'+(i+1)+' repeated long SVG label '+count+' times: '+label.slice(0,85));
    }
    if(brokenPlaceholder.test(item.figure))fail(slug,'Q'+(i+1)+' contains a rendered JavaScript placeholder (undefined/NaN/[object Object])');
    if(!item.figure.includes('<svg '))fail(slug,'Q'+(i+1)+' needs substantial visual illustration (SVG)');
    if(!item.figure.includes('aria-label='))fail(slug,'Q'+(i+1)+' visual needs an accessible description');
    const shapes=(item.figure.match(/<(?:path|circle|rect|line|polygon|polyline|ellipse)\b/g)||[]).length;
    if(shapes<8)fail(slug,'Q'+(i+1)+' needs actual drawn relationships, not text cards ('+shapes+' visual primitives)');
    if(!item.figure.includes('nn-note') && !item.figure.includes('class="'))fail(slug,'Q'+(i+1)+' missing instructional annotation');
  });
  if(new Set(scenes).size!==q.length)fail(slug,'Diagram composition fingerprints must be unique within each lesson');
  if(new Set(figs).size!==q.length)fail(slug,'Copied question diagrams are forbidden');
  if(!lesson.diagramStyle)fail(slug,'Missing keyword-scoped diagram CSS');
  if(Array.isArray(lesson.figureFingerprints)&&lesson.figureFingerprints.join('|')!==scenes.join('|'))fail(slug,'Declared scene fingerprints do not match the actual figures');
  if(q.some(item=>/^\s*(?:\d+\s*[.)]\s*)?layer\s*\d+\s*[:.\-–—]\s*/i.test(item.stem||'')))fail(slug,'Redundant Layer N prefixes in question stems');
  if(!lesson.sources)fail(slug,'Provide grounded technical references');
  if(!failed)console.log('PASS '+slug+' · '+q.length+' different diagrams, hero, accessible SVG scenes and scoped styles');
}
console.log('Diagram preflight: '+checked+' module(s), '+failed+' violation(s).');
if(failed)process.exitCode=1;
