#!/usr/bin/env node
/**
 * SVG text-collision guardrail. Applied to Attention Mechanism in the Pages build.
 * Checks labels for approximate overlaps, missing/empty SVGs, and text outside
 * the viewBox. Conservative static preflight; browser screenshots still matter.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const slug = process.argv[2] || 'attention-mechanism';
const mod = JSON.parse(readFileSync(resolve('study-engine/modules', slug + '.json'),'utf8'));
let problems=0;
const allFigs=[['hero',mod.hero],...mod.questions.map((q,i)=>['Q'+(i+1),q.figure])];
const section=process.argv[3];
const figs=section?allFigs.filter(([name])=>name===section):allFigs;
if(section&&!figs.length){console.error('Unknown diagram section: '+section);process.exit(1)}
for(const [label,html] of figs){
  const s=html.match(/<svg\b[^>]*>[\s\S]*?<\/svg>/)?.[0];
  if(!s){console.error('FAIL '+label+': missing SVG');problems++;continue}
  const vb=s.match(/viewBox="([^"]+)"/)?.[1]?.split(/\s+/).map(Number);
  if(!vb||vb.length!==4){console.error('FAIL '+label+': missing viewBox');problems++;continue}
  const nodes=[...s.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)].map(match=>{
    const a=match[1],tx=match[2].replace(/&#39;/g,"'").replace(/&amp;/g,'&');
    const val=(key,def=0)=>Number(a.match(new RegExp(key+'="([^"]+)"'))?.[1]??def);
    const x=val('x'),y=val('y'),f=val('font-size',14);
    const anchor=a.match(/text-anchor="([^"]+)"/)?.[1]||'start';
    const width=[...tx].length*f*0.57;
    const x1=anchor==='middle'?x-width/2:anchor==='end'?x-width:x;
    return {tx,x1,x2:x1+width,y1:y-f*.92,y2:y+f*.22};
  });
  for(let i=0;i<nodes.length;i++){
    const a=nodes[i];
    if(a.x1 < vb[0]-2 || a.x2 > vb[0]+vb[2]+2 || a.y1 < vb[1]-2 || a.y2 > vb[1]+vb[3]+2){
      console.error('FAIL '+label+': label outside viewBox: '+a.tx);problems++;
    }
    for(let k=i+1;k<nodes.length;k++){
      const b=nodes[k];
      if(Math.min(a.x2,b.x2)-Math.max(a.x1,b.x1)>7 && Math.min(a.y2,b.y2)-Math.max(a.y1,b.y1)>3){
        console.error('FAIL '+label+': overlapping SVG labels: '+a.tx+' / '+b.tx);problems++;
      }
    }
  }
  console.log('Checked '+label+' ('+nodes.length+' SVG labels)');
}
if(problems){console.error(problems+' SVG layout errors');process.exitCode=1}
else console.log('PASS: no static SVG label collisions in '+slug);
