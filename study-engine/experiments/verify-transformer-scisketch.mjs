#!/usr/bin/env node
import { readFileSync } from 'node:fs';
const base=JSON.parse(readFileSync(new URL('../modules/transformer.json', import.meta.url)));
const trial=JSON.parse(readFileSync(new URL('../unlisted/transformer-scisketch.json', import.meta.url)));
const assert=(condition,message)=>{if(!condition)throw Error(message)};
assert(base.questions.length===7 && trial.questions.length===7,'Seven questions required');
for(let i=0;i<7;i++)for(const key of ['stem','options','answer','explanation','technicalExplanation']){
  assert(JSON.stringify(base.questions[i][key])===JSON.stringify(trial.questions[i][key]),'Source content differs at Q'+(i+1)+' '+key);
}
for(const i of [0,1,2,3,4,6])assert(base.questions[i].figure===trial.questions[i].figure,'Control diagram changed Q'+(i+1));
assert(base.hero && trial.hero.includes(base.hero),'Original hero missing');
const q=trial.questions[5].figure;
assert(q.includes('data-research="scisketch-code-first"'),'Research SVG missing');
assert((q.match(/data-bert-edge=/g)||[]).length===16,'BERT should have sixteen attention links');
assert((q.match(/data-gpt-cell=/g)||[]).length===16,'GPT should have sixteen mask cells');
assert((q.match(/data-allowed="true"/g)||[]).length===10,'GPT must have ten causal mask cells');
assert((q.match(/data-t5-cross=/g)||[]).length===3,'T5 cross-attention paths missing');
assert(q.includes(base.questions[5].figure),'Original Q6 baseline comparison missing');
assert(!/<image\b|data:image\/|\.png|\.jpe?g/i.test(q),'Raster/image dependency forbidden');
assert(trial.diagramStyle==='diagrams/transformer-scisketch.css','Incorrect isolated stylesheet');
console.log('PASS — seven original questions and keys, six control figures and hero, 16 BERT links, 10 GPT causal cells, three T5 cross links, inline SVG A/B');
