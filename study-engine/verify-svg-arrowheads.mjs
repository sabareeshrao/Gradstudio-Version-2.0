#!/usr/bin/env node
/** Reject bulky, stroke-width-scaled SVG arrowheads in every English lesson. */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const registry=JSON.parse(readFileSync(path.join(here,'modules/index.json'),'utf8')).modules;
const lessons=registry.map(x=>path.join(here,'modules',x.slug+'.json'));
lessons.push(path.join(here,'unlisted','data-augmentation.json'));
const attr=(source,name)=>{
 const pieces=String(source).split(name+'="');
 return pieces.length>1?pieces[1].split('"')[0]:'';
};
let total=0;
const failures=[];
for(const file of lessons){
 const lesson=JSON.parse(readFileSync(file,'utf8'));
 const figures=[lesson.hero,...lesson.questions.map(q=>q.figure)];
 for(let i=0;i<figures.length;i++){
  for(const marker of String(figures[i]||'').matchAll(/<marker\b([^>]*)>([\s\S]*?)<\/marker>/g)){
   const tag=marker[1],body=marker[2],id=attr(tag,'id')||'unknown';
   const width=Number(attr(tag,'markerWidth')),height=Number(attr(tag,'markerHeight'));
   const pathTag=body.match(/<path\b([^>]*)\/>/)?.[1]||'';
   const thickness=Number(attr(pathTag,'stroke-width'));
   total++;
   if(attr(tag,'markerUnits')!=='userSpaceOnUse' ||
      !attr(tag,'viewBox') ||
      !Number.isFinite(width)||width<=0||width>10 ||
      !Number.isFinite(height)||height<=0||height>10 ||
      !pathTag||attr(pathTag,'fill')!=='none' ||
      !Number.isFinite(thickness)||thickness<=0||thickness>1.6){
     failures.push(path.basename(file)+' '+(i===0?'hero':'Q'+i)+' marker '+id+' violates the slim fixed-pixel open-chevron rule');
   }
  }
 }
}
if(failures.length){
 for(const f of failures)console.error('FAIL '+f);
 console.error(failures.length+' oversized or unsafe arrowheads found among '+total+' markers');
 process.exitCode=1;
}else{
 console.log('PASS: '+total+' slim, fixed-pixel open SVG arrowheads across '+lessons.length+' English lessons');
}
