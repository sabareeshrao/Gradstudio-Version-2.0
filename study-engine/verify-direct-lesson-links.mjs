#!/usr/bin/env node
/**
 * Gradstudio route integrity check.
 * Direct ?module=... links must load their JSON without consulting a cached
 * module registry. The registry remains the source for the library listing.
 */
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {resolve, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=dirname(fileURLToPath(import.meta.url));
const app=readFileSync(join(root,'app.js'),'utf8');
const index=JSON.parse(readFileSync(join(root,'modules/index.json'),'utf8'));
let failures=0;
function fail(message){console.error('FAIL route integrity: '+message);failures++}

const libraryBranch=app.indexOf('if(!slug){');
const manifestFetch=app.indexOf("const manifest=await getJSON(new URL('modules/index.json',base));");
const lessonPath=app.indexOf("const lessonPath=(slug===");
const lessonFetch=app.indexOf('const data=await getJSON(new URL(lessonPath,base));');
if(libraryBranch<0||manifestFetch<libraryBranch||lessonPath<manifestFetch||lessonFetch<lessonPath)
  fail('The library or direct-lesson fetch path is missing or rearranged');
if(app.includes('manifest.modules.some('))
  fail('Direct lesson links must not be blocked by a stale module index');
if(!app.includes("if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))"))
  fail('Direct routes must validate module slugs before requesting JSON');
if(!Array.isArray(index.modules)||!index.modules.length)
  fail('Study library index is empty or invalid');

const registered=new Set();
for(const m of index.modules||[]){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(m.slug)){fail('Invalid slug: '+m.slug);continue}
  if(registered.has(m.slug))fail('Duplicate slug: '+m.slug);
  registered.add(m.slug);
  const location=join(root,'modules',m.slug+'.json');
  if(!existsSync(location)){fail('Missing module JSON for '+m.slug);continue}
  try{
    const module=JSON.parse(readFileSync(location,'utf8'));
    if(module.questions?.length!==7)fail(m.slug+' must contain seven questions');
    if(!module.title)fail('Missing module title for '+m.slug);
    if(module.diagramStyle){
      const stylesheet=resolve(root,String(module.diagramStyle).split(/[?#]/)[0]);
      if(!stylesheet.startsWith(root+'/')||!existsSync(stylesheet))
        fail('Missing or invalid diagram stylesheet for '+m.slug);
    }
  }catch(e){fail('Invalid module JSON '+m.slug+': '+e.message)}
}
const filenames=readdirSync(join(root,'modules')).filter(name=>name.endsWith('.json')&&name!=='index.json');
for(const filename of filenames){
  const slug=filename.slice(0,-5);
  if(!registered.has(slug))fail('Module JSON missing from library index: '+slug);
}
// Validate all bilingual directory URLs against the exact registered English module slugs.
const bilingualPath=resolve(root,'../Telugu Translation/ALL_TELUGU_HTML_LINKS.md');
if(!existsSync(bilingualPath)){
  fail('Bilingual links directory is missing');
}else{
  const directory=readFileSync(bilingualPath,'utf8');
  const rows=directory.split(/\\r?\\n/).filter(line=>/^\\|\\s*\\d{2}\\s*\\|/.test(line));
  if(rows.length!==index.modules.length)fail('Bilingual link rows mismatch registered module count: '+rows.length);
  const prefix='https://sabareeshrao.github.io/Gradstudio-Version-2.0';
  for(let i=0;i<rows.length;i++){
    const cells=rows[i].split('|').slice(1,-1).map(s=>s.trim());
    const number=Number(cells[0]);
    const module=index.modules[i];
    if(!module||number!==i+1){fail('Bilingual directory row numbering differs from registry at '+(i+1));continue}
    const link=cells[3]?.match(/^\\[Open English\\]\\((https?:\\/\\/[^)]+)\\)$/);
    const expected=prefix+'/study-engine/?module='+module.slug;
    if(!link||link[1]!==expected)fail('English link must use canonical study-engine route at row '+number+' ('+module.slug+')');
    if(i<50){
      const telugu=cells[2]?.match(/^\\[Open Telugu\\]\\((https?:\\/\\/[^)]+)\\)$/);
      const file=String(number).padStart(2,'0')+'-'+module.slug+'.html';
      const teluguExpected=prefix+'/Telugu%20Translation/'+file;
      if(!telugu||telugu[1]!==teluguExpected||!existsSync(resolve(root,'../Telugu Translation',file)))
        fail('Missing or invalid Telugu HTML link at row '+number);
    }else if(cells[2])fail('Unpublished Telugu translation linked at row '+number);
  }
}

console.log('Verified '+registered.size+' direct lesson URLs and module JSON files; '+failures+' blocking errors.');
if(failures)process.exitCode=1;
