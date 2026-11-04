#!/usr/bin/env node
// Legacy filename retained for workflow compatibility; validates an expandable curriculum.
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,join,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
const base=resolve(root,'..');
const baseline=JSON.parse(readFileSync(join(root,'58_TOPIC_WHITELIST.json'),'utf8')).topics;
const entries=JSON.parse(readFileSync(join(root,'modules/index.json'),'utf8')).modules;
const errors=[];
if(!Array.isArray(baseline)||baseline.length!==58)errors.push('Original baseline definition must be preserved');
if(!Array.isArray(entries)||entries.length<58)errors.push('The original 58 modules must be retained');
const slugs=new Set(), ids=new Set();
for(const [i,item] of (entries||[]).entries()){
 if(!item||typeof item.slug!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)){errors.push('Invalid slug at position '+(i+1));continue}
 if(slugs.has(item.slug))errors.push('Duplicate slug '+item.slug);
 slugs.add(item.slug);
 if(typeof item.catalogId!=='string'||!item.catalogId.trim())errors.push('Missing catalog ID '+item.slug);
 else if(ids.has(item.catalogId))errors.push('Duplicate catalog ID '+item.catalogId);
 ids.add(item.catalogId);
 if(typeof item.title!=='string'||!item.title.trim()||typeof item.domain!=='string'||!item.domain.trim())errors.push('Invalid title/subject '+item.slug);
 const path=join(root,'modules',item.slug+'.json');
 if(!existsSync(path)){errors.push('Missing module '+item.slug);continue}
 try{
  const module=JSON.parse(readFileSync(path,'utf8'));
  if(!Array.isArray(module.questions)||module.questions.length<1||(i<baseline.length&&module.questions.length!==7))errors.push('Invalid question count for '+item.slug);
  else for(const [n,q] of module.questions.entries())
   if(!q||!Array.isArray(q.options)||q.options.length!==4||!['a','b','c','d'].includes(q.answer)||!q.stem||!q.figure)
    errors.push('Invalid question '+item.slug+' Q'+(n+1));
  if(!module.hero)errors.push('Missing illustrated hero '+item.slug);
  if(module.diagramStyle){
   const css=resolve(root,String(module.diagramStyle).split(/[?#]/)[0]);
   if(!css.startsWith(root+sep)||!existsSync(css))errors.push('Missing/invalid diagram CSS '+item.slug);
  }
 }catch(e){errors.push('JSON error '+item.slug+': '+e.message)}
}
for(const [i,t] of (baseline||[]).entries()){
 const item=entries?.[i];
 if(!item||item.slug!==t.slug||item.catalogId!==t.id||item.domain!==t.subject)errors.push('Historical baseline changed at topic '+(i+1));
}
const actual=readdirSync(join(root,'modules')).filter(x=>x.endsWith('.json')&&x!=='index.json').map(x=>x.slice(0,-5));
if(actual.length!==slugs.size||actual.some(s=>!slugs.has(s)))errors.push('Every English module JSON must have one manifest entry');
for(const p of ['index.html','lab-v3.css','lab-v3.js'])if(!existsSync(join(base,p)))errors.push('Missing root template '+p);
for(const p of ['index.html','app.js','core.css'])if(!existsSync(join(root,p)))errors.push('Missing shared engine '+p);
if(errors.length){for(const x of errors)console.error('FAIL:',x);process.exitCode=1}
else console.log('PASS: '+entries.length+' English topics ('+(entries.length-58)+' added), original 58 protected, all registered modules valid');
