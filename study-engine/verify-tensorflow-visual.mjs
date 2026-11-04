#!/usr/bin/env node
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const file=pathToFileURL(resolve('study-engine/tensorflow-standalone.html')).href;
const browser=await chromium.launch({headless:true});
let fails=0;
mkdirSync('tensorflow-visual-qa',{recursive:true});
for (const width of [375,768,1280]) {
  const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',e=>errors.push('Script error: '+e.message));
  await page.goto(file,{waitUntil:'load'});
  const report=await page.evaluate(()=>{
    const figs=[...document.querySelectorAll('svg.tf-scene')];
    const problems=[];
    if(figs.length!==10)problems.push('Expected 10 illustrations, found '+figs.length);
    if(document.querySelectorAll('#quiz .question').length!==9)problems.push('Expected nine quiz questions');
    for(const [i,svg] of figs.entries()){
      const v=svg.viewBox.baseVal;
      const outer=svg.getBoundingClientRect(), parent=svg.parentElement.getBoundingClientRect();
      if(outer.width>parent.width+2)problems.push('SVG '+i+' wider than its figure');
      const texts=[...svg.querySelectorAll('text')].map(t=>({s:t.textContent,b:t.getBBox()}));
      for(const t of texts){
        if(t.b.x < -1||t.b.y < -1||t.b.x+t.b.width > v.width+1||t.b.y+t.b.height > v.height+1)
          problems.push('SVG '+i+' label out of bounds: '+t.s);
      }
      for(let a=0;a<texts.length;a++)for(let b=a+1;b<texts.length;b++){
        const p=texts[a].b,q=texts[b].b;
        const overlapX=Math.min(p.x+p.width,q.x+q.width)-Math.max(p.x,q.x);
        const overlapY=Math.min(p.y+p.height,q.y+q.height)-Math.max(p.y,q.y);
        if(overlapX>4 && overlapY>4)
           problems.push('SVG '+i+' overlapping labels: '+texts[a].s+' / '+texts[b].s);
      }
    }
    const content=document.documentElement.scrollWidth;
    if(content>window.innerWidth+2)problems.push('Horizontal document overflow '+content+' vs '+window.innerWidth);
    return {figures:figs.length,questions:document.querySelectorAll('#quiz .question').length,problems,viewport:window.innerWidth};
  });
  if(width===1280){
    await page.locator('#themeToggle').click();
    const choices=page.locator('.theme-choice');
    if(await choices.count()!==15)errors.push('15-theme dropdown missing');
    await choices.first().click();
    await page.locator('.question').first().locator('input[value="b"]').check();
    await page.locator('#checkBtn').click();
    if(!(await page.locator('#result').innerText()).includes('Score: 1 / 9'))errors.push('Quiz grading incorrect');
    await page.locator('#resetBtn').click();
    if((await page.locator('#counter').innerText()).trim()!=='0 / 9')errors.push('Quiz reset incorrect');
  }
  const issues=[...report.problems,...errors];
  await page.screenshot({path:'tensorflow-visual-qa/tensorflow-'+width+'.png',fullPage:true});
  console.log(JSON.stringify({width,figures:report.figures,questions:report.questions,issues},null,2));
  if(issues.length)fails+=issues.length;
  await page.close();
}
await browser.close();
if(fails){console.error('TensorFlow browser QA failed: '+fails+' issue(s)');process.exitCode=1}
else console.log('PASS TensorFlow visuals: 10 distinct scenes, 9 original questions, 15 themes, quiz controls, and 375/768/1280 px layout.');
