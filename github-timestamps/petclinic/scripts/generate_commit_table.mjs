#!/usr/bin/env node
/* Audit pinned upstream Git-blame replay, emit an actual SHA-linked commit table. */
import assert from "node:assert/strict";
import {readFileSync,writeFileSync} from "node:fs";
const base="github-timestamps/petclinic/";
const data=JSON.parse(readFileSync(base+"data/history-manifest.json","utf8"));
const sources=JSON.parse(readFileSync(base+"data/sources.json","utf8"));
const old=JSON.parse(readFileSync(base+"data/manifest.json","utf8"));
assert.equal(data.mode,"upstream-git-blame-surviving-lines");
assert.equal(data.sourceSHA,"500158f732419217507c7656904b8e6aa1bcc0d6");
assert.equal(data.events.length,10580);
assert.equal(data.files.length,132);
assert.equal(data.metrics.sourceLines,8957);
assert.equal(data.metrics.historyAttributedLines,8957);
assert.equal(data.metrics.deletionSteps,0);
assert.equal(Object.keys(sources).length,118);
assert.equal(old.metrics.sourceLines,data.metrics.sourceLines);
const commits=data.phases;
assert(commits.length>0);
assert.equal(data.metrics.realCommits,commits.length);
let total=0,nonascending=0;
for(const f of data.files){
 if(f.kind!=="text")continue;
 const expected=sources[f.path]||[];
 assert.equal(f.lineSteps.length,expected.length,"line count "+f.path);
 assert.equal(f.chronologicalSteps.length,expected.length,"time index "+f.path);
 assert.deepEqual([...f.lineSteps].sort((a,b)=>a-b),f.chronologicalSteps);
 for(let i=0;i<f.lineSteps.length;i++){
  const step=f.lineSteps[i],ev=data.events[step];
  assert.equal(ev.kind,"add");
  assert.equal(ev.file,f.path);
  assert.equal(ev.line,i);
  assert.match(ev.upstreamSHA,/^[0-9a-f]{40}$/);
  if(i>0&&step<f.lineSteps[i-1])nonascending++;
  total++;
 }
}
assert.equal(total,8957);
assert.equal(data.events.filter(e=>e.kind==="add").length,total);
assert(!data.events.some(e=>["delete","strike","remove"].includes(e.kind)));
assert.equal(commits.reduce((sum,p)=>sum+p.totalLines,0),total);
const sorted=[...commits].sort((a,b)=>a.totalLines-b.totalLines||a.id-b.id);
const lines=[
"# Spring Petclinic — Real Git History (Surviving Source Lines)","",
"**Based on actual upstream Git commit SHAs and \`git blame\` for the pinned snapshot.**",
"These are NOT the developers' keystrokes or terminal logs. Historical deleted lines are excluded.",
"",
"Source revision: "+data.sourceSHA,
"",
"Audited: "+data.events.length.toLocaleString()+" simulated minute actions; "+
 total.toLocaleString()+" attributed surviving source lines; "+data.files.length+
 " files; "+commits.length+" real upstream commits represented; zero replay deletions.",
"",
"**Coverage:** 100% of final source lines mapped to upstream Git blame commits. "+
"This is NOT a measured percentage of actual human coding behavior.",
"",
"| Commit | Surviving lines | Files changed | Actual commit subject |",
"|---:|---:|---:|---|"
];
for(const p of sorted){
 lines.push("| [C"+String(p.id).padStart(4,"0")+"]("+p.url+") | "+p.totalLines+
 " | "+p.filesChanged+" | "+p.title.replaceAll("|","/")+" |");
}
lines.push("","## Auditing notes","",
"- Commit sequence follows the repository's upstream ancestry, not invented file-by-file commits.",
"- Files can be revisited and lines can appear out of final-file line order.",
"- Displayed per-commit counts are surviving final lines attributed by Git blame, **not all added lines in the original patch**.",
"- Intra-commit typing order, commands, clock and editor saves are reconstructed.",
"- Reordered final-line indices in the same source file: "+nonascending,"");
writeFileSync(base+"COMMIT_TABLE.md",lines.join("\n"),"utf8");
const stamp=i=>{
 const n=data.startMinute+i;
 return "D"+String(1+Math.floor(n/1440)).padStart(2,"0")+" "+
 String(Math.floor((n%1440)/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0");
};
const addedLines=data.events.flatMap((e,index)=>e.kind==="add"?[{
 step:index+1,timestamp:stamp(index),sha:e.upstreamSHA,commit:e.commit+1,
 file:e.file,line:e.line+1
}]:[]);
const detail={sourceSHA:data.sourceSHA,mode:data.mode,metrics:data.metrics,
 commits:commits.map(p=>({id:p.id,sha:p.sha,url:p.url,date:p.date,title:p.title,
  firstStep:p.fromStep+1,lastStep:p.toStep+1,survivingLines:p.totalLines,
  filesChanged:p.filesChanged,changes:p.changes})),addedLines};
assert.equal(addedLines.length,total);
writeFileSync(base+"data/history-commits.json",JSON.stringify(detail),"utf8");
console.log("HISTORY TABLE AUDIT PASSED",{commits:commits.length,survivingLines:total,
 totalSteps:data.events.length,nonascending,attributionCoverage:100});
