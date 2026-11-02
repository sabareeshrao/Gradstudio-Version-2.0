#!/usr/bin/env node
/** Fail if Gradstudio regresses to oversized SVGs, scrolling, or mobile replicas. */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const file=p=>readFileSync(path.join(here,p),'utf8');
const lesson=JSON.parse(file('unlisted/data-augmentation.json'));
const source=JSON.parse(readFileSync(path.join(here,'..','content-pipeline','01-content','data-augmentation.json'),'utf8'));
const css=file('diagrams/data-augmentation.css');
const runtime=file('responsive-figures.js');
const core=file('core.css');
const app=file('app.js');
const html=file('index.html');
const problems=[];
if(lesson.questions.length!==7)problems.push('Expected seven questions');
for(let i=0;i<7;i++){
 const q=lesson.questions[i],ref=source.questions[i];
 if(q.stem!==ref.stem||q.answer!==ref.answer||JSON.stringify(q.options)!==JSON.stringify(ref.options))
  problems.push('Q'+(i+1)+' question or answers changed');
}
if(lesson.questions.some(q=>!q.figure.includes('<svg')))problems.push('Missing SVG figures');
if(lesson.questions[5].figure.includes('da-q6-mobile'))problems.push('Duplicated Q6 mobile panels remain');
if(/overflow-x\s*:\s*(?:auto|scroll)|min-width\s*:\s*(?:[5-9]\d{2}|[1-9]\d{3})px/i.test(css))
 problems.push('Figure CSS forces panning or oversized minimum width');
if(!css.includes('.da-art > svg,.da-art > img')||!css.includes('width:100%!important'))
 problems.push('Fit-to-card SVG rule missing');
if(runtime.includes('DA_SECTIONS')||runtime.includes('makePanel(')||runtime.includes('cloneNode('))
 problems.push('Responsive helper still duplicates mobile diagrams');
if(!runtime.includes("svg.ownerSVGElement")||!core.includes('Global diagram-fit fallback'))
 problems.push('Global fit-only safeguard missing');
if(!app.includes('mountResponsiveFigures(root,slug)')||!html.includes('20261101-fit-only-v2'))
 problems.push('Renderer or cache version mismatch');
if(problems.length){problems.forEach(p=>console.error('FAIL '+p));process.exitCode=1;}
else console.log('PASS: seven original figures fit existing cards; no scrolling, width increase, or duplicated mobile layouts');
