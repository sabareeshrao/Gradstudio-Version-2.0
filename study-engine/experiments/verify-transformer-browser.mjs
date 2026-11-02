#!/usr/bin/env node
/** Blocking screenshot/geometry QA for all 7 research cards, all 3 modes, and mobile layouts.
 * Collision constraints are measured against real browser geometry. Never infer
 * that valid XML alone proves visual quality.
 */
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {setTimeout as sleep} from 'node:timers/promises';
const PORT=18961,OUT='study-engine/experiments/qa-artifacts';
mkdirSync(OUT,{recursive:true});
const server=spawn('python3',['-m','http.server',String(PORT),'--bind','127.0.0.1'],{stdio:'ignore'});
const errors=[];
let browser;
const url='http://127.0.0.1:'+PORT+'/study-engine/?module=transformer-scisketch';
function check(ok,detail){if(!ok)errors.push(detail)}
try{
 let ready=false;for(let k=0;k<50;k++){try{let r=await fetch(url);if(r.ok){ready=true;break}}catch{}await sleep(220)}
 if(!ready)throw Error('Local server unavailable');
 browser=await chromium.launch({headless:true});
 for(const width of [1280,900,390,320]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const jsErrors=[];page.on('pageerror',e=>jsErrors.push(String(e)));
  await page.goto(url,{waitUntil:'domcontentloaded'});
  await page.locator('.pb-card').first().waitFor({timeout:30000});
  await page.locator('.cl-mobile').last().waitFor({state:'attached',timeout:30000});
  await page.evaluate(()=>document.fonts.ready);
  await sleep(250);
  const mobile=width<=720;
  const initial=await page.evaluate(()=>{
   return {cards:document.querySelectorAll('.pb-card').length,mobileScenes:document.querySelectorAll('.cl-mobile').length,
     inputs:document.querySelectorAll('#quiz input[type="radio"]').length,
     width:document.documentElement.scrollWidth,viewport:innerWidth};
  });
  console.log('VIEWPORT',width,JSON.stringify(initial));
  check(initial.cards===7&&initial.mobileScenes===21&&initial.inputs===28,width+': missing source or mobile scenes');
  check(initial.width<=initial.viewport+2,width+': document horizontal overflow');
  for(let q=1;q<=7;q++){
   const card=page.locator('.pb-card').nth(q-1);
   for(const mode of ['original','scisketch','paperbanana']){
    await card.locator('.pb-select').selectOption(mode);
    await sleep(45);
    const outcome=await page.evaluate(({q,mode,mobile})=>{
     const card=[...document.querySelectorAll('.pb-card')][q-1];
     const active=card.querySelector('.pb-variant[data-version="'+mode+'"]');
     const hiddenOther=[...card.querySelectorAll('.pb-variant')].filter(x=>x!==active&&getComputedStyle(x).display!=='none');
     const boxes=[...active.querySelectorAll('.cl-panel')].map(x=>x.getBoundingClientRect());
     const intersects=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2;
     const scrollIssues=[];
     const scoped=mobile?active.querySelectorAll('.cl-mobile,.cl-panel,.cl-code,.cl-pills,.cl-steps,.cl-sequence'):
                       active.querySelectorAll('.pb-scroll,.sc-stage,.tr-surface,.sc-code-shell pre,.tr-code-grid');
     for(const el of scoped){
      if(el.scrollWidth>el.clientWidth+3)scrollIssues.push(el.className+' '+el.scrollWidth+'/'+el.clientWidth);
      if(['auto','scroll'].includes(getComputedStyle(el).overflowX))scrollIssues.push('horizontal scrollbar enabled '+el.className);
     }
     const geometry=[];
     if(mobile){
       const story=active.querySelector('.cl-mobile'),scene=active.querySelector('.tr-figure');
       const root=story?.getBoundingClientRect(),outer=active.getBoundingClientRect();
       if(!story||getComputedStyle(story).display==='none')geometry.push('Mobile scene missing');
       if(scene&&getComputedStyle(scene).display!=='none')geometry.push('Wide desktop SVG still visible on phone');
       if(root&&(root.left<outer.left-2||root.right>outer.right+2))geometry.push('Mobile story out of bounds');
       for(let i=0;i<boxes.length;i++){
        if(root&&(boxes[i].left<root.left-2||boxes[i].right>root.right+2))geometry.push('panel '+i+' outside mobile story');
        for(let k=i+1;k<boxes.length;k++)if(intersects(boxes[i],boxes[k]))geometry.push('flow panels overlap '+i+'/'+k);
       }
     } else if(mode!=='original'){
       const svg=active.querySelector(mode==='paperbanana'?'.pb-svg':'.sc-diagram');
       if(!svg)geometry.push('Enhanced SVG missing');
       else{
        const vb=svg.viewBox.baseVal;
        const bb=e=>{try{const b=e.getBBox();return {x:b.x,y:b.y,w:b.width,h:b.height}}catch{return null}};
        const hit=(a,b,margin=1)=>Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>margin&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>margin;
        const texts=[...svg.querySelectorAll('text')].map(e=>({e,b:bb(e)})).filter(z=>z.b?.w>1);
        for(let i=0;i<texts.length;i++){
         const a=texts[i];
         if(a.b.x<vb.x-3||a.b.y<vb.y-3||a.b.x+a.b.w>vb.x+vb.width+3||a.b.y+a.b.h>vb.y+vb.height+3)geometry.push('text out of SVG viewBox: '+a.e.textContent.trim().slice(0,35));
         for(let k=i+1;k<texts.length;k++)if(hit(a.b,texts[k].b,2))geometry.push('labels overlap');
        }
        const obstacles=[...svg.querySelectorAll('[data-layout-obstacle]')].map(e=>({e,b:bb(e),type:e.getAttribute('data-layout-obstacle')})).filter(x=>x.b?.w>1);
        for(let i=0;i<obstacles.length;i++)for(let k=i+1;k<obstacles.length;k++)if(obstacles[i].type!==obstacles[k].type&&hit(obstacles[i].b,obstacles[k].b,1))geometry.push('object collision: '+obstacles[i].type+'/'+obstacles[k].type);
        // Explicit generated chart bars must stay clear of annotation labels.
        for(const bar of svg.querySelectorAll('[data-chart-bar]')){
         const box=bb(bar);if(box&&texts.some(x=>hit(x.b,box,1)))geometry.push('bar-label collision');
        }
       }
     }
     const label=card.querySelector('.pb-select-wrap label');
     const border=parseFloat(getComputedStyle(label).borderTopWidth)||0;
     return {mode,mobile,visible:!active.hidden&&!hiddenOther.length,scrollIssues,geometry,
       answerInputs:document.querySelectorAll('#quiz input[type="radio"]').length,
       labelBorder:border,liveStatus:card.querySelector('.pb-layout-status')?.textContent||''};
    },{q,mode,mobile});
    if(!outcome.visible||outcome.answerInputs!==28)errors.push(width+' Q'+q+' '+mode+': comparison changed quiz or visible modes');
    if(outcome.scrollIssues.length)errors.push(width+' Q'+q+' '+mode+': '+outcome.scrollIssues.join('; '));
    if(outcome.geometry.length)errors.push(width+' Q'+q+' '+mode+': '+outcome.geometry.join('; '));
    if(outcome.labelBorder>0)errors.push(width+' Q'+q+': dropdown caption inherits answer style');
    if(mode==='scisketch'&&outcome.liveStatus.includes('potential collisions'))errors.push(width+' Q'+q+': live constraint audit: '+outcome.liveStatus);
    if([1,7].includes(q)&&(width===390||width===1280)){
     await card.screenshot({path:OUT+'/q'+q+'-'+mode+'-'+width+'.png'});
    }
   }
   await card.locator('.pb-select').selectOption('all');
   const allVisible=await page.evaluate(n=>[...document.querySelectorAll('.pb-card')][n-1].querySelectorAll('.pb-variant:not([hidden])').length,q);
   check(allVisible===3,width+' Q'+q+': compare-all does not expose all variants');
   await card.locator('.pb-select').selectOption('paperbanana');
  }
  errors.push(...jsErrors.map(e=>width+': JS '+e));
  console.log('SCENES',width,'validated 7 questions × 3 modes; '+(mobile?'constraint-flow mobile':'desktop SVG')+'; errors so far '+errors.length);
  await page.close();
 }
}finally{if(browser)await browser.close();server.kill('SIGTERM')}
if(errors.length){console.error('FAILED: '+errors.length+'\n'+errors.slice(0,120).join('\n'));process.exitCode=1}
else console.log('PASS: 7 × 3 diagram modes at 1280, 900, 390, 320 widths; 21 responsive compositions; no unintended text/object collisions, horizontal scrolling, or quiz regressions.');
