#!/usr/bin/env node
/* Produce the same logical-commit table that the PetClinic player displays. */
import {readFileSync, writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const base='github-timestamps/petclinic/';
const original=JSON.parse(readFileSync(base+'data/manifest.json','utf8'));
const sources=JSON.parse(readFileSync(base+'data/sources.json','utf8'));
const code=readFileSync(base+'logical-replay.js','utf8');
const moduleUrl='data:text/javascript;base64,'+Buffer.from(code).toString('base64');
const {createLogicalReplay}=await import(moduleUrl);
const data=createLogicalReplay(original,sources);
assert.equal(data.events.length,10580);
assert.equal(data.metrics.sourceLines,8957);
assert.equal(data.files.length,132);
assert.equal(data.metrics.deletionSteps,0);
assert.equal(data.events.filter(e=>e.kind==='add').length,8957);
assert(data.metrics.multiFileCommits>0);
assert(data.metrics.revisitedFiles>0);
for(const f of data.files){
 if(f.kind!=='text')continue;
 assert.equal(f.lineSteps.length,sources[f.path].length);
 for(let i=0;i<f.lineSteps.length;i++){
  const ev=data.events[f.lineSteps[i]];
  assert.equal(ev.kind,'add');
  assert.equal(ev.file,f.path);
  assert.equal(ev.line,i);
 }
}
assert.equal(data.phases.reduce((a,p)=>a+p.totalLines,0),8957);
const lines=[
 '# Spring PetClinic — Logical Commit Table',
 '',
 '**These are simulated teaching commits, not the original Spring PetClinic Git history.**',
 '',
 'Source revision: '+data.sourceSHA,
 '',
 'Total replay: '+data.events.length.toLocaleString()+' timed actions; '+
 data.metrics.sourceLines.toLocaleString()+' added code lines; '+data.files.length+
 ' files; '+data.phases.length+' logical commits; zero deletions.',
 '',
 'The table is sorted by added code lines (ascending). The commit links open the interactive player.',
 '',
 '| Commit | Code lines added | Files changed | Feature |',
 '|---:|---:|---:|---|'
];
for(const p of [...data.phases].sort((a,b)=>a.totalLines-b.totalLines||a.id-b.id)){
 lines.push('| [C'+String(p.id).padStart(3,'0')+'](./?commit='+p.id+') | '+p.totalLines+' | '+p.filesChanged+' | '+p.title.replaceAll('|','/')+' |');
}
lines.push('','## Audit','','- Multi-file logical commits: '+data.metrics.multiFileCommits,
 '- Files revisited in later commits: '+data.metrics.revisitedFiles,
 '- Source-code text is copied exactly from the pinned repository.',
 '- Terminal commands, write order and commit boundaries are simulated.',
 '- Individual source lines remain append-only; no removal events are scheduled.','');
writeFileSync(base+'COMMIT_TABLE.md',lines.join('\n'),'utf8');
console.log('AUDIT PASSED',JSON.stringify(data.metrics));
