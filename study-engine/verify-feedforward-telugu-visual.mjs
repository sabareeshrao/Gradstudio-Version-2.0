#!/usr/bin/env node
/** Browser QA for English-only Feedforward technical diagram atlas. */
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as pause} from 'node:timers/promises';
const port=19137,server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1'],{stdio:'ignore'});
let browser;const issues=[];
try {
 let ready=false;
 for(let i=0;i<40;i++){
  try{if((await fetch('http://127.0.0.1:'+port+'/study-engine/feedforward-neural-network-telugu.html')).ok){ready=true;break}}catch{}
  await pause(150);
 }
 if(!ready)throw Error('Local static server unavailable');
 browser=await chromium.launch({headless:true});
 for(const width of [320,360,390,430,768,1280]){
  const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
  const pageErrors=[];page.on('pageerror',e=>pageErrors.push(String(e)));
  await page.goto('http://127.0.0.1:'+port+'/study-engine/feedforward-neural-network-telugu.html',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  const result=await page.evaluate(()=>{
   const sel=['.plate','.art','.art>svg','.use-grid','.use-card','.use-card svg'];
   const areas=[...document.querySelectorAll(sel.join(','))];
   const fig=[...document.querySelectorAll('.plate .art')];
   const boxes=areas.map((el,i)=>({i,tag:el.tagName,cls:el.getAttribute('class'),box:el.getBoundingClientRect(),scroll:el.scrollWidth,client:el.clientWidth}));
   return {
    width:innerWidth,pageWidth:document.documentElement.scrollWidth,
    lang:document.documentElement.lang,
    cards:document.querySelectorAll('.plate').length,
    illustrated:fig.filter(el=>el.querySelector('svg')).length,
    quiz:document.querySelectorAll('input,textarea,.quiz,.q-text,.english-answer,.explanation,button').length,
    paragraphs:document.querySelectorAll('main p,blockquote').length,
    telugu:/[ఀ-౿]/.test(document.body.innerText),
    visualText:document.querySelectorAll('[data-art="neuron"] svg text').length,
    accessibility:[...document.querySelectorAll('.art svg')].every(s=>s.hasAttribute('role')&&s.hasAttribute('aria-label')),
    clipped:boxes.filter(o=>o.scroll>o.client+3).map(o=>({i:o.i,cls:o.cls,width:o.scroll,avail:o.client})),
    out:boxes.filter(o=>o.box.left< -2||o.box.right>innerWidth+2).map(o=>({i:o.i,cls:o.cls,left:Math.round(o.box.left),right:Math.round(o.box.right)})),
   };
  });
  console.log('FNN_ATLAS',width,JSON.stringify(result));
  if(result.lang!=='en'||result.cards!==7||result.illustrated!==7)issues.push(width+'px expected seven English diagram cards');
  if(result.quiz||result.paragraphs||result.telugu)issues.push(width+'px unwanted prose, Telugu, input controls or interview answer');
  if(result.visualText<4||!result.accessibility)issues.push(width+'px missing technical figures/accessibility');
  if(result.pageWidth>width+2||result.clipped.length||result.out.length)issues.push(width+'px overflow '+JSON.stringify({page:result.pageWidth,clipped:result.clipped,out:result.out}));
  if(pageErrors.length)issues.push(width+'px JavaScript errors '+pageErrors.join(' | '));
  await page.close();
 }
} finally {if(browser)await browser.close();server.kill();}
if(issues.length){for(const e of issues)console.error('FAIL '+e);process.exitCode=1;}
else console.log('PASS: seven English-only technical diagram cards across six screen widths; no prose, interview script or MCQs.');
