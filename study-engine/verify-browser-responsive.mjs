#!/usr/bin/env node
/** Real Chromium verification for no-horizontal-scrolling in Gradstudio HTML lessons. */
import {createServer} from 'node:http';
import {readFile,readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  const data=await readFile(file);
  res.setHeader('Content-Type',(type[path.extname(file)]||'application/octet-stream')+'; charset=utf-8');
  res.end(data);
 }catch(e){res.writeHead(404);res.end('Missing asset');}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const screenshots=path.join(here,'qa-artifacts','responsive');
const {mkdir}=await import('node:fs/promises');
await mkdir(screenshots,{recursive:true});
const errors=[],metrics=[];
async function inspect(slug,width,strict){
 const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
 await page.route('https://**/*',route=>route.abort());
 const url=origin+'/study-engine/?module='+slug;
 try{
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:12000});
  await page.waitForFunction(()=>document.querySelectorAll('.question').length===7,null,{timeout:8000});
  const report=await page.evaluate(()=>{
   const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0};
   const regions=[...document.querySelectorAll('.q-fig,.da-art,.da-mobile-card,.da-q6-panel,.da-mobile-process,.da-hero,.question,.container')].filter(visible);
   const bad=regions.filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>({className:String(e.className).slice(0,60),delta:e.scrollWidth-e.clientWidth})).slice(0,12);
   return {docDelta:document.documentElement.scrollWidth-window.innerWidth,
     bodyDelta:document.body.scrollWidth-window.innerWidth,
     overflow:bad,
     questions:document.querySelectorAll('.question').length,
     mobilePanels:[...document.querySelectorAll('.da-mobile-panels')].filter(visible).length,
     q6Mobile:[...document.querySelectorAll('.da-q6-mobile')].filter(visible).length
   };
  });
  metrics.push({slug,width,...report});
  if(strict){
   if(report.docDelta>1||report.bodyDelta>1||report.overflow.length)
    errors.push(slug+' '+width+'px horizontal overflow: '+JSON.stringify(report));
   if(width<=760&&(report.mobilePanels!==7||report.q6Mobile!==1))
    errors.push(slug+' '+width+'px missing vertical mobile panels: '+JSON.stringify(report));
  }else if(report.docDelta>1||report.bodyDelta>1||report.overflow.length){
   console.warn('LEGACY REVIEW: '+slug+' '+width+'px '+JSON.stringify(report));
  }
  if(slug==='data-augmentation'&&(width===390||width===320)){
   await page.screenshot({path:path.join(screenshots,'augmentation-'+width+'-top.png')});
   await page.locator('.question').nth(5).screenshot({path:path.join(screenshots,'augmentation-'+width+'-q6.png')});
  }
 }catch(e){const detail=slug+' '+width+'px unable to render: '+String(e).slice(0,280);if(strict)errors.push(detail);else console.warn('LEGACY REVIEW '+detail);}
 finally{await page.close();}
}
try{
 for(const width of [320,360,390,430,768,1280])await inspect('data-augmentation',width,true);
 const published=JSON.parse(readFileSync(path.join(here,'modules/index.json'),'utf8')).modules.map(x=>x.slug);
 for(const slug of published)await inspect(slug,390,false);
 console.log('Chromium checked '+metrics.length+' lesson/viewport combinations');
 console.log('Data Augmentation:',JSON.stringify(metrics.filter(x=>x.slug==='data-augmentation')));
 if(errors.length){errors.forEach(e=>console.error('FAIL '+e));process.exitCode=1;}
 else console.log('PASS: no horizontally scrollable Data Augmentation panels on all phone/tablet/desktop viewports');
}finally{await browser.close();await new Promise(ok=>server.close(ok));}
