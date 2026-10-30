/**
 * Gradstudio MCQ answer-length bias gate.
 * Usage: node study-engine/verify-module-options.mjs
 * Or:    node study-engine/verify-module-options.mjs study-engine/modules/stochastic-depth.json
 *
 * Compares word and character lengths for every A-D choice. Keeping answer
 * lengths similar prevents the correct option from becoming a visual clue.
 * This is an automated heuristic; human review of content is still required.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const base=dirname(fileURLToPath(import.meta.url));
const manifest=JSON.parse(readFileSync(resolve(base,'modules/index.json'),'utf8'));
const rawArgs=process.argv.slice(2);
const strictAll=rawArgs.includes('--strict-all');
const args=rawArgs.filter(x=>x!=='--strict-all');
const files=args.length?args.map(x=>resolve(x)):manifest.modules.map(m=>resolve(base,'modules',m.slug+'.json'));
const legacyBiasDebt=new Set(['flops','rag','turing-test','semantic-textual-similarity']);
let problems=0, examined=0, legacyWarnings=0;
function visible(s) {
  return String(s).replace(/<[^>]*>/g,' ').replace(/&(?:amp|lt|gt|quot|#39);/g,' ').trim();
}
function words(s) {
  return (visible(s).match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[]).length;
}
for(const file of files) {
  const data=JSON.parse(readFileSync(file,'utf8'));
  // Four existing modules predate the strict QA check. Still report their
  // outstanding answer-bias debt, but never let it block new lessons.
  // --strict-all or a specific file path re-enables hard failure for these.
  const relaxedLegacy=!strictAll && args.length===0 && legacyBiasDebt.has(file.split('/').pop().replace('.json',''));
  if(!Array.isArray(data.questions)||!data.questions.length) {
    console.error('FAIL '+file+': no questions');problems++;continue;
  }
  for (let i=0;i<data.questions.length;i++) {
    examined++;
    const q=data.questions[i];
    // Avoid duplicated "Layer 1:" / "Layer 2:" prefixes in learner-facing questions.
    if (/^\s*(?:\d+\s*[.)]\s*)?layer\s*\d+\s*[:.\-–—]\s*/i.test(String(q.stem||''))) {
      console.error('FAIL '+data.keyword+' Q'+(i+1)+': remove the redundant Layer N prefix from stem');
      problems++;
    }
    if(!Array.isArray(q.options)||q.options.length!==4||!('abcd'.includes(q.answer))) {
      console.error('FAIL '+data.keyword+' L'+(i+1)+': invalid A-D options or answer key');problems++;continue;
    }
    const len=q.options.map(words),chars=q.options.map(x=>visible(x).length),correct='abcd'.indexOf(q.answer);
    const maxW=Math.max(...len), minW=Math.min(...len);
    const longestWords=len[correct]>Math.max(...len.filter((_,j)=>j!==correct));
    const longestChars=chars[correct]>Math.max(...chars.filter((_,j)=>j!==correct));
    if(minW===0 || maxW/minW>1.15 || longestWords || longestChars) {
      const details=data.keyword+' Q'+(i+1)+' words='+len.join('/')+' chars='+chars.join('/')+
        ' key='+q.answer+' ratio='+(minW? (maxW/minW).toFixed(2):'N/A')+
        ' correctLongestWords='+longestWords+' correctLongestChars='+longestChars;
      if(relaxedLegacy && minW>0){console.warn('LEGACY REVIEW '+details);legacyWarnings++;}
      else{console.error('FAIL '+details);problems++;}
    } else {
      console.log('PASS '+data.keyword+' L'+(i+1)+' words='+len.join('/')+' key='+q.answer);
    }
  }
}
console.log('Audited '+examined+' cards across '+files.length+' modules; '+problems+' blocking violation(s); '+legacyWarnings+' inherited bias warning(s).');
if(problems)process.exitCode=1;
