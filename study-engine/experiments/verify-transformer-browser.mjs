#!/usr/bin/env node
/** Headless Chromium collision + mobile regression for the three-way Transformer research experiment. */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
const port=18961;
const output='study-engine/experiments/qa-artifacts';
mkdirSync(output,{recursive:true});
const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1'],{stdio:'ignore'});
let browser,failures=[];
try{
 let ready=false;
 for(let i=0;i<30;i++){try{const r=await fetch('http://127.0.0.1:'+port+'/study-engine/index.html');if(r.ok){ready=true;break}}catch{}await sleep(300)}
 if(!ready)throw Error('Local server did not start');
 browser=await chromium.launch({headless:true});
 for(const width of [1280,390]){
  const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto('http://127.0.0.1:'+port+'/study-engine/?module=transformer-scisketch',{waitUntil:'domcontentloaded'});
  await page.locator('.pb-card').first().waitFor({timeout:30000});
  await page.locator('.pb-svg').last().waitFor({timeout:30000});
  await page.evaluate(()=>document.fonts.ready);
  await sleep(400);
  const initial=await page.evaluate(()=>{
   const list=[...document.querySelectorAll('.pb-card')];
   return {count:list.length,svgCount:document.querySelectorAll('.pb-svg').length,
      inputs:document.querySelectorAll('#quiz input[type="radio"]').length,
      scrollWidth:document.documentElement.scrollWidth,viewport:window.innerWidth,
      visible:list.map(q=>[...q.querySelectorAll('.pb-variant')].filter(v=>!v.hidden).map(v=>v.dataset.version)),
      audit:list.map(q=>q.querySelector('.pb-layout-status')?.textContent||'NOT RUN')};
  });
  console.log('VIEWPORT',width,JSON.stringify(initial));
  if(initial.count!==7||initial.svgCount!==7||initial.inputs!==28)failures.push(width+': seven-card content or options missing');
  if(initial.scrollWidth>initial.viewport+3)failures.push(width+': document horizontal overflow '+initial.scrollWidth+' > '+initial.viewport);
  if(initial.visible.some(v=>v.join(',')!=='paperbanana'))failures.push(width+': default PaperBanana variant not exclusively visible');
  const geom=await page.evaluate(()=>{
    const problems=[],svgCards=[...document.querySelectorAll('.pb-card')];
    const bb=e=>{try{return e.getBBox()}catch{return null}};
    const intersect=(a,b)=>Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)>3&&Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)>3;
    svgCards.forEach((card,ci)=>{
      const svg=card.querySelector('.pb-svg');
      if(!svg){problems.push('Q'+(ci+1)+' missing SVG');return}
      const vb=svg.viewBox.baseVal,texts=[...svg.querySelectorAll('text')].map(e=>({e,b:bb(e)})).filter(x=>x.b);
      for(let i=0;i<texts.length;i++){
       const a=texts[i];
       if(a.b.x<vb.x-2||a.b.y<vb.y-2||a.b.x+a.b.width>vb.x+vb.width+2||a.b.y+a.b.height>vb.y+vb.height+2)problems.push('Q'+(ci+1)+' out of bounds '+a.e.textContent.trim());
       for(let k=i+1;k<texts.length;k++)if(intersect(a.b,texts[k].b))problems.push('Q'+(ci+1)+' label collision '+a.e.textContent.trim()+' / '+texts[k].e.textContent.trim());
       for(const bar of svg.querySelectorAll('[data-chart-bar]')){const rect=bb(bar);if(rect&&intersect(a.b,rect))problems.push('Q'+(ci+1)+' chart label collision '+a.e.textContent.trim())}
      }
      for(const path of svg.querySelectorAll('path[data-route]')){
       const len=path.getTotalLength();
       for(let k=1;k<Math.min(140,len/5);k++){const v=path.getPointAtLength(len*k/Math.min(140,len/5));
        if(texts.some(t=>v.x>t.b.x+3&&v.x<t.b.x+t.b.width-3&&v.y>t.b.y+3&&v.y<t.b.y+t.b.height-3)){problems.push('Q'+(ci+1)+' connector crosses text');break}
       }
      }
    });
    return problems;
  });
  console.log('GEOMETRY',width,JSON.stringify(geom.slice(0,100)));
  failures.push(...geom.map(x=>width+': '+x));
  if(errors.length)failures.push(...errors.map(e=>width+': JS '+e));
  // Ensure dropdown switches without changing quiz input counts, answers or progress.
  await page.locator('#pb-select-2').selectOption('original');
  let selectResult=await page.evaluate(()=>({visible:[...document.querySelector('#sc-compare-q2 .pb-panes')?.children||[]].length,chosen:document.querySelector('#pb-select-2').value,questionCount:document.querySelectorAll('#quiz input[type="radio"]').length}));
  if(selectResult.chosen!=='original'||selectResult.questionCount!==28)failures.push(width+': dropdown changed quiz state');
  await page.locator('#pb-select-2').selectOption('all');
  const allVisible=await page.evaluate(()=>[...document.querySelectorAll('#pb-select-2')].length&&document.querySelectorAll('.pb-card')[1].querySelectorAll('.pb-variant:not([hidden])').length);
  if(allVisible!==3)failures.push(width+': compare all three not visible');
  await page.locator('#pb-select-2').selectOption('paperbanana');
  await page.locator('.pb-card').nth(1).screenshot({path:output+'/q2-'+width+'.png'});
  await page.locator('.pb-card').nth(2).screenshot({path:output+'/q3-'+width+'.png'});
  // Inspect repaired SciSketch Q2/Q3 with real browser geometry; preserve screenshot evidence.
  for(const number of [1,2,3,4,5,6,7]){
   await page.locator('#pb-select-'+number).selectOption('scisketch');
   await sleep(180);
   const result=await page.evaluate(n=>{
    const card=[...document.querySelectorAll('.pb-card')][n-1];
    return {status:card.querySelector('.pb-layout-status')?.textContent||'',
      selected:card.querySelector('.pb-select')?.value,
      visible:card.querySelectorAll('.pb-variant:not([hidden])').length};
   },number);
   console.log('SCISKETCH',width,'Q'+number,JSON.stringify(result));
   if(result.selected!=='scisketch'||result.visible!==1)failures.push(width+': SciSketch control visibility failed Q'+number);
   if(!result.status.includes('no detected collisions')||result.status.includes('potential collisions'))failures.push(width+': SciSketch collision check failed Q'+number+': '+result.status);
   await page.locator('.pb-card').nth(number-1).screenshot({path:output+'/q'+number+'-scisketch-'+width+'.png'});
   await page.locator('#pb-select-'+number).selectOption('paperbanana');
  }
  // Ensure the per-card selector stays inside the card and is not styled as an answer option.
  const control=await page.evaluate(()=>{
    const card=document.querySelector('.pb-card');
    const label=card.querySelector('.pb-select-wrap label');
    const dropdown=card.querySelector('.pb-select');
    const c=card.getBoundingClientRect(),s=dropdown.getBoundingClientRect();
    return {fits:s.left>=c.left-2&&s.right<=c.right+2,border:parseFloat(getComputedStyle(label).borderTopWidth)||0};
  });
  console.log('CONTROL',width,JSON.stringify(control));
  if(!control.fits||control.border>0)failures.push(width+': dropdown overflows or label inherits answer-option styling');
  await page.close();
 }
}finally{
 if(browser)await browser.close();server.kill('SIGTERM');
}
if(failures.length){console.error('FAILURES '+failures.length+'\n'+failures.join('\n'));process.exitCode=1}
else console.log('PASS: all seven PaperBanana and SciSketch diagrams checked for marked-object/text/route collisions; dropdown, quiz, desktop and mobile checks passed.');
