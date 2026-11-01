#!/usr/bin/env node
/** Enforce fixed-pixel, slim open SVG arrowheads in all canonical English lessons. */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const lessonPaths=JSON.parse(readFileSync(path.join(here,'modules/index.json'),'utf8')).modules
 .map(x=>path.join(here,'modules',x.slug+'.json'));
lessonPaths.push(path.join(here,'unlisted','data-augmentation.json'));
let total=0, failures=[];
const attr=(tag,key)=>tag.match(new RegExp('\\\\b'+key+'="([^"]+)"'))?.[1];
for(const file of lessonPaths){
 const lesson=JSON.parse(readFileSync(file,'utf8'));
 const figures=[lesson.hero,...lesson.questions.map(q=>q.figure)];
 for(let i=0;i<figures.length;i++){
  const figure=String(figures[i]||'');
  for(const match of figure.matchAll(/<marker\\b([^>]*)>([\\s\\S]*?)<\\/marker>/g)){
   const tag=match[1],body=match[2],id=attr(tag,'id')||'unknown';total++;
   const w=Number(attr(tag,'markerWidth')),h=Number(attr(tag,'markerHeight'));
   const p=body.match(/<path\\b([^>]*)\\/>/)?.[1]||'';
   const thickness=Number(attr(p,'stroke-width'));
   if(attr(tag,'markerUnits')!=='userSpaceOnUse'||!Number.isFinite(w)||w>10||!Number.isFinite(h)||h>10||!p||attr(p,'fill')!=='none'||!Number.isFinite(thickness)||thickness>1.6)
    failures.push(path.basename(file)+' '+(i===0?'hero':'Q'+i)+' marker '+id+' must be fixed-size, open, and slim');
  }
 }
}
if(failures.length){for(const f of failures)console.error('FAIL '+f);process.exitCode=1;}
else console.log('PASS: '+total+' slim SVG arrowheads across '+lessonPaths.length+' English lessons; no implicit strokeWidth marker scaling.');
