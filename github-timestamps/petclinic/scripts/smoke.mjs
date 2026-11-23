import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {chromium} from "playwright";

const root="github-timestamps/petclinic";
const data=JSON.parse(readFileSync(root+"/data/manifest.json","utf8"));
const sources=JSON.parse(readFileSync(root+"/data/sources.json","utf8"));
assert.equal(data.metrics.steps,10580,"expected exact audited step count");
assert.equal(data.metrics.sourceLines,8957);
assert.equal(data.metrics.files,132);
assert.equal(data.metrics.editableFiles,118);
assert.equal(data.metrics.deletionSteps,0);
assert.equal(data.events.length,10580);
assert.equal(data.files.length,132);
assert.equal(Object.keys(sources).length,118);
assert.equal(new Set(data.files.map(f=>f.path)).size,132);
assert.equal(data.events.filter(e=>e.kind==="add").length,8957);
assert.equal(data.events.some(e=>["delete","strike","remove"].includes(e.kind)),false);
for(const f of data.files){
 if(f.kind!=="text"){assert.equal(f.lineSteps.length,0);continue;}
 assert.equal(sources[f.path].length,f.totalLines,"source line mismatch: "+f.path);
 assert.equal(f.lineSteps.length,f.totalLines);
 for(let i=0;i<f.lineSteps.length;i++){
  const n=f.lineSteps[i];assert.equal(data.events[n].kind,"add");
  assert.equal(data.events[n].file,f.path);
  assert.equal(data.events[n].line,i);
  if(i>0)assert(f.lineSteps[i-1]<n);
 }
}
const browser=await chromium.launch({headless:true,channel:"chrome",args:["--no-sandbox"]});
try{
 const page=await browser.newPage({viewport:{width:1460,height:900}});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("http://127.0.0.1:8765/github-timestamps/petclinic/",{waitUntil:"networkidle",timeout:30000});
 await page.waitForFunction(()=>document.getElementById("topStep").textContent.includes("00001"),{timeout:15000});
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
 await page.locator("#wrap").click();assert.equal(await page.locator("#wrap").getAttribute("aria-pressed"),"false");
 await page.locator("#wrap").click();assert.equal(await page.locator("#wrap").getAttribute("aria-pressed"),"true");
 await page.locator("#speed").fill("7.5");await page.locator("#speed").dispatchEvent("change");
 assert.equal(await page.locator("#speed").inputValue(),"7.5");
 await page.locator("#step").fill(String(data.events.length));
 await page.locator("#stepForm").evaluate(el=>el.requestSubmit());
 assert((await page.locator("#topLines").textContent()).includes("8,957 / 8,957"));
 assert.equal(await page.locator("#terminalStage").isVisible(),true);
 await page.locator("#prev").click();
 assert.equal((await page.locator("#topStep").textContent()).trim(),"Step "+String(data.events.length-1).padStart(5,"0"));
 await page.locator("#next").click();
 const middle=5000,m=data.startMinute+middle,day=Math.floor(m/1440)+1,hm=m%1440;
 await page.locator("#day").fill(String(day));
 await page.locator("#clock").fill(String(Math.floor(hm/60)).padStart(2,"0")+":"+String(hm%60).padStart(2,"0"));
 await page.locator("#jumpForm").evaluate(el=>el.requestSubmit());
 assert.equal((await page.locator("#topStep").textContent()).trim(),"Step "+String(middle+1).padStart(5,"0"));
 await page.setViewportSize({width:390,height:844});
 await page.locator("#mobileFiles").click();
 assert.equal(await page.locator("#explorer").isVisible(),true);
 await page.locator("#mobileVeil").click({position:{x:385,y:300}});
 assert.equal(await page.locator("#explorer").isVisible(),false);
 assert.deepEqual(errors,[],"browser page errors");
 console.log("BROWSER AUDIT PASSED: 10,580 steps, source line fidelity, navigation, wraps, speed, terminal, time jump, mobile sidebar");
} finally {await browser.close();}
