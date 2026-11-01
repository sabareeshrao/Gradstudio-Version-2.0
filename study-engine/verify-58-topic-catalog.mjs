#!/usr/bin/env node
// Check the exact owner-approved 58-topic whitelist and its dependencies.
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
const base=resolve(root,'..');
const topics=JSON.parse(readFileSync(join(root,'58_TOPIC_WHITELIST.json'),'utf8')).topics;
const items=JSON.parse(readFileSync(join(root,'modules/index.json'),'utf8')).modules;
const errors=[];
if(topics.length!==58||items.length!==58)errors.push('Expected 58 topics in both catalog and manifest');
const a=topics.map(x=>x.slug),b=items.map(x=>x.slug);
if(a.join()!==b.join()||new Set(a).size!==58)errors.push('Manifest order/content does not match exact whitelist');
const actual=readdirSync(join(root,'modules')).filter(x=>x.endsWith('.json')&&x!=='index.json').map(x=>x.slice(0,-5)).sort();
if(actual.join()!==[...a].sort().join())errors.push('Extra or missing English module JSON files');
for(let i=0;i<topics.length;i++){
 const topic=topics[i],item=items[i]; if(!item||item.catalogId!==topic.id||item.domain!==topic.subject)errors.push('Metadata mismatch '+topic.slug);
 const p=join(root,'modules',topic.slug+'.json');
 if(!existsSync(p)){errors.push('Missing '+p);continue}
 try{
  const q=JSON.parse(readFileSync(p,'utf8'));
  if(q.questions?.length!==7||q.questions.some(x=>x.options?.length!==4||!['a','b','c','d'].includes(x.answer)))errors.push('Invalid 7-question quiz '+topic.slug);
  if(q.diagramStyle&&!existsSync(resolve(root,q.diagramStyle)))errors.push('Missing diagram CSS '+topic.slug);
 }catch(e){errors.push('JSON parse: '+topic.slug+': '+e.message)}
}
for(const p of ['index.html','lab-v3.css','lab-v3.js'])if(!existsSync(join(base,p)))errors.push('Original template asset missing '+p);
for(const p of ['index.html','app.js','core.css'])if(!existsSync(join(root,p)))errors.push('Shared engine asset missing '+p);
if(errors.length){for(const x of errors)console.error('FAIL:',x);process.exitCode=1}
else console.log('PASS: exactly 58 approved topics, 406 questions, original root template and all module dependencies');
