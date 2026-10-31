#!/usr/bin/env node
/**
 * Gradstudio beginner-first explanation guardrail.
 * node study-engine/verify-explanation-quality.mjs [optional-slug ...]
 *
 * Every card must use a concise takeaway or a bounded, example-led explanation.
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
    const concise=/^\s*<strong>In simple words:<\/strong>/i.test(q.explanation);
    const illustrated=/^\s*<strong>Explanation:<\/strong>/i.test(q.explanation);
    if(!concise&&!illustrated)fail(slug,i,'Use “In simple words:” for concise takeaways or “Explanation:” for a plain-language example');
    const body=q.explanation.replace(/^\s*<strong>(?:In simple words:|Explanation:)<\/strong>\s*/i,'');
    const words=countWords(body);
    if(concise&&(words<12||words>42))fail(slug,i,'Concise beginner takeaway must use 12–42 words, found '+words);
    // New English source lessons use an example-led 60–110 word explanation.
    // Keep that format meaningful and bounded without altering author-approved answer text.
    if(illustrated&&(words<45||words>150))fail(slug,i,'Example-led explanation must use 45–150 words, found '+words);
    if(/<(?:ul|ol|li|table|h[1-6]|pre|blockquote)\b/i.test(body))
      fail(slug,i,'Do not overwhelm the default answer with lists, tables, or code blocks');
    if(/\b(?:Correct answer\s*:|Correct:\s*[A-D]\b|Layer\s*[1-7]\b)/i.test(plain(body)))
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
