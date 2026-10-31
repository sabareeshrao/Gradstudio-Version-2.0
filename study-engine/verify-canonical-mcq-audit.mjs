/**
 * Gradstudio canonical answer audit. Run:
 * node study-engine/verify-canonical-mcq-audit.mjs
 * node study-engine/verify-canonical-mcq-audit.mjs --strict-length
 * Semantic quality of distractors still requires editorial review.
 */
import {readFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
const base=dirname(fileURLToPath(import.meta.url));
const canonical=readFileSync(resolve(base,"../MCQ_ANSWER_AUDIT/TOPIC_AND_QUESTION_ONLY.md"),"utf8");
const slugs=[
"transformer","rag","deep-learning","neural-network","artificial-intelligence",
"prompt-engineering","attention-mechanism","self-attention","backpropagation","gradient-descent",
"generative-model","tokenization","embedding-vector","vector-database","ai-agent-framework",
"supervised-learning","reinforcement-learning","computer-vision","natural-language-processing",
"diffusion-model","large-vision-language-model","multimodal-learning","generative-adversarial-network",
"training-step","loss-function","activation-function","softmax","residual-connection",
"positional-encoding","rotary-position-embedding","query-projection","key-projection",
"value-projection","multi-head-attention","transformer-encoder","transformer-decoder",
"context-window","autoregressive-language-model","next-token-prediction","neural-network-pruning",
"quantization","knowledge-distillation","convolutional-neural-network","recurrent-neural-network",
"long-short-term-memory","random-forest","decision-tree-classifier","logistic-regression",
"linear-regression","k-means-clustering","principal-component-analysis","stochastic-gradient-descent",
"adam-optimizer","learning-rate","overfitting","generalization","train-validation-test-split",
"cross-validation-evaluation"
];
const matches=canonical.split(/\r?\n/).map(s=>s.match(/^\|\s*\*\*(\d+)\s*·\s*(.*?)\s*·\s*Q(\d+)\*\*\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*$/)).filter(Boolean);
const rows=matches.map(m=>({n:Number(m[1]),q:Number(m[3]),stem:m[4],answer:m[5]}));
const wc=s=>(String(s).match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[]).length;
const plain=s=>String(s).replace(/<[^>]*>/g," ").replace(/&(?:amp|lt|gt|quot|nbsp|#39);/g," ");
const problems=[],warnings=[];let checked=0;
if(rows.length!==406)problems.push("Source should contain 406 rows, found "+rows.length);
if(slugs.length!==58)problems.push("Expected 58 topics");
for(let i=0;i<slugs.length;i++){
 const slug=slugs[i],source=rows.filter(r=>r.n===i+1);
 let module;
 try{module=JSON.parse(readFileSync(resolve(base,"modules",slug+".json"),"utf8"))}
 catch(e){problems.push(slug+" cannot read: "+e.message);continue}
 if(!Array.isArray(module.questions)||module.questions.length!==7){problems.push(slug+" not 7 questions");continue}
 for(let j=0;j<7;j++){
  const q=module.questions[j],gold=source[j],tag=slug+" Q"+(j+1);
  checked++;
  if(!gold||gold.q!==j+1){problems.push(tag+" missing canonical entry");continue}
  if(q.stem!==gold.stem)problems.push(tag+" stem differs from source");
  if(!Array.isArray(q.options)||q.options.length!==4){problems.push(tag+" not four options");continue}
  const k="abcd".indexOf(q.answer);
  if(k<0)problems.push(tag+" invalid answer key");
  else if(q.options[k]!==gold.answer)problems.push(tag+" correct option differs from source");
  if(!q.figure)problems.push(tag+" missing diagram");
  const exWords=wc(plain(q.explanation));
  if(exWords>100)problems.push(tag+" explanation has "+exWords+" words");
  if(!/^\s*<strong>Explanation:/i.test(String(q.explanation)))warnings.push(tag+" explanation label differs");
  const lens=q.options.map(wc),chars=q.options.map(s=>s.length),ratio=Math.max(...lens)/Math.max(1,Math.min(...lens));
  if(k>=0&&(ratio>1.15||lens[k]>Math.max(...lens.filter((_,x)=>x!==k))||chars[k]>Math.max(...chars.filter((_,x)=>x!==k))))
    warnings.push(tag+" potential length clue; words="+lens.join("/")+" ratio="+ratio.toFixed(2));
  const distractors=q.options.filter((_,x)=>x!==k);
  if(distractors.some(s=>/\b(?:that describes|this describes|rather than)\b/i.test(s)))
    warnings.push(tag+" explicit distractor cue requires human review");
 }
}
console.log("Source fidelity checked "+checked+" questions / "+slugs.length+" topics.");
console.log("Blocking source errors: "+problems.length+"; editorial warnings: "+warnings.length+".");
for(const p of problems)console.error("ERROR "+p);
for(const w of warnings)console.warn("REVIEW "+w);
if(problems.length||(process.argv.includes("--strict-length")&&warnings.some(w=>w.includes("potential length clue"))))process.exitCode=1;
