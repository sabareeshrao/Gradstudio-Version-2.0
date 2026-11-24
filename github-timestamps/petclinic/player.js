import {createLogicalReplay} from './logical-replay.js';
/* Pinned Spring PetClinic logical-build player. No historical deletions.
   Original code is real, but typing, terminal commands and checkpoints are simulated. */
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const folderIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2.5 7h6l2 2h11v10h-19z"/></svg>';
const fileIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 2h10l5 5v15H5zM15 2v5h5M8 12h8M8 16h8"/></svg>';
const pad=n=>String(n).padStart(2,"0");
function upperBound(a,x){let lo=0,hi=a.length;while(lo<hi){const mid=(lo+hi)>>>1;if(a[mid]<=x)lo=mid+1;else hi=mid;}return lo;}
function syntax(line){
  const token=/(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|@[A-Za-z_$][\w$]*|<\/?[\w:-]+|\b(?:package|import|public|protected|private|static|final|abstract|class|interface|enum|record|extends|implements|new|return|if|else|for|while|switch|case|throw|throws|try|catch|finally|void|int|long|short|double|float|boolean|char|null|true|false|var|this|super)\b)/gm;
  let html="",offset=0;for(const m of line.matchAll(token)){html+=esc(line.slice(offset,m.index));const w=m[0],css=w.startsWith("//")?"cm":w.startsWith('"')||w.startsWith("'")?"str":w.startsWith("@")?"ann":w.startsWith("<")?"tag":"kw";html+='<span class="'+css+'">'+esc(w)+'</span>';offset=m.index+w.length;}return html+esc(line.slice(offset));
}
async function load(){
 const urls=["./data/manifest.json","./data/sources.json"];
 const response=await Promise.all(urls.map(u=>fetch(u,{cache:"no-cache"})));
 if(response.some(r=>!r.ok))throw Error("Data has not been published yet; missing "+urls[response.findIndex(r=>!r.ok)]);
 const [data,sources]=await Promise.all(response.map(r=>r.json()));
 if(data.sourceSHA!=="500158f732419217507c7656904b8e6aa1bcc0d6"||
    data.metrics.steps!==data.events.length||data.metrics.sourceLines!==8957||
    data.metrics.deletionSteps!==0||data.events.length<10000||data.events.length>11000)throw Error("Source audit failed: cannot play incomplete data.");
 if(data.files.length!==132||Object.keys(sources).length!==118)throw Error("File inventory audit failed.");
 return {data,sources};
}
try {
 const {data:original,sources}=await load();
 const data=createLogicalReplay(original,sources);
 const files=data.files,events=data.events,phases=data.phases;
 const fileByPath=new Map(files.map(f=>[f.path,f]));
 const terminalSteps=events.flatMap((e,i)=>e.kind==="terminal"?[i]:[]);
 const state={step:0,file:null,playing:false,speed:4,wrap:true,only:false,override:null,
              closed:new Set(),search:"",sidebar:true};
 const stamp=i=>{let m=data.startMinute+i;const day=Math.floor(m/1440)+1;m%=1440;return "D"+pad(day)+" "+pad(Math.floor(m/60))+":"+pad(m%60);};
 const dayTime=i=>{const m=data.startMinute+i;return {day:Math.floor(m/1440)+1,time:pad(Math.floor((m%1440)/60))+":"+pad(m%60)};};
 let frame=0,prevT=0,fraction=0,toastTimer=0;
 const current=()=>events[state.step];
 function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2500);}
 function visibleFiles(){return files.filter(f=>f.createdAt<=state.step);}
 function lineCount(f){return upperBound(f.lineSteps,state.step);}
 function writtenTotal(){let n=0;for(const f of files)if(f.kind==="text"&&f.createdAt<=state.step)n+=lineCount(f);return n;}
 function stop(){state.playing=false;cancelAnimationFrame(frame);frame=0;prevT=0;fraction=0;}
 function seek(value){
   if(!Number.isFinite(Number(value)))return;
   const n=Math.max(0,Math.min(events.length-1,Math.floor(Number(value))));
   state.step=n;const e=current();
   if(e.file&&fileByPath.has(e.file))state.file=e.file;
   if(state.file&&fileByPath.get(state.file).createdAt>n)state.file=null;
   if(!state.file)state.file=visibleFiles().at(-1)?.path||null;
   state.override=null;if(n===events.length-1)stop();render();
 }
 function tick(t){if(!state.playing)return;if(prevT){fraction+=Math.min(t-prevT,1000)*state.speed/1000;const whole=Math.floor(fraction);if(whole){fraction-=whole;seek(state.step+whole);}}prevT=t;if(state.playing)frame=requestAnimationFrame(tick);}
 function play(){if(state.playing){stop();renderToolbar();return;}if(state.step===events.length-1)seek(0);state.playing=true;prevT=0;fraction=0;frame=requestAnimationFrame(tick);renderToolbar();}
 function buildTree(list){const root={type:"dir",path:"",children:new Map()};for(const f of list){const parts=f.path.split("/");let parent=root;for(let i=0;i<parts.length;i++){const name=parts[i];if(!parent.children.has(name))parent.children.set(name,{name,path:parts.slice(0,i+1).join("/"),type:i===parts.length-1?"file":"dir",children:new Map()});parent=parent.children.get(name);}}return root;}
 function renderTree(){
   const root=buildTree(visibleFiles()),filter=state.search.toLowerCase();
   const sorted=n=>[...n.children.values()].sort((a,b)=>a.type===b.type?a.name.localeCompare(b.name):a.type==="dir"?-1:1);
   const matches=n=>!filter||(n.type==="file"&&n.name.toLowerCase().includes(filter))||sorted(n).some(matches);
   function draw(n,depth){
     if(!matches(n))return "";const indent=7+depth*14;
     if(n.type==="file")return '<button class="tree-node '+(state.file===n.path?"active":"")+'" data-file="'+esc(n.path)+'" style="--indent:'+indent+'px" title="'+esc(n.path)+'"><span class="caret"></span><span class="node-icon">'+fileIcon+'</span><span class="node-title">'+esc(n.name)+'</span></button>';
     const opened=!!filter||!state.closed.has(n.path);
     return '<button class="tree-node" data-dir="'+esc(n.path)+'" style="--indent:'+indent+'px" title="'+esc(n.path)+'" aria-expanded="'+opened+'"><span class="caret">'+(opened?"⌄":"›")+'</span><span class="node-icon">'+folderIcon+'</span><span class="node-title">'+esc(n.name)+'</span></button>'+(opened?sorted(n).map(x=>draw(x,depth+1)).join(""):"");
   }
   $("filetree").innerHTML=sorted(root).map(x=>draw(x,0)).join("")||'<div class="tree-empty">The developer has not created any files yet.</div>';
   $("fileCount").textContent=visibleFiles().length+" / "+files.length;
 }
 function renderCode(){
   $("filePath").textContent=state.file||"Spring PetClinic";
   const meta=fileByPath.get(state.file);if(!meta){$("codeLines").innerHTML='<div class="empty-file">Project initialization happens in the terminal.</div>';return;}
   if(meta.kind!=="text"){$("codeLines").innerHTML='<div class="empty-file">This is an imported or generated asset, not handwritten source code.</div>';return;}
   const upto=lineCount(meta),all=sources[meta.path];
   if(upto===0){$("codeLines").innerHTML='<div class="empty-file">The file exists. Its code has not been written yet.</div>';return;}
   const e=current(),saved=e.kind==="save"&&e.file===meta.path;
   let output="";
   for(let i=0;i<upto;i++){
     const n=meta.lineSteps[i],active=n===state.step||(saved&&i===upto-1);
     if(state.only&&!active)continue;
     const text=all[i],leading=(text.match(/^[ \t]*/)||[""])[0];
     const indent=[...leading].reduce((v,c)=>c==="\t"?v+(4-v%4):v+1,0);
     const content=text.slice(leading.length);
     output+='<div class="code-row '+(active?"active "+(saved?"saved":"added"):"")+'" data-event="'+n+'"><span class="line-num">'+(i+1)+'</span><span class="line-time">'+stamp(n)+'</span><div class="code-content"><code class="code-text" style="--indent:'+Math.min(80,indent)+'">'+(content?syntax(content):"&nbsp;")+'</code></div></div>';
   }
   $("codeLines").innerHTML=output||'<div class="empty-file">No matching selected line in this file.</div>';
   const active=$("codeLines").querySelector(".code-row.active");if(active&&(!state.lastFile||state.lastFile===state.file))active.scrollIntoView({block:"nearest"});
   state.lastFile=state.file;
 }
 function renderTerminal(){
   const end=upperBound(terminalSteps,state.step),subset=terminalSteps.slice(Math.max(0,end-65),end);
   $("terminalStats").textContent=end+" shell actions";
   $("terminalLines").innerHTML=subset.map(idx=>{const e=events[idx];return '<div class="term-row '+(idx===state.step?"active":"")+'" data-event="'+idx+'"><span class="term-time">'+stamp(idx)+'</span><div class="term-command"><span class="prompt">dev@petclinic:~$</span> '+esc(e.command)+(e.output?'<div class="shell-output">'+esc(e.output)+'</div>':"")+'</div></div>';}).join("");
   if(!$("terminalStage").hidden){const x=$("terminalScroll");x.scrollTop=x.scrollHeight;}
 }
 function renderToolbar(){
   const e=current(),tm=dayTime(state.step),phase=Number.isInteger(e.commit)?phases[e.commit]:null;
   $("topTime").textContent=stamp(state.step);$("topStep").textContent="Step "+String(state.step+1).padStart(5,"0");
   $("topLines").textContent=writtenTotal().toLocaleString()+" / "+data.metrics.sourceLines.toLocaleString()+" lines";
   $("day").value=tm.day;$("clock").value=tm.time;
   if(document.activeElement!==$("step"))$("step").value=state.step+1;
   $("scrub").value=state.step;
   $("play").textContent=state.playing?"Ⅱ Pause":"▶ Play";
   $("first").disabled=$("prev").disabled=state.step===0;$("next").disabled=state.step===events.length-1;
   $("commitTitle").textContent=phase?"C"+String(phase.id).padStart(3,"0")+" · "+phase.title:(e.label||"Project initialization");
   $("commitMode").textContent=e.kind==="save"?"Editor save":phase?.mode||"Terminal setup";
   $("commitPosition").textContent=phase?"+"+phase.totalLines+" lines · "+phase.filesChanged+" files":"Setup";
   $("prevCommit").disabled=!phase||phase.id<=1;$("nextCommit").disabled=!phase||phase.id>=phases.length;
   $("commitDetailsBtn").disabled=!phase;
   if(!$("commitDetails").hidden)renderCommitDetails(phase);
   const term=state.override===null?e.kind==="terminal":state.override;
   $("terminalStage").hidden=!term;$("editor").hidden=term;
   $("switchView").textContent=term?"Code":"Terminal";
 }
 function renderCommitDetails(phase){
   if(!phase){$("commitDetails").hidden=true;return;}
   const rows=phase.changes.map(x=>'<button class="commit-file" data-commit-file="'+esc(x.file)+'"><span>'+esc(x.file)+'</span><b>+'+x.added+'</b></button>').join("");
   $("commitDetails").innerHTML='<div class="commit-detail-head"><b>C'+String(phase.id).padStart(3,"0")+" · "+esc(phase.title)+'</b><button id="commitClose" class="square" aria-label="Close details">×</button></div><div class="commit-detail-list">'+rows+'</div><div class="commit-detail-foot">+'+phase.totalLines+' code lines · '+phase.filesChanged+' files · simulated Git commit</div>';
 }
 function navigateCommit(offset){
   const e=current(),id=Number.isInteger(e.commit)?e.commit:0;
   const p=phases[Math.max(0,Math.min(phases.length-1,id+offset))];
   if(p){stop();seek(p.toStep);$("commitDetails").hidden=false;renderCommitDetails(p);}
 }
 function render(){renderToolbar();renderTree();renderCode();renderTerminal();}
 function source(){const meta=fileByPath.get(state.file);return meta?.kind==="text"?(sources[meta.path]||[]).slice(0,lineCount(meta)).join("\n"):"";}
 function downloadText(s,name){const url=URL.createObjectURL(new Blob([s],{type:"text/plain;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function sidebar(open){if(matchMedia("(max-width:790px)").matches){$("explorer").classList.toggle("open",open);$("mobileVeil").classList.toggle("visible",open);}else{$("layout").classList.toggle("sidebar-hidden",!open);$("revealSidebar").hidden=open;}}
 $("first").addEventListener("click",()=>{stop();seek(0);});$("prev").addEventListener("click",()=>{stop();seek(state.step-1);});
 $("next").addEventListener("click",()=>{stop();seek(state.step+1);});$("play").addEventListener("click",play);
 $("scrub").max=events.length-1;$("rangeStart").textContent=stamp(0);$("rangeEnd").textContent=stamp(events.length-1);
 $("step").max=events.length;
 $("scrub").addEventListener("input",e=>{stop();seek(+e.target.value);});
 $("stepForm").addEventListener("submit",e=>{e.preventDefault();const v=Number($("step").value);if(!Number.isInteger(v)||v<1||v>events.length){toast("Step must be between 1 and "+events.length.toLocaleString());return;}stop();seek(v-1);});
 $("jumpForm").addEventListener("submit",e=>{e.preventDefault();const day=Number($("day").value),t=$("clock").value.trim();if(!Number.isInteger(day)||day<1||!/^([01]\d|2[0-3]):[0-5]\d$/.test(t)){toast("Enter a valid D number and 24-hour HH:MM");return;}const [h,m]=t.split(":").map(Number),i=(day-1)*1440+h*60+m-data.startMinute;if(i<0||i>=events.length){toast("Outside the replay time range");return;}stop();seek(i);});
 $("speed").addEventListener("change",e=>{const v=Number(e.target.value);if(!Number.isFinite(v)||v<=0){e.target.value=state.speed;toast("Speed must be a positive number");return;}state.speed=v;});
 $("wrap").addEventListener("click",()=>{state.wrap=!state.wrap;$("editorViewport").classList.toggle("wrapped",state.wrap);$("wrap").classList.toggle("wrap-active",state.wrap);$("wrap").setAttribute("aria-pressed",String(state.wrap));renderCode();});
 $("onlySelected").addEventListener("change",e=>{state.only=e.target.checked;renderCode();});
 $("switchView").addEventListener("click",()=>{state.override=$("terminalStage").hidden;renderToolbar();renderTerminal();});
 $("copy").addEventListener("click",async()=>{const text=source();if(!text){toast("No source visible for this step");return;}try{await navigator.clipboard.writeText(text);toast("Visible source copied");}catch{toast("Clipboard unavailable; try Download");}});
 $("download").addEventListener("click",()=>{const text=source();if(!text){toast("No source visible");return;}downloadText(text,state.file.split("/").at(-1));});
 $("filetree").addEventListener("click",e=>{const btn=e.target.closest("button");if(!btn)return;if(btn.dataset.dir!==undefined){const p=btn.dataset.dir;if(state.closed.has(p))state.closed.delete(p);else state.closed.add(p);renderTree();}else if(btn.dataset.file){state.file=btn.dataset.file;state.override=false;render();if(matchMedia("(max-width:790px)").matches)sidebar(false);}});
 $("codeLines").addEventListener("click",e=>{const row=e.target.closest("[data-event]");if(row){stop();seek(Number(row.dataset.event));}});
 $("terminalLines").addEventListener("click",e=>{const row=e.target.closest("[data-event]");if(row){stop();seek(Number(row.dataset.event));}});
 $("searchToggle").addEventListener("click",()=>{$("searchRow").hidden=!$("searchRow").hidden;if(!$("searchRow").hidden)$("fileSearch").focus();});
 $("fileSearch").addEventListener("input",e=>{state.search=e.target.value;renderTree();});
 $("wideSidebar").addEventListener("click",()=>{const w=$("explorer").getBoundingClientRect().width;$("layout").style.setProperty("--sidebar",w<380?"470px":"254px");});
 $("hideSidebar").addEventListener("click",()=>sidebar(false));$("revealSidebar").addEventListener("click",()=>sidebar(true));
 $("mobileFiles").addEventListener("click",()=>sidebar(true));$("mobileVeil").addEventListener("click",()=>sidebar(false));
 function resize(element,axis){
   let start=0,initial=0;
   element.addEventListener("pointerdown",e=>{if(e.button!==0)return;start=axis==="x"?e.clientX:e.clientY;initial=axis==="x"?$("explorer").getBoundingClientRect().width:$("terminalPanel").getBoundingClientRect().height;element.setPointerCapture(e.pointerId);element.classList.add("dragging");e.preventDefault();});
   element.addEventListener("pointermove",e=>{if(!element.hasPointerCapture(e.pointerId))return;const v=initial+(axis==="x"?e.clientX:e.clientY)-start;const clamped=Math.max(axis==="x"?150:90,Math.min(axis==="x"?680:$("terminalStage").clientHeight,v));if(axis==="x")$("layout").style.setProperty("--sidebar",clamped+"px");else $("terminalPanel").style.height=clamped+"px";});
   element.addEventListener("pointerup",e=>{if(element.hasPointerCapture(e.pointerId))element.releasePointerCapture(e.pointerId);element.classList.remove("dragging");});
   element.addEventListener("dblclick",()=>{if(axis==="x")$("layout").style.removeProperty("--sidebar");else $("terminalPanel").style.height="25%";});
 }
 resize($("sidebarGrip"),"x");resize($("terminalResize"),"y");
 $("maximizeTerminal").addEventListener("click",()=>$("terminalPanel").classList.toggle("maximized"));
 $("prevCommit").addEventListener("click",()=>navigateCommit(-1));
 $("nextCommit").addEventListener("click",()=>navigateCommit(1));
 $("commitDetailsBtn").addEventListener("click",()=>{const p=phases[current().commit??0];$("commitDetails").hidden=!$("commitDetails").hidden;if(!$("commitDetails").hidden)renderCommitDetails(p);});
 $("commitDetails").addEventListener("click",e=>{
   if(e.target.closest("#commitClose")){$("commitDetails").hidden=true;return;}
   const btn=e.target.closest("[data-commit-file]");if(!btn)return;
   const p=phases[current().commit??0];if(!p)return;
   const last=events.findLastIndex((ev,i)=>i>=p.fromStep&&i<=p.toStep&&ev.kind==="add"&&ev.file===btn.dataset.commitFile);
   if(last>=0){stop();seek(last);$("commitDetails").hidden=true;}
 });
 $("downloadCommits").addEventListener("click",()=>{
   const rows=["# Spring PetClinic — logical commit table","","Source: "+data.sourceSHA+" · "+data.metrics.sourceLines+" source lines · "+events.length+" timed actions.","","| Commit | Added code lines | Files changed | Feature |","|---:|---:|---:|---|"];
   phases.slice().sort((a,b)=>a.totalLines-b.totalLines||a.id-b.id).forEach(p=>rows.push("| C"+String(p.id).padStart(3,"0")+" | "+p.totalLines+" | "+p.filesChanged+" | "+p.title+" |"));
   downloadText(rows.join("\n")+"\n","COMMIT_TABLE.md");
 });
 document.querySelectorAll("[data-palette]").forEach(b=>b.addEventListener("click",()=>{document.body.dataset.palette=b.dataset.palette;document.querySelectorAll(".palettes button").forEach(v=>v.classList.toggle("active",v===b));}));
 document.addEventListener("keydown",e=>{if(e.target.closest("input,button,textarea")||e.metaKey||e.ctrlKey)return;if(e.key==="ArrowLeft"){stop();seek(state.step-1);}else if(e.key==="ArrowRight"){stop();seek(state.step+1);}else if(e.key===" "){e.preventDefault();play();}});
 state.file=null;render();
 const requested=Number(new URLSearchParams(location.search).get("commit"));
 if(Number.isInteger(requested)&&requested>=1&&requested<=phases.length){seek(phases[requested-1].toStep);$("commitDetails").hidden=false;renderCommitDetails(phases[requested-1]);}
} catch(err) {
 console.error(err);
 $("filePath").textContent="Data loading error";
 $("codeLines").innerHTML='<div class="progress-loading">'+esc(err.message)+'. The source-data workflow must complete before this page is playable.</div>';
 $("terminalStage").hidden=true;$("editor").hidden=false;
 $("commitTitle").textContent="PetClinic data unavailable";$("commitMode").textContent="Loading failed";
}
