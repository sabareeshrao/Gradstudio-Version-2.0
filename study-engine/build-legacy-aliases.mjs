#!/usr/bin/env node
/** Generate redirects ONLY in the published _site output.
 * Source tree lessons/ contains current HTML entrypoints only.
 * Historical root URLs remain complete HTML copies of archived originals. */
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const site=path.resolve(process.argv[2]||'_site');
const mapping=JSON.parse(readFileSync('archive/legacy-lessons/redirect-map.json','utf8'));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let n=0;
for(const {from,to} of mapping.files){
 if(!from.startsWith('lessons/')||!to.startsWith('archive/legacy-lessons/'))throw Error('Unexpected legacy mapping: '+from);
 if(!existsSync(path.join(site,to)))throw Error('Missing archived source: '+to);
 const target=path.join(site,from);
 if(existsSync(target))throw Error('Redirect would overwrite an active lesson: '+from);
 const relative=path.posix.relative(path.posix.dirname(from),to);
 mkdirSync(path.dirname(target),{recursive:true});
 writeFileSync(target, '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url='+esc(relative)+'"><title>Archived Gradstudio Lesson</title></head><body><p>This older lesson has moved to <a href="'+esc(relative)+'">the archive</a>.</p><script>location.replace(new URL('+JSON.stringify(relative)+',location.href));</script></body></html>\n');
 n++;
}
console.log('Created '+n+' historical nested lesson redirects.');
