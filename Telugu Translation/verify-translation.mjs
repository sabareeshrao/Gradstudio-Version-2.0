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
  ["rotary-position-embedding","30-rotary-position-embedding.html","modules/rotary-position-embedding.te.json"],
  ["query-projection","31-query-projection.html","modules/query-projection.te.json"],
  ["key-projection","32-key-projection.html","modules/key-projection.te.json"],
  ["value-projection","33-value-projection.html","modules/value-projection.te.json"],
  ["multi-head-attention","34-multi-head-attention.html","modules/multi-head-attention.te.json"],
  ["transformer-encoder","35-transformer-encoder.html","modules/transformer-encoder.te.json"],
  ["transformer-decoder","36-transformer-decoder.html","modules/transformer-decoder.te.json"],
  ["context-window","37-context-window.html","modules/context-window.te.json"],
  ["autoregressive-language-model","38-autoregressive-language-model.html","modules/autoregressive-language-model.te.json"],
  ["next-token-prediction","39-next-token-prediction.html","modules/next-token-prediction.te.json"],
  ["neural-network-pruning","40-neural-network-pruning.html","modules/neural-network-pruning.te.json"],
  ["quantization","41-quantization.html","modules/quantization.te.json"],
  ["knowledge-distillation","42-knowledge-distillation.html","modules/knowledge-distillation.te.json"],
  ["convolutional-neural-network","43-convolutional-neural-network.html","modules/convolutional-neural-network.te.json"],
  ["recurrent-neural-network","44-recurrent-neural-network.html","modules/recurrent-neural-network.te.json"],
  ["long-short-term-memory","45-long-short-term-memory.html","modules/long-short-term-memory.te.json"],
  ["random-forest","46-random-forest.html","modules/random-forest.te.json"],
  ["decision-tree-classifier","47-decision-tree-classifier.html","modules/decision-tree-classifier.te.json"],
  ["logistic-regression","48-logistic-regression.html","modules/logistic-regression.te.json"],
  ["linear-regression","49-linear-regression.html","modules/linear-regression.te.json"],
  ["k-means-clustering","50-k-means-clustering.html","modules/k-means-clustering.te.json"]
];
const te=/[\u0C00-\u0C7F]/u,en=/[A-Za-z]/u;
const errors=[];
// Shared Telugu Reveal/Hide UI must be present for all lesson wrappers.
const sharedTeluguRenderer=readFileSync(resolve(folder,"app-te.js"),"utf8");
const sharedTeluguQuiz=readFileSync(resolve(folder,"quiz-te.js"),"utf8");
if(!sharedTeluguRenderer.includes('class="reveal-toggle"')||!sharedTeluguRenderer.includes('reveal-control-row'))errors.push("Telugu renderer missing shared Reveal control");
if(!sharedTeluguQuiz.includes("function setQuestionReveal")||!sharedTeluguQuiz.includes("function updateRevealLabel"))errors.push("Telugu quiz missing shared Reveal/Hide handler");
if(!sharedTeluguQuiz.includes("updateRevealLabel(q,false)"))errors.push("Telugu quiz reset does not close Reveal");
const sourceTrackedLessons=new Set(["transformer","rag","deep-learning","neural-network","artificial-intelligence","generative-model","tokenization","embedding-vector","vector-database","ai-agent-framework","prompt-engineering","attention-mechanism","self-attention","backpropagation","gradient-descent","supervised-learning","reinforcement-learning","computer-vision","natural-language-processing","diffusion-model","large-vision-language-model","multimodal-learning","generative-adversarial-network","training-step","loss-function","activation-function","softmax","residual-connection","positional-encoding","rotary-position-embedding"]);
// Match the translation to the latest English choices and explanation wording.
// A changed English question invalidates its translation until reviewed again.
function englishSourceDigest(q){
 let h=2166136261;
 for(const ch of JSON.stringify([q.stem,q.options,q.answer,q.explanation,q.technicalExplanation])){
  h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;
 }
 return h.toString(16).padStart(8,"0");
}
function validate(slug,entry,filename){
 const translationPath=resolve(folder,filename);
 const entryPath=resolve(folder,entry);
 const englishEntry=resolve(root,"lessons",entry);
 const englishModule=resolve(root,"study-engine/modules",slug+".json");
 if(!existsSync(translationPath)||!existsSync(entryPath)||!existsSync(englishModule)){
  errors.push(slug+": missing translated HTML, data or English source module");return;
 }
 if(Number(entry.slice(0,2))<=10&&!existsSync(englishEntry))errors.push(slug+": missing original English entry");
 let d=JSON.parse(readFileSync(translationPath,"utf8"));
 const source=JSON.parse(readFileSync(englishModule,"utf8"));
 if(d.translationOverlay===true){
  if(!Array.isArray(d.questions)||d.questions.length!==7){errors.push(slug+": overlay requires seven questions");return;}
  if(d.questions.some(q=>q.figure!==undefined||q.answer!==undefined))errors.push(slug+": overlay must not replace English figures or answer keys");
  const overlay=d;
  d={...source,...overlay,
    hero:source.hero,diagramStyle:"../study-engine/"+source.diagramStyle,
    questions:source.questions.map((q,i)=>({
      ...q,...overlay.questions[i],figure:q.figure,answer:q.answer,
      technicalExplanation:overlay.questions[i].technicalExplanation?.includes("Correct Answer:")
       ? overlay.questions[i].technicalExplanation
       : "<strong>Correct Answer: "+q.answer.toUpperCase()+".</strong> "+(overlay.questions[i].technicalExplanation||"")
    }))
  };
 }
 const html=readFileSync(entryPath,"utf8");
 // Required static DOM controls: quiz-te.js dereferences these during startup.
 // Prevent null.style crashes when a lesson is generated from an incomplete template.
 const requiredControls=["moduleRoot","moduleBrand","progress","progressFill","counter",
  "themeMenu","themeToggle","themeIndicator","themePanel","themeChoices","themeHint","copyThemeUrl"];
 for(const id of requiredControls){
  const matches=html.match(new RegExp('\\bid="'+id+'"','g'))||[];
  if(matches.length!==1)errors.push(slug+": Required static DOM controls missing or duplicated: "+id);
 }
 if(!html.includes('src="./app-te.js"')&&!html.includes('src="./app-te.js?'))errors.push(slug+": missing shared bilingual lesson bootstrap");
 if(!html.includes('class="theme-indicator" id="themeIndicator"'))
  errors.push(slug+": missing theme indicator element needed by theme initialization");

 if(slug!=="transformer"&&!html.includes('data-module="'+slug+'"'))errors.push(slug+": HTML data-module missing");
 if(d.contentLanguage!=="te-en"||d.diagramLanguage!=="en")errors.push(slug+": incorrect language markers");
 if(d.hero!==source.hero)errors.push(slug+": English overview illustration changed");
 if(d.questions.length!==7)errors.push(slug+": require exactly 7 questions");
 for(let i=0;i<7;i++){
  const q=d.questions[i],p=source.questions[i];
  if(!q||!p){errors.push(slug+": question "+(i+1)+" missing");continue;}
  if(q.figure!==p.figure)errors.push(slug+": English diagram "+(i+1)+" changed");
  if(q.answer!==p.answer)errors.push(slug+": question "+(i+1)+" correct answer changed");
  if(sourceTrackedLessons.has(slug)&&q.englishSourceDigest!==englishSourceDigest(p))errors.push(slug+": English options/explanations changed since translation in Q"+(i+1));
  if(!te.test(q.stem)||!en.test(q.stem))errors.push(slug+": bilingual question "+(i+1)+" missing");
  if(!Array.isArray(q.options)||q.options.length!==4){errors.push(slug+": four answer choices required for Q"+(i+1));continue;}
  if(q.options.some(x=>!te.test(x)||!en.test(x)))errors.push(slug+": bilingual option missing Q"+(i+1));
  if(sourceTrackedLessons.has(slug)){
   // These reviewed lessons follow the newer English example-led explanation format.
   // Never move the example into a second panel or substitute a short summary.
   if(!/^<strong>Explanation:<\/strong>\s*/.test(q.explanation||"")||!te.test(q.explanation))
    errors.push(slug+": source-format main Explanation missing Q"+(i+1));
   const englishDetailLabel=p.technicalExplanation?.match(/^<strong>(.*?)<\/strong>/)?.[1];
   const translatedDetailLabel=q.technicalExplanation?.match(/^<strong>(.*?)<\/strong>/)?.[1];
   if(!englishDetailLabel || translatedDetailLabel!==englishDetailLabel || !te.test(q.technicalExplanation||""))
    errors.push(slug+": technical explanation must preserve source heading and language Q"+(i+1));
   const words=(q.explanation||"").replace(/<[^>]+>/g," ").trim().split(/\s+/).length;
   if(words<50)errors.push(slug+": explanation shortened below source depth Q"+(i+1)+" ("+words+" words)");
   if(!d.translationSource?.preserveEnglishExplanationStructure)
    errors.push(slug+": source explanation order preservation flag missing");
  } else {
   if(!q.explanation?.includes("Simple Explanation:")||!te.test(q.explanation))errors.push(slug+": beginner explanation missing Q"+(i+1));
   if(!q.technicalExplanation?.includes("Correct Answer:")||!te.test(q.technicalExplanation))errors.push(slug+": technical detail missing Q"+(i+1));
  }
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
const tableEnd=linksFile.indexOf("## Copy-ready HTML URLs");
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
  if(!row.startsWith("| "+translations[i][1].slice(0,2)+" |"))errors.push("master links: row "+(i+1)+" missing or separated from table");
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

 const copyPath=resolve(folder,"COPY_READY_TELUGU_URLS.txt");
 if(!existsSync(copyPath))errors.push("copy-ready: all 50 full URLs file is missing");
 else{
  const urls=readFileSync(copyPath,"utf8").trim().split(/\r?\n/);
  if(urls.length!==translations.length)errors.push("copy-ready: URL count differs from lesson count");
  translations.forEach(([,entry],i)=>{
   if(urls[i]!=="https://sabareeshrao.github.io/Gradstudio-Version-2.0/Telugu%20Translation/"+entry)
    errors.push("copy-ready URL "+(i+1)+" does not match its Telugu page");
  });
 }

}
if(errors.length){errors.forEach(e=>console.error("FAIL:",e));process.exit(1)}
console.log("PASS: 50 bilingual lessons, 350 questions, 1400 options, 350 original English diagrams, answer keys, translations, and index links.");
