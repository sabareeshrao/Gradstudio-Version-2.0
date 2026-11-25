import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {readFileSync} from 'node:fs';

const base='http://127.0.0.1:8765/github-timestamps/';
const data=JSON.parse(readFileSync('github-timestamps/petclinic/data/history-manifest.json','utf8'));
const petFile=data.files.find(f=>f.kind==='text' && f.chronologicalSteps.length>=3);
assert(petFile);
const browser=await chromium.launch({headless:true});
async function jump(page,step){
  await page.locator('#step').fill(String(step));
  await page.locator('#stepForm').evaluate(el=>el.requestSubmit());
  await page.waitForFunction(n=>Number(document.getElementById('scrub').value)===n-1,step);
}
async function snapshot(page){
  return page.evaluate(()=>Object.fromEntries(
    ['topStep','topTime','topLines','filePath','commitTitle','fileCount','codeLines','filetree','play']
    .map(id=>[id,document.getElementById(id).textContent])
    .concat([['scrub',document.getElementById('scrub').value]])
  ));
}
try{
  for(const [name,path] of [['Demo',''],['RAG','rag/'],['PetClinic','petclinic/']]){
    const page=await browser.newPage({viewport:{width:1460,height:900}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+path,{waitUntil:'networkidle'});
    if(name==='PetClinic')await page.waitForFunction(()=>Number(document.getElementById('scrub').max)>1000);
    const step=name==='RAG'?35:name==='PetClinic'?petFile.chronologicalSteps[2]+1:await page.evaluate(async()=>{
      const [{makeEngine},{project}]=await Promise.all([
        import(new URL('js/engine.js',location.href).href),import(new URL('data/demo.js',location.href).href)
      ]);
      return makeEngine(project).events.find(e=>e.kind==='add'&&e.at>=2).index+1;
    });
    await jump(page,step);
    await page.locator('#editor').waitFor({state:'visible'});
    const rows=page.locator('#codeLines .code-row[data-event]');
    const index=await rows.evaluateAll((rs,n)=>rs.findIndex(r=>Number(r.dataset.event)<n-1 && r.querySelector('.code-text').textContent.trim().length>0),step);
    assert(index>=0,name+' must have a historical nonblank line');
    const row=rows.nth(index),before=await snapshot(page);
    for(const selector of ['.code-content','.line-num','.line-time']){
      await row.locator(selector).click();
      assert.deepEqual(await snapshot(page),before,name+' '+selector+' must not seek');
    }
    await row.locator('.code-text').dblclick();
    assert.deepEqual(await snapshot(page),before,name+' double-click must not seek');
    await row.locator('.code-text').evaluate(el=>{
      const range=document.createRange();range.selectNodeContents(el);
      const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
    });
    assert.deepEqual(await snapshot(page),before,name+' selection must not seek');
    await page.locator('#switchView').click();
    await page.locator('#terminalStage').waitFor({state:'visible'});
    const terminalBefore=await snapshot(page);
    await page.locator('#terminalLines .term-row .term-command').first().click();
    assert.deepEqual(await snapshot(page),terminalBefore,name+' terminal must not seek');
    await page.locator('#prev').click();
    assert.equal(Number(await page.locator('#scrub').inputValue()),step-2);
    await page.locator('#next').click();
    assert.equal(Number(await page.locator('#scrub').inputValue()),step-1);
    await page.keyboard.press('ArrowLeft');
    assert.equal(Number(await page.locator('#scrub').inputValue()),step-2);
    await jump(page,step);
    assert.deepEqual(errors,[],name+' browser errors');
    await page.close();
    console.log(name+': inspection and explicit navigation passed');
  }
}finally{await browser.close();}
