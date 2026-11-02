#!/usr/bin/env node
/** Browser QA: standalone Telugu FNN learning cards, English-only diagram labels, no MCQs. */
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as pause} from 'node:timers/promises';
const port=19137;
const proc=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1'],{stdio:'ignore'});
let browser;
const issues=[];
try {
 let ok=false;
 for(let i=0;i<40;i++){
   try{const r=await fetch('http://127.0.0.1:'+port+'/study-engine/feedforward-neural-network-telugu.html');if(r.ok){ok=true;break}}catch{}
   await pause(150);
 }
 if(!ok)throw Error('Local static server unavailable');
 browser=await chromium.launch({headless:true});
 for(const width of [320,360,390,430,768,1280]){
   const page=await browser.newPage({viewport:{width,height:880},deviceScaleFactor:1});
   const pageErrors=[];
   page.on('pageerror',e=>pageErrors.push(String(e)));
   await page.goto('http://127.0.0.1:'+port+'/study-engine/feedforward-neural-network-telugu.html',{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>document.fonts.ready);
   const report=await page.evaluate(()=>{
      const root=document.documentElement;
      const diagrams=[...document.querySelectorAll('.diagram')];
      const regions=[...document.querySelectorAll('.diagram,.hero-diagram,.fnn-structure,.neuron-map,.flow-rail,.train-progress,.interview-rail,.use-case-grid')];
      return {
       width:innerWidth,pageWidth:root.scrollWidth,
       title:document.title,
       cards:document.querySelectorAll('.lesson-card').length,
       diagrams:diagrams.length,
       mcq:document.querySelectorAll('input[type="radio"],.quiz,.q-text').length,
       teluguInsideDiagrams:diagrams.filter(el=>/[ఀ-౿]/.test(el.innerText)).length,
       teluguInHero:/[ఀ-౿]/.test(document.querySelector('.hero-diagram')?.innerText||''),
       clipped:regions.map((el,i)=>({i,c:el.className,sw:el.scrollWidth,cw:el.clientWidth})).filter(x=>x.sw>x.cw+3),
       extreme:regions.map((el,i)=>({i,box:el.getBoundingClientRect()})).filter(({box})=>box.left< -3||box.right>innerWidth+3).map(x=>x.i)
      };
   });
   console.log('FNN',width,JSON.stringify(report));
   if(report.cards!==6||report.diagrams!==7||report.mcq!==0)issues.push(width+'px invalid card or diagram count');
   if(report.teluguInsideDiagrams!==0||report.teluguInHero)issues.push(width+'px Telugu appears inside an English-only diagram');
   if(report.pageWidth>width+2)issues.push(width+'px page has horizontal overflow');
   if(report.clipped.length)issues.push(width+'px clipped '+JSON.stringify(report.clipped));
   if(report.extreme.length)issues.push(width+'px diagram outside viewport '+JSON.stringify(report.extreme));
   if(pageErrors.length)issues.push(width+'px browser errors '+pageErrors.join('; '));
   await page.close();
 }
} finally { if(browser)await browser.close(); proc.kill(); }
if(issues.length){for(const issue of issues)console.error('FAIL '+issue);process.exitCode=1;}
else console.log('PASS: Telugu FNN diagrams fit phone and desktop; English labels; six visual cards; zero MCQs.');
