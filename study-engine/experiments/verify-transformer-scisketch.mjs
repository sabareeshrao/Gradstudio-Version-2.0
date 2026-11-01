#!/usr/bin/env node
import {readFileSync} from 'node:fs';
const source=JSON.parse(readFileSync(new URL('../modules/transformer.json',import.meta.url)));
const test=JSON.parse(readFileSync(new URL('../unlisted/transformer-scisketch.json',import.meta.url)));
const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
assert(source.questions.length===7&&test.questions.length===7,'Seven-question source lock failed');
assert(test.hero.includes(source.hero),'Original hero missing');
for(let i=0;i<7;i++){
 const before=source.questions[i],q=test.questions[i],s=q.figure,number=i+1;
 for(const key of ['stem','options','answer','explanation','technicalExplanation'])
  assert(JSON.stringify(q[key])===JSON.stringify(before[key]),'Edited source '+key+' in Q'+number);
 assert(s.includes('data-scene="triple-svg-comparison-q'+number+'"'),'Missing three-way card '+number);
 for(const mode of ['original','scisketch','paperbanana'])assert(s.includes('data-version="'+mode+'"'),'Missing '+mode+' mode in Q'+number);
 assert(s.includes('value="all"'),'Compare-all control missing in Q'+number);
 assert(s.includes(before.figure),'Original diagram not preserved in Q'+number);
 assert(s.includes('data-paperbanana-scene="'+number+'"'),'PaperBanana SVG missing in Q'+number);
 assert(s.includes('data-research="scisketch-code-first"'),'SciSketch SVG missing in Q'+number);
 assert((s.match(/<svg\b/g)||[]).length>=3,'Expected three inline SVG figures in Q'+number);
 assert(!/<image\b|data:image\/|\\.png|\\.jpe?g/i.test(s),'Raster image found Q'+number);
 assert(!/<input\b|onclick=|<script\b/i.test(s),'Unsafe quiz-input/script inside comparison Q'+number);
}
assert(!/ 435 Q [^"]+ 435"/.test(test.questions[1].figure),'Q2 unsafe connector arcs remain');
assert(!test.questions[2].figure.includes('illustrative scores → softmax probabilities'),'Q3 overlapping annotation remains');
assert((test.questions[5].figure.match(/data-bert-edge=/g)||[]).length===16,'BERT links lost');
assert((test.questions[5].figure.match(/data-gpt-cell=/g)||[]).length===16,'GPT mask lost');
assert((test.questions[5].figure.match(/data-allowed="true"/g)||[]).length===10,'GPT causal mask changed');
assert((test.questions[5].figure.match(/data-t5-cross=/g)||[]).length===3,'T5 cross attention changed');
assert(test.diagramStyle==='diagrams/transformer-scisketch.css','CSS wrong');
console.log('PASS: 7 locked assessments, original+SciSketch+PaperBanana SVG, 7 dropdowns and compare-all, targeted collision repairs, no rasters.');
