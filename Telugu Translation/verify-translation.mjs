#!/usr/bin/env node
// Review gates for Telugu + English lessons. Keeps all original technical diagrams in English.
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root=resolve(import.meta.dirname,"..");
const folder=resolve(import.meta.dirname);
const files=readdirSync(folder).filter(f=>f.endsWith(".te.json"));
if(!files.length)throw Error("Missing Telugu-English lessons");
const Telugu=/[\u0C00-\u0C7F]/u;
const English=/[A-Za-z]/u;
const errors=[];
for(const f of files){
  const translated=JSON.parse(readFileSync(resolve(folder,f),"utf8"));
  const slug=f.replace(/\.te\.json$/,"");
  const original=JSON.parse(readFileSync(resolve(root,"study-engine","modules",slug+".json"),"utf8"));
  const name=f;
  if(translated.diagramLanguage!=="en" || translated.contentLanguage!=="te-en") errors.push(name+": language metadata missing");
  if(translated.hero!==original.hero)errors.push(name+": hero must exactly match English original");
  if(translated.questions?.length!==original.questions?.length)errors.push(name+": question count changed");
  translated.questions?.forEach((q,i)=>{
    const en=original.questions[i];
    if(!en)return;
    if(q.figure!==en.figure)errors.push(name+": diagram "+(i+1)+" differs from English original");
    if(q.answer!==en.answer)errors.push(name+": correct answer changed in question "+(i+1));
    if(!Array.isArray(q.options)||q.options.length!==4)errors.push(name+": question "+(i+1)+" needs four options");
    if(!Telugu.test(q.stem)||!English.test(q.stem))errors.push(name+": question "+(i+1)+" must combine Telugu and English");
    if(!q.options?.every(v=>Telugu.test(v)&&English.test(v)))errors.push(name+": answers "+(i+1)+" must combine Telugu and English");
    if(!q.explanation?.includes("Simple Explanation:")||!Telugu.test(q.explanation))errors.push(name+": easy explanation missing for "+(i+1));
    if(!q.technicalExplanation?.includes("Correct Answer:")||!Telugu.test(q.technicalExplanation))errors.push(name+": detailed explanation missing for "+(i+1));
    if(q.options?.length===4){
       const wc=q.options.map(s=>s.trim().split(/\s+/).length),ch=q.options.map(s=>s.length);
       const idx="abcd".indexOf(q.answer);
       if(idx>=0){
         if(wc[idx]>Math.max(...wc.filter((_,j)=>j!==idx)))errors.push(name+": correct answer uniquely longest by words in "+(i+1));
         if(ch[idx]>Math.max(...ch.filter((_,j)=>j!==idx)))errors.push(name+": correct answer uniquely longest by characters in "+(i+1));
       }
       if(Math.max(...wc)/Math.min(...wc)>1.5)errors.push(name+": word length ratio too high in "+(i+1));
    }
  });
  console.log("Checked",name,"—",translated.questions?.length,"questions");
}
if(errors.length){for(const e of errors)console.error("ERROR:",e);process.exit(1)}
console.log("PASS: bilingual learner copy, seven original English diagrams, preserved answers, simple explanations and balanced choices.");
