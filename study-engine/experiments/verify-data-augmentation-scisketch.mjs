#!/usr/bin/env node
import {readFileSync} from 'node:fs';
const source=JSON.parse(readFileSync(new URL('../unlisted/data-augmentation.json',import.meta.url)));
const trial=JSON.parse(readFileSync(new URL('../unlisted/data-augmentation-scisketch.json',import.meta.url)));
const assert=(ok,message)=>{if(!ok)throw Error(message)};
assert(source.questions.length===7&&trial.questions.length===7,'Exactly 7 questions required');
assert(trial.hero.includes(source.hero),'Original hero must remain unchanged');
assert(trial.diagramStyle==='diagrams/data-augmentation-scisketch.css','Wrong experimental CSS');
let visuals=0;
for(let i=0;i<7;i++){
 const s=source.questions[i],t=trial.questions[i],figure=t.figure;
 for(const key of ['stem','options','answer','explanation','technicalExplanation','tag'])
   assert(JSON.stringify(s[key])===JSON.stringify(t[key]),'Changed original '+key+' in Q'+(i+1));
 assert(figure.includes(s.figure),'Original Q'+(i+1)+' figure not preserved');
 assert(figure.includes('data-ds-card="'+(i+1)+'"'),'Q'+(i+1)+' comparison wrapper missing');
 assert(figure.includes('data-ds-diagram="'+(i+1)+'"'),'Q'+(i+1)+' technical scene missing');
 assert(figure.includes('data-variant="new"')&&figure.includes('data-variant="original"'),'Q'+(i+1)+' A/B panes missing');
 for(const option of ['new','original','both'])
   assert(figure.includes('value="'+option+'"'),'Missing '+option+' comparison option Q'+(i+1));
 assert(figure.includes('data-ds-zone'),'Collision-aware normal-flow layout missing Q'+(i+1));
 assert(!/<img\b|<image\b|data:image\/|\.png|\.jpe?g/i.test(figure),'Raster image detected Q'+(i+1));
 const newPart=figure.split('<div class="ds-pane" data-variant="original" hidden>')[0];
 assert(!/<text\b/i.test(newPart),'SVG text forbidden in enhanced figure Q'+(i+1));
 visuals++;
}
console.log('PASS: '+visuals+' unique SciSketch-inspired scenes, original seven questions and hero preserved, A/B selectors, no raster or SVG-positioned text.');
