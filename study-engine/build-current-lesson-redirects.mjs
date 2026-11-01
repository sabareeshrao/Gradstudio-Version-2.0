#!/usr/bin/env node
// Create redirects in Pages output only, so old English URLs work without duplicate source HTML.
import {readFileSync,mkdirSync,writeFileSync,existsSync} from 'node:fs';
import path from 'node:path';
const site=path.resolve(process.argv[2]||'_site');
const topics=JSON.parse(readFileSync('study-engine/58_TOPIC_WHITELIST.json','utf8')).topics;
if(topics.length!==58)throw Error('Expected 58 approved topics');
const dir=path.join(site,'lessons'); mkdirSync(dir,{recursive:true});
for(const [file,url] of [...topics.slice(0,10).map(t=>[String(t.number).padStart(2,'0')+'-'+t.slug+'.html','../study-engine/?module='+t.slug]),['latest.html','../study-engine/']]){
 const output=path.join(dir,file);if(existsSync(output))throw Error('Existing alias '+file);
 const safe=url.replaceAll('&','&amp;');
 writeFileSync(output,'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url='+safe+'"><link rel="canonical" href="'+safe+'"><title>Gradstudio Study Lesson</title></head><body><p><a href="'+safe+'">Open the current lesson</a></p><script>location.replace('+JSON.stringify(url)+');</script></body></html>\n');
}
console.log('Generated 11 legacy English redirects; no duplicate HTML sources.');
