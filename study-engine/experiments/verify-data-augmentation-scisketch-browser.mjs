#!/usr/bin/env node
/** Blocking Chromium check of enhanced Data Augmentation layouts. */
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {setTimeout as sleep} from 'node:timers/promises';
const PORT=19071,OUT='study-engine/experiments/qa-data-augmentation-scisketch';
mkdirSync(OUT,{recursive:true});
const server=spawn('python3',['-m','http.server',String(PORT),'--bind','127.0.0.1'],{stdio:'ignore'});
const issues=[];
let browser;
try{
 let ready=false;
 for(let i=0;i<40;i++){
   try{const r=await fetch('http://127.0.0.1:'+PORT+'/study-engine/index.html');if(r.ok){ready=true;break}}catch{}
   await sleep(200);
 }
 if(!ready)throw Error('Static server unavailable');
 browser=await chromium.launch({headless:true});
 for(const width of [1280,900,390,320]){
   const page=await browser.newPage({viewport:{width,height:860},deviceScaleFactor:1});
   const pageErrors=[];page.on('pageerror',e=>pageErrors.push(String(e)));
   await page.goto('http://127.0.0.1:'+PORT+'/study-engine/?module=data-augmentation-scisketch',{waitUntil:'domcontentloaded'});
   await page.locator('.ds-card').first().waitFor({timeout:30000});
   await page.evaluate(()=>document.fonts.ready);
   await sleep(240);
   const initial=await page.evaluate(()=>({
     cards:document.querySelectorAll('.ds-card').length,
     inputs:document.querySelectorAll('#quiz input[type="radio"]').length,
     scenes:document.querySelectorAll('[data-ds-diagram]').length,
     viewport:innerWidth,
     pageWidth:document.documentElement.scrollWidth
   }));
   console.log('VIEWPORT',width,JSON.stringify(initial));
   if(initial.cards!==7||initial.inputs!==28||initial.scenes!==7)issues.push(width+': missing cards/options/diagrams');
   if(initial.pageWidth>width+2)issues.push(width+': page horizontal overflow');
   for(let q=1;q<=7;q++){
    const card=page.locator('.ds-card').nth(q-1);
    for(const mode of ['new','original','both']){
     await card.locator('.ds-select').selectOption(mode);
     await sleep(55);
     const state=await page.evaluate(({q,mode})=>{
       const card=[...document.querySelectorAll('.ds-card')][q-1];
       const panes=[...card.querySelectorAll('.ds-pane')];
       const visible=panes.filter(p=>getComputedStyle(p).display!=='none');
       const expected=mode==='both'?2:1;
       const errors=[];
       if(visible.length!==expected)errors.push('wrong visible pane count '+visible.length);
       if(mode!=='both'&&visible[0]?.dataset.variant!==(mode==='new'?'new':'original'))errors.push('wrong visible mode');
       if(document.documentElement.scrollWidth>innerWidth+2)errors.push('page horizontal overflow after switching');
       if(document.querySelectorAll('#quiz input[type="radio"]').length!==28)errors.push('quiz input count changed');
       for(const pane of visible){
         const b=pane.getBoundingClientRect();
         if(b.width<1||b.right>document.documentElement.clientWidth+5||b.left < -5)errors.push('pane out of page bounds');
         if(pane.scrollWidth>pane.clientWidth+3)errors.push('pane internally overflows '+pane.scrollWidth+'/'+pane.clientWidth);
       }
       if(mode==='new'||mode==='both'){
        const enhanced=card.querySelector('[data-variant="new"]');
        const whole=enhanced.querySelector('.ds-design').getBoundingClientRect();
        const zones=[...enhanced.querySelectorAll('[data-ds-zone]')];
        const hit=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2;
        for(let i=0;i<zones.length;i++){
          const a=zones[i],box=a.getBoundingClientRect();
          if(box.right>whole.right+2||box.left<whole.left-2)errors.push('zone outside canvas '+i);
          if(a.scrollWidth>a.clientWidth+2)errors.push('zone text/visual overflow '+i);
          for(let k=i+1;k<zones.length;k++)if(hit(box,zones[k].getBoundingClientRect()))errors.push('panels collide '+i+'/'+k);
          const title=a.querySelector('.ds-panel-title')?.getBoundingClientRect();
          const desc=a.querySelector('.ds-panel-sub')?.getBoundingClientRect();
          if(title&&desc&&hit(title,desc))errors.push('title overlaps subtitle in '+i);
          for(const svg of a.querySelectorAll('svg')){
           const s=svg.getBoundingClientRect();
           if(s.left<box.left-3||s.right>box.right+3)errors.push('vector outside its zone');
          }
        }
        if(enhanced.querySelectorAll('svg text').length)errors.push('positioned SVG captions found');
       }
       return {errors,visible:visible.length,panes:panes.length};
     },{q,mode});
     issues.push(...state.errors.map(x=>width+' Q'+q+' '+mode+': '+x));
     if((width===390||width===1280)&&[1,3,6,7].includes(q)&&mode==='new')
        await card.screenshot({path:OUT+'/q'+q+'-'+width+'.png'});
    }
    await card.locator('.ds-select').selectOption('new');
   }
   issues.push(...pageErrors.map(e=>width+': JS '+e));
   console.log('COMPLETE',width,'7 diagrams x 3 comparison modes; issues '+issues.length);
   await page.close();
 }
}finally{if(browser)await browser.close();server.kill('SIGTERM')}
if(issues.length){console.error('FAIL '+issues.length+'\n'+issues.slice(0,120).join('\n'));process.exitCode=1}
else console.log('PASS 7 SciSketch diagrams x 3 modes x 4 viewports (320,390,900,1280), no collision/overflow, all 28 answer inputs preserved.');
