#!/usr/bin/env node
/** Static regression gate for no-sideways-panning in Gradstudio lesson templates. */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const file=p=>readFileSync(path.join(here,p),'utf8');
const lesson=JSON.parse(file('unlisted/data-augmentation.json'));
const source=JSON.parse(readFileSync(path.join(here,'..','content-pipeline','01-content','data-augmentation.json'),'utf8'));
const css=file('diagrams/data-augmentation.css');
const core=file('core.css');
const runtime=file('responsive-figures.js');
const app=file('app.js');
const html=file('index.html');
const errors=[];
if(lesson.questions.length!==7)errors.push('Data Augmentation lost a question');
for(let i=0;i<7;i++){
 const a=lesson.questions[i],b=source.questions[i];
 if(a.stem!==b.stem||a.answer!==b.answer||JSON.stringify(a.options)!==JSON.stringify(b.options))
  errors.push('Data Augmentation Q'+(i+1)+' changed protected content');
}
if(/swipe horizontally|scroll horizontally/i.test(lesson.hero+lesson.questions.map(q=>q.figure).join(' ')))
 errors.push('Instruction to swipe horizontally remains');
if(/overflow-x\s*:\s*(?:auto|scroll)|min-width\s*:\s*(?:[6-9]\d{2}|[1-9]\d{3})px/i.test(css))
 errors.push('Data Augmentation has forbidden horizontal scrolling or forced large SVG width');
if(!css.includes('.da-mobile-panels{display:grid')||!css.includes('.da-art{display:none!important'))
 errors.push('Mobile semantic panel styling is missing');
if(!runtime.includes('DA_SECTIONS=')||!runtime.includes('mountResponsiveFigures')||!runtime.includes('renameSvgIds'))
 errors.push('Shared semantic figure reflow is missing');
if(!core.includes('Universal no-sideways-panning figure layout')||!core.includes('overflow-x:clip'))
 errors.push('Shared viewport protection is missing');
if(!app.includes('mountResponsiveFigures(root,slug)')||!html.includes('no-sideways-v1'))
 errors.push('Shared rendering hook or cache version is missing');
if(errors.length){errors.forEach(e=>console.error('FAIL '+e));process.exitCode=1;}
else console.log('PASS: seven original questions, no forced Data Augmentation horizontal scrolling, mobile semantic figures and shared template guards');
