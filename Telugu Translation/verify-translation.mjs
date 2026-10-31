#!/usr/bin/env node
// Validate all bilingual copies against their original English source lessons.
import {readFileSync, readdirSync, existsSync} from "node:fs";
import {resolve} from "node:path";
const folder=import.meta.dirname, root=resolve(folder,"..");
const translations=[
  ["transformer","01-transformer.html","transformer.te.json"],
  ["rag","02-rag.html","modules/rag.te.json"],
  ["deep-learning","03-deep-learning.html","modules/deep-learning.te.json"],
  ["neural-network","04-neural-network.html","modules/neural-network.te.json"],
  ["artificial-intelligence","05-artificial-intelligence.html","modules/artificial-intelligence.te.json"],
  ["prompt-engineering","06-prompt-engineering.html","modules/prompt-engineering.te.json"],
  ["attention-mechanism","07-attention-mechanism.html","modules/attention-mechanism.te.json"],
  ["self-attention","08-self-attention.html","modules/self-attention.te.json"],
  ["backpropagation","09-backpropagation.html","modules/backpropagation.te.json"],
  ["gradient-descent","10-gradient-descent.html","modules/gradient-descent.te.json"],
  ["generative-model","11-generative-model.html","modules/generative-model.te.json"],
  ["tokenization","12-tokenization.html","modules/tokenization.te.json"],
  ["embedding-vector","13-embedding-vector.html","modules/embedding-vector.te.json"],
  ["vector-database","14-vector-database.html","modules/vector-database.te.json"],
  ["ai-agent-framework","15-ai-agent-framework.html","modules/ai-agent-framework.te.json"],
  ["supervised-learning","16-supervised-learning.html","modules/supervised-learning.te.json"],
  ["reinforcement-learning","17-reinforcement-learning.html","modules/reinforcement-learning.te.json"],
  ["computer-vision","18-computer-vision.html","modules/computer-vision.te.json"],
  ["natural-language-processing","19-natural-language-processing.html","modules/natural-language-processing.te.json"],
  ["diffusion-model","20-diffusion-model.html","modules/diffusion-model.te.json"],
  ["large-vision-language-model","21-large-vision-language-model.html","modules/large-vision-language-model.te.json"],
  ["multimodal-learning","22-multimodal-learning.html","modules/multimodal-learning.te.json"],
  ["generative-adversarial-network","23-generative-adversarial-network.html","modules/generative-adversarial-network.te.json"],
  ["training-step","24-training-step.html","modules/training-step.te.json"],
  ["loss-function","25-loss-function.html","modules/loss-function.te.json"],
  ["activation-function","26-activation-function.html","modules/activation-function.te.json"],
  ["softmax","27-softmax.html","modules/softmax.te.json"],
  ["residual-connection","28-residual-connection.html","modules/residual-connection.te.json"],
  ["positional-encoding","29-positional-encoding.html","modules/positional-encoding.te.json"],
  ["rotary-position-embedding","30-rotary-position-embedding.html","modules/rotary-position-embedding.te.json"]
];
const te=/[\u0C00-\u0C7F]/u,en=/[A-Za-z]/u;
const errors=[];
function validate(slug,entry,filename){
 const translationPath=resolve(folder,filename);
 const entryPath=resolve(folder,entry);
 const englishEntry=resolve(root,"lessons",entry);
 const englishModule=resolve(root,"study-engine/modules",slug+".json");
 if(!existsSync(translationPath)||!existsSync(entryPath)||!existsSync(englishModule)){
  errors.push(slug+": missing translated HTML, data or English source module");return;
 }
 if(Number(entry.slice(0,2))<=10&&!existsSync(englishEntry))errors.push(slug+": missing original English entry");
 const d=JSON.parse(readFileSync(translationPath,"utf8"));
 const source=JSON.parse(readFileSync(englishModule,"utf8"));
 const html=readFileSync(entryPath,"utf8");
 if(slug!=="transformer"&&!html.includes('data-module="'+slug+'"'))errors.push(slug+": HTML data-module missing");
 if(d.contentLanguage!=="te-en"||d.diagramLanguage!=="en")errors.push(slug+": incorrect language markers");
 if(d.hero!==source.hero)errors.push(slug+": English overview illustration changed");
 if(d.questions.length!==7)errors.push(slug+": require exactly 7 questions");
 for(let i=0;i<7;i++){
  const q=d.questions[i],p=source.questions[i];
  if(!q||!p){errors.push(slug+": question "+(i+1)+" missing");continue;}
  if(q.figure!==p.figure)errors.push(slug+": English diagram "+(i+1)+" changed");
  if(q.answer!==p.answer)errors.push(slug+": question "+(i+1)+" correct answer changed");
  if(!te.test(q.stem)||!en.test(q.stem))errors.push(slug+": bilingual question "+(i+1)+" missing");
  if(!Array.isArray(q.options)||q.options.length!==4){errors.push(slug+": four answer choices required for Q"+(i+1));continue;}
  if(q.options.some(x=>!te.test(x)||!en.test(x)))errors.push(slug+": bilingual option missing Q"+(i+1));
  if(!q.explanation?.includes("Simple Explanation:")||!te.test(q.explanation))errors.push(slug+": beginner explanation missing Q"+(i+1));
  if(!q.technicalExplanation?.includes("Correct Answer:")||!te.test(q.technicalExplanation))errors.push(slug+": technical detail missing Q"+(i+1));
  const words=q.options.map(x=>x.trim().split(/\s+/).length),chars=q.options.map(x=>x.length),idx="abcd".indexOf(q.answer);
  if(idx<0){errors.push(slug+": invalid answer Q"+(i+1));continue;}
  if(words[idx]>Math.max(...words.filter((_,j)=>j!==idx)))errors.push(slug+": correct answer longest by words Q"+(i+1));
  if(chars[idx]>Math.max(...chars.filter((_,j)=>j!==idx)))errors.push(slug+": correct answer longest by characters Q"+(i+1));
  if(Math.max(...words)/Math.min(...words)>1.5)errors.push(slug+": option length ratio exceeds 1.5 Q"+(i+1));
 }
 console.log("Checked "+slug+": "+d.questions.length+" questions / "+(d.questions.length*4)+" options / unchanged English diagrams");
}
translations.forEach(row=>validate(...row));
const index=readFileSync(resolve(folder,"index.html"),"utf8");
for(const [slug,entry] of translations)if(!index.includes('./'+entry))errors.push(slug+": missing from index.html link table");
// Guardrail: all URL rows must stay inside one uninterrupted Markdown table.
const linksFile=readFileSync(resolve(folder,"ALL_TELUGU_HTML_LINKS.md"),"utf8");
const tableBegin=linksFile.indexOf("| No. |");
const tableEnd=linksFile.indexOf("## Copy-ready HTML links");
if(tableBegin<0||tableEnd<=tableBegin){
 errors.push("master links: Markdown table or copy-ready section missing");
}else{
 const lines=linksFile.slice(tableBegin,tableEnd).trim().split(/\r?\n/);
 if(lines.length!==translations.length+2)errors.push("master links: table must have exactly "+translations.length+" contiguous data rows");
 if(lines[1]!=="|---:|---|---|---|")errors.push("master links: invalid Markdown table separator");
 if(lines[0]!=="| No. | Lesson / Keyword | Telugu HTML Page | English Original Page |")errors.push("master links: table headers must link Telugu and English original pages");
 for(let i=0;i<translations.length;i++){
  const entry=translations[i][1],row=lines[i+2]||"";
  const webUrl="https://sabareeshrao.github.io/Gradstudio-Version-2.0/Telugu%20Translation/"+entry;
  if(!row.startsWith("| "+String(i+1).padStart(2,"0")+" |"))errors.push("master links: row "+(i+1)+" missing or separated from table");
  if(!row.includes("]("+webUrl+")"))errors.push("master links: row "+(i+1)+" missing full HTML URL");
  const englishOriginal=i<10
   ? "https://sabareeshrao.github.io/Gradstudio-Version-2.0/lessons/"+entry
   : "https://sabareeshrao.github.io/Gradstudio-Version-2.0/study-engine/?module="+translations[i][0];
  if(!row.includes("[Open English]("+englishOriginal+")"))
   errors.push("master links: row "+(i+1)+" missing correct live English original page");
  if(row.includes("github.com/") || row.includes("[View HTML]"))
   errors.push("master links: source-code link found in place of English lesson");

  if(row.split("|").length!==6)errors.push("master links: row "+(i+1)+" has broken table columns");
 }
 const list=linksFile.match(new RegExp("\\x60{3}text\\r?\\n([\\s\\S]*?)\\r?\\n\\x60{3}"));
 if(!list){errors.push("master links: copy-ready URL block missing")}
 else{
  const urls=list[1].split(/\r?\n/);
  if(urls.length!==translations.length)errors.push("master links: copy-ready URL count mismatch");
  translations.forEach(([,entry],i)=>{
   if(urls[i]!=="https://sabareeshrao.github.io/Gradstudio-Version-2.0/Telugu%20Translation/"+entry)
    errors.push("master links: copy-ready URL "+(i+1)+" does not match table");
  });
 }
}
if(errors.length){errors.forEach(e=>console.error("FAIL:",e));process.exit(1)}
console.log("PASS: 30 bilingual lessons, 210 questions, 840 options, 210 original English diagrams, answer keys, translations, and index links.");
