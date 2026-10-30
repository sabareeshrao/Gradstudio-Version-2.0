#!/usr/bin/env node
/**
 * Gradstudio beginner-first explanation guardrail.
 * node study-engine/verify-explanation-quality.mjs [optional-slug ...]
 *
 * Every card must offer an immediately readable, jargon-light takeaway.
 * Technical depth is kept in a collapsed disclosure by the shared renderer.
 * Word limits are a structural check, not a substitute for human clarity QA.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const manifest=JSON.parse(readFileSync(path.join(here,'modules/index.json'),'utf8'));
const slugs=process.argv.length>2?process.argv.slice(2):manifest.modules.map(m=>m.slug);
let failCount=0,checked=0;
function plain(s){return String(s??'').replace(/<[^>]*>/g,' ').replace(/&(?:amp|lt|gt|quot|nbsp|#39);/g,' ').replace(/\s+/g,' ').trim()}
function countWords(s){return (plain(s).match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[]).length}
function fail(slug,i,msg){console.error('FAIL '+slug+' Q'+i+': '+msg);failCount++}
for(const slug of slugs){
  let module;
  try{module=JSON.parse(readFileSync(path.join(here,'modules',slug+'.json'),'utf8'))}
  catch(e){fail(slug,0,'Cannot read module: '+e.message);continue}
  if(!Array.isArray(module.questions)||module.questions.length===0){fail(slug,0,'No questions');continue}
  const seen=new Set();
  for(const [j,q] of module.questions.entries()){
    const i=j+1; checked++;
    if(typeof q.explanation!=='string'){fail(slug,i,'Missing beginner explanation');continue}
    if(!/^\s*<strong>In simple words:<\/strong>/i.test(q.explanation))
      fail(slug,i,'Beginner explanation must start with “In simple words:”');
    const body=q.explanation.replace(/^\s*<strong>In simple words:<\/strong>\s*/i,'');
    const words=countWords(body);
    if(words<12||words>42)fail(slug,i,'Beginner takeaway must use 12–42 words, found '+words);
    if(/<(?:ul|ol|li|table|h[1-6]|pre|blockquote)\b/i.test(body))
      fail(slug,i,'Do not overwhelm the default answer with lists, tables, or code blocks');
    if(/\b(?:Correct answer|Correct:\s*[A-D]|Layer\s*[1-7])\b/i.test(plain(body)))
      fail(slug,i,'Do not repeat answer keys or Layer N labels inside the takeaway');
    if(!q.technicalExplanation||countWords(q.technicalExplanation)<10)
      fail(slug,i,'Keep the original thorough explanation in technicalExplanation');
    const normalized=plain(body).toLowerCase();
    if(seen.has(normalized))fail(slug,i,'Repeated generic beginner explanation');
    seen.add(normalized);
  }
  console.log('Checked '+slug+' · '+module.questions.length+' beginner-first explanations');
}
console.log('Beginner explanation audit: '+checked+' questions, '+failCount+' blocking errors.');
if(failCount)process.exitCode=1;
