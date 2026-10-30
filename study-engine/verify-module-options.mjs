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
const args=process.argv.slice(2);
const files=args.length?args.map(x=>resolve(x)):manifest.modules.map(m=>resolve(base,'modules',m.slug+'.json'));
let problems=0, examined=0;
function visible(s) {
  return String(s).replace(/<[^>]*>/g,' ').replace(/&(?:amp|lt|gt|quot|#39);/g,' ').trim();
}
function words(s) {
  return (visible(s).match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[]).length;
}
for(const file of files) {
  const data=JSON.parse(readFileSync(file,'utf8'));
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
      console.error('FAIL '+data.keyword+' L'+(i+1)+' words='+len.join('/')+' chars='+chars.join('/')+
        ' key='+q.answer+' ratio='+(minW? (maxW/minW).toFixed(2):'N/A')+
        ' correctLongestWords='+longestWords+' correctLongestChars='+longestChars);
      problems++;
    } else {
      console.log('PASS '+data.keyword+' L'+(i+1)+' words='+len.join('/')+' key='+q.answer);
    }
  }
}
console.log('Audited '+examined+' cards across '+files.length+' modules; '+problems+' violation(s).');
if(problems)process.exitCode=1;
