#!/usr/bin/env node
import {readFileSync} from 'node:fs';
const base=JSON.parse(readFileSync(new URL('../modules/transformer.json',import.meta.url)));
const trial=JSON.parse(readFileSync(new URL('../unlisted/transformer-scisketch.json',import.meta.url)));
const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
assert(base.questions.length===7&&trial.questions.length===7,'Seven questions required');
assert(trial.hero.includes(base.hero),'Original hero was not preserved');
let totalComparison=0,allSVG=0;
const fingerprints=[];
for(let i=0;i<7;i++){
 const before=base.questions[i],after=trial.questions[i];
 for(const key of ['stem','options','answer','explanation','technicalExplanation'])
   assert(JSON.stringify(before[key])===JSON.stringify(after[key]),'Locked content changed Q'+(i+1)+' '+key);
 const fig=after.figure;
 assert(fig.includes('data-scene="scisketch-'),'Unique research diagram missing Q'+(i+1));
 assert(fig.includes('id="sc-compare-q'+(i+1)+'"'),'A/B control missing Q'+(i+1));
 assert(fig.includes('<details')&&fig.includes('</details>'),'Native compare control malformed Q'+(i+1));
 assert(fig.includes(before.figure),'Full original source missing Q'+(i+1));
 assert(fig.includes('data-research="scisketch-code-first"'),'Research code-first SVG missing Q'+(i+1));
 assert((fig.match(/<svg\b/g)||[]).length>=2,'New and original SVG required Q'+(i+1));
 assert(!/<image\b|data:image\/|\\.png|\\.jpe?g/i.test(fig),'Raster dependency disallowed Q'+(i+1));
 assert(!/<input\b|onclick=|<script\b/i.test(fig),'Comparison must not alter quiz scoring Q'+(i+1));
 fingerprints.push(fig.match(/data-scene="([^"]+)"/)[1]);
 totalComparison++;allSVG+=2;
}
assert(new Set(fingerprints).size===7,'Duplicate figure fingerprints');
const q1=trial.questions[0].figure,q2=trial.questions[1].figure,q3=trial.questions[2].figure,q4=trial.questions[3].figure,q5=trial.questions[4].figure,q6=trial.questions[5].figure,q7=trial.questions[6].figure;
assert((q2.match(/Q K V/g)||[]).length>=5,'Parallel projection scene incomplete');
assert(q3.includes('TOKEN EMBEDDINGS')&&q3.includes('ATTENTION WEIGHTS')&&q3.includes('NEXT-TOKEN LOGITS'),'Input-output pipeline incomplete');
assert(q4.includes('K, V memory')&&q4.includes('cross-attention')&&q4.includes('Masked multi-head'),'Original architecture connections missing');
assert(q5.includes('loss.backward()')&&q5.includes('optimizer.step()')&&q5.includes('attn_mask=mask'),'Training blueprint missing');
assert((q6.match(/data-bert-edge=/g)||[]).length===16,'BERT all-to-all links missing');
assert((q6.match(/data-gpt-cell=/g)||[]).length===16,'GPT causal grid incomplete');
assert((q6.match(/data-allowed="true"/g)||[]).length===10,'GPT causal mask wrong');
assert((q6.match(/data-t5-cross=/g)||[]).length===3,'T5 cross links incomplete');
assert(q7.includes('FLASHATTENTION')&&q7.includes('KV CACHE')&&q7.includes('RoPE')&&q7.includes('DISTRIBUTED TRAINING'),'Scaling topics missing');
assert(trial.diagramStyle==='diagrams/transformer-scisketch.css','Stylesheet path changed');
console.log('PASS — '+totalComparison+' original content locks and A/B controls, seven unique code-first diagrams, '+allSVG+' original/enhanced SVGs, checked topology and zero quiz inputs.');
