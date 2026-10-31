#!/usr/bin/env node
/** Math rendering QA for English and Telugu Gradstudio lessons. */
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const here=dirname(fileURLToPath(import.meta.url));
const read=p=>readFileSync(join(here,p),'utf8');
const modules=JSON.parse(read('modules/index.json')).modules;
const app=read('app.js'),telugu=read('../Telugu Translation/app-te.js');
const math=read('math-render.js'),core=read('core.css');
const errors=[];
function assert(b,d){if(!b)errors.push(d)}
assert(app.includes('renderMath(root)'), 'English engine must typeset after DOM injection');
assert(telugu.includes('renderMath(root)'), 'Telugu engine must typeset after DOM injection');
assert(core.includes('.math-expression'), 'Math needs shared overflow-safe styles');
assert(math.includes('tex2svgPromise'), 'Accessible SVG typesetter must be available');
assert(math.includes('readableMath'), 'Offline readable math fallback is required');
try{
  const context=vm.createContext({console});
  vm.runInContext(math.replace(/export\s+function\s+/g,'function ')+';globalThis.__fallback=readableMath;',context,{timeout:500});
  const pairs=[
    ['w_{\\text{new}} = w_{\\text{old}} - \\eta \\frac{\\partial L}{\\partial w}','η'],
    ['\\theta_{t+1} = \\theta_t - \\eta \\nabla L_i(\\theta_t)','θ']
  ];
  for(const [source,expected] of pairs){
    const fallback=context.__fallback(source);
    assert(fallback.includes(expected),'Fallback dropped '+expected+': '+fallback);
    assert(!fallback.includes('\\'),'Fallback leaked TeX: '+fallback);
    assert(fallback.includes('='),'Fallback lost equation: '+fallback);
  }
}catch(e){errors.push('Math engine syntax/fallback: '+e.message)}
let expressions=0,affected=0,unwrapped=0;
for(const {slug} of modules){
  let data;
  try{data=JSON.parse(read('modules/'+slug+'.json'))}
  catch(e){errors.push(slug+' invalid JSON: '+e.message);continue}
  let matches=0;
  for(const [qi,q] of (data.questions||[]).entries()){
    const fields=[['stem',q.stem],['explanation',q.explanation],['technicalExplanation',q.technicalExplanation],...(q.options||[]).map((s,i)=>['option'+(i+1),s])];
    for(const [field,input] of fields){
      const s=String(input||'');
      const opens=(s.match(/\\\(/g)||[]).length, closes=(s.match(/\\\)/g)||[]).length;
      const blocks=(s.match(/\\\[/g)||[]).length, ends=(s.match(/\\\]/g)||[]).length;
      if(opens!==closes)errors.push(slug+' Q'+(qi+1)+' '+field+' unmatched inline math');
      if(blocks!==ends)errors.push(slug+' Q'+(qi+1)+' '+field+' unmatched display math');
      expressions+=opens+blocks;matches+=opens+blocks;
      const outside=s.replace(/\\\((?:.|\n)*?\\\)|\\\[(?:.|\n)*?\\\]/g,'');
      if(/\\(?:frac|theta|eta|nabla|partial|sqrt|sum|sigma|alpha|beta)(?=[^a-zA-Z]|$)/.test(outside)){
        console.warn('REVIEW unwrapped TeX:',slug,'Q'+(qi+1),field);
        unwrapped++;
      }
    }
  }
  if(matches)affected++;
}
console.log('Math audit:',modules.length,'modules,',affected,'with delimited TeX,',expressions,'expressions,',unwrapped,'unwrapped warnings.');
if(errors.length){for(const e of errors)console.error('FAIL',e);process.exitCode=1}
else console.log('PASS: Math engine, readable fallback, balanced delimiters and shared CSS.');
