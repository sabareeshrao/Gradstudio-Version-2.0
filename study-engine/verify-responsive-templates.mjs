#!/usr/bin/env node
/** Check the user-approved compact Data Augmentation redesign without weakening answer/source locks. */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const file=p=>readFileSync(path.join(here,p),'utf8');
const lesson=JSON.parse(file('unlisted/data-augmentation.json'));
const source=JSON.parse(readFileSync(path.join(here,'..','content-pipeline','01-content','data-augmentation.json'),'utf8'));
const css=file('diagrams/data-augmentation.css'), runtime=file('responsive-figures.js');
const core=file('core.css'), app=file('app.js'), html=file('index.html');
const problems=[];
if(lesson.questions.length!==7)problems.push('Expected seven questions');
for(let i=0;i<7;i++){
 const q=lesson.questions[i],ref=source.questions[i];
 if(q.stem!==ref.stem||q.answer!==ref.answer||JSON.stringify(q.options)!==JSON.stringify(ref.options))
  problems.push('Q'+(i+1)+' question or answers changed');
 if(!q.figure.includes('data-scene="compact-')||!q.figure.includes('da-lesson-art'))
  problems.push('Q'+(i+1)+' compact teaching scene is missing');
 const words=q.figure.replace(/<[^>]*>/g,' ').replace(/&[a-z]+;/gi,' ').trim().split(/\s+/).filter(Boolean).length;
 if(words>65)problems.push('Q'+(i+1)+' artwork is too text heavy: '+words+' words');
 if(/viewBox="0 0 1000 430"/.test(q.figure))problems.push('Q'+(i+1)+' old oversized artwork remains');
}
if(lesson.questions.some(q=>q.figure.includes('da-q6-mobile')))problems.push('Duplicated Q6 mobile panels remain');
if(!lesson.hero.includes('<svg')||!lesson.hero.includes('da-hero-flow'))problems.push('Compact illustrated hero missing');
if(/overflow-x\s*:\s*(?:auto|scroll)|min-width\s*:\s*(?:[5-9]\d{2}|[1-9]\d{3})px/i.test(css))
 problems.push('Figure CSS forces panning or oversized minimum width');
if(!css.includes('.da-contact-sheet')||!css.includes('.da-comparison')||!css.includes('@media(max-width:540px)'))
 problems.push('Responsive compact diagram rules missing');
if(runtime.includes('DA_SECTIONS')||runtime.includes('makePanel(')||runtime.includes('cloneNode('))
 problems.push('Responsive helper still duplicates diagrams');
if(!runtime.includes('svg.ownerSVGElement')||!core.includes('Global diagram-fit fallback'))
 problems.push('Global fit-only safeguard missing');
if(!app.includes('mountResponsiveFigures(root,slug)')||!app.includes('20261102-da-compact-v3')||!html.includes('20261102-vscode15-v1')||!html.includes('20261102-da-compact-v3'))
 problems.push('Renderer or cache version mismatch');
if(problems.length){problems.forEach(p=>console.error('FAIL '+p));process.exitCode=1;}
else console.log('PASS: 7 concise scenes; source content locked; responsive sizing and no sideways scrolling');
