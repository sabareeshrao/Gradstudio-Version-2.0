import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {chromium} from "playwright";

const base="github-timestamps/petclinic";
const data=JSON.parse(readFileSync(base+"/data/history-manifest.json","utf8"));
const sources=JSON.parse(readFileSync(base+"/data/sources.json","utf8"));
assert.equal(data.mode,"upstream-git-blame-surviving-lines");
assert.equal(data.sourceSHA,"500158f732419217507c7656904b8e6aa1bcc0d6");
assert.equal(data.events.length,10580);
assert.equal(data.metrics.historyAttributedLines,8957);
assert.equal(data.metrics.sourceLines,8957);
assert.equal(data.metrics.deletionSteps,0);
assert.equal(data.files.length,132);
assert.equal(Object.keys(sources).length,118);
assert(data.metrics.realCommits>0);
for(const f of data.files){
 if(f.kind!=="text")continue;
 assert.equal(f.lineSteps.length,sources[f.path].length);
 assert.deepEqual([...f.lineSteps].sort((a,b)=>a-b),f.chronologicalSteps);
 for(let i=0;i<f.lineSteps.length;i++){
  const e=data.events[f.lineSteps[i]];
  assert.equal(e.kind,"add");
  assert.equal(e.file,f.path);
  assert.equal(e.line,i);
  assert.match(e.upstreamSHA,/^[0-9a-f]{40}$/);
 }
}
assert.equal(data.phases.reduce((n,p)=>n+p.totalLines,0),8957);
assert(data.phases.every(p=>/^[0-9a-f]{40}$/.test(p.sha)));
assert(!data.events.some(e=>["remove","strike","delete"].includes(e.kind)));
const browser=await chromium.launch({headless:true,channel:"chrome",args:["--no-sandbox"]});
try{
 const page=await browser.newPage({viewport:{width:1460,height:900}});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("http://127.0.0.1:8765/github-timestamps/petclinic/",{waitUntil:"networkidle",timeout:30000});
 await page.waitForFunction(()=>document.getElementById("topStep").textContent.includes("00001"),{timeout:20000});
 assert(!((await page.locator("#filePath").textContent())||"").includes("Data loading error"));
 assert.equal(await page.locator("#topTime").textContent(),"D01 09:00");
 assert.equal(await page.locator("#terminalStage").isVisible(),true);
 assert.equal(await page.locator("#fileCount").textContent(),"0 / 132");
 const firstAdd=data.events.findIndex(e=>e.kind==="add");
 await page.locator("#step").fill(String(firstAdd+1));
 await page.locator("#stepForm").evaluate(el=>el.requestSubmit());
 assert.equal((await page.locator("#topStep").textContent()).trim(),"Step "+String(firstAdd+1).padStart(5,"0"));
 assert.equal(await page.locator("#editor").isVisible(),true);
 assert((await page.locator("#codeLines .code-row").count())>0);
 assert.equal(await page.locator("#codeLines .code-row.active").count(),1);
 await page.locator("#wrap").click();
 assert.equal(await page.locator("#wrap").getAttribute("aria-pressed"),"false");
 await page.locator("#wrap").click();
 assert.equal(await page.locator("#wrap").getAttribute("aria-pressed"),"true");
 await page.locator("#speed").fill("7.5");
 await page.locator("#speed").dispatchEvent("change");
 assert.equal(await page.locator("#speed").inputValue(),"7.5");
 const representative=data.phases.find(p=>p.filesChanged>=2&&p.totalLines>=5) || data.phases[0];
 await page.locator("#step").fill(String(representative.toStep+1));
 await page.locator("#stepForm").evaluate(el=>el.requestSubmit());
 assert((await page.locator("#commitPosition").textContent()).includes("files"));
 await page.locator("#commitDetailsBtn").click();
 assert.equal(await page.locator("#commitDetails .commit-file").count(),representative.filesChanged);
 assert((await page.locator("#commitDetails a").getAttribute("href")).includes("github.com/spring-projects/spring-petclinic/commit/"));
 const nonzero=representative.changes.find(x=>x.added>0);
 if(nonzero){
  await page.locator("#commitDetails .commit-file").filter({hasText:nonzero.file.split("/").at(-1)}).first().click();
  assert.equal(await page.locator("#editor").isVisible(),true);
 }
 await page.locator("#step").fill(String(data.events.length));
 await page.locator("#stepForm").evaluate(el=>el.requestSubmit());
 assert((await page.locator("#topLines").textContent()).includes("8,957 / 8,957"));
 await page.locator("#prev").click();
 assert.equal((await page.locator("#topStep").textContent()).trim(),"Step 10579");
 await page.locator("#next").click();
 const middle=5000,m=data.startMinute+middle,day=Math.floor(m/1440)+1,hm=m%1440;
 await page.locator("#day").fill(String(day));
 await page.locator("#clock").fill(String(Math.floor(hm/60)).padStart(2,"0")+":"+String(hm%60).padStart(2,"0"));
 await page.locator("#jumpForm").evaluate(el=>el.requestSubmit());
 assert.equal((await page.locator("#topStep").textContent()).trim(),"Step 05001");
 await page.setViewportSize({width:390,height:844});
 await page.locator("#mobileFiles").click();
 assert.equal(await page.locator("#explorer").isVisible(),true);
 await page.locator("#mobileVeil").click({position:{x:385,y:300}});
 assert.equal(await page.locator("#explorer").isVisible(),false);
 assert.deepEqual(errors,[],"browser page errors");
 console.log("HISTORY BROWSER AUDIT PASSED: source-attributed lines, upstream SHA links, commits, timeline, mobile view");
}finally{await browser.close();}
