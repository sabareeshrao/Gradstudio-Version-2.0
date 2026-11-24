/* Source-faithful, logical cross-file teaching replay. Simulated, not historical Git commits. */
export function createLogicalReplay(original,sources){
 const target=original.events.length,files=original.files.map(f=>({...f,createdAt:-1,finishedAt:-1,lineSteps:[]})),byPath=new Map(files.map(f=>[f.path,f]));
 const groups=new Map(),dirs=new Set(),cursor=new Map(files.map(f=>[f.path,0])),events=[],phases=[];
 const quote=s=>"'"+String(s).replaceAll("'","'\\''")+"'";
 function feature(path){
  const p=path.toLowerCase(),name=p.split('/').at(-1);
  if(['pom.xml','build.gradle','settings.gradle','mvnw','mvnw.cmd','gradlew','gradlew.bat'].includes(name)||p.startsWith('.mvn/')||p.startsWith('gradle/'))return '00|Build dependencies and tooling';
  if(p.includes('petclinicapplication.java')||p.includes('petclinicruntimehints.java')||p.includes('/system/')||p.startsWith('src/main/resources/application'))return '01|Bootstrap and web configuration';
  if(p.includes('/model/')&&!p.includes('/test/'))return '02|Shared entity models';
  if(p.startsWith('src/main/resources/db/'))return '03|Database schema and data';
  if(p.includes('/owner/')||p.includes('/templates/owners/')||p.includes('/templates/pets/'))return '04|Owner, pet and visit workflows';
  if(p.includes('/vet/')||p.includes('/templates/vets/'))return '05|Veterinary features';
  if(p.startsWith('src/main/resources/templates/')||p.startsWith('src/main/scss/')||p.startsWith('src/main/resources/static/')||p.startsWith('src/main/resources/messages/'))return '06|Views, styling and localization';
  if(p.startsWith('src/test/'))return '07|Integration and regression tests';
  if(p.startsWith('.github/')||p.startsWith('k8s/')||p.startsWith('.devcontainer/')||p.startsWith('src/checkstyle/')||name==='docker-compose.yml')return '08|CI and deployment';
  return '09|Documentation and project settings';
 }
 for(const f of files){const k=feature(f.path);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(f);}
 const emit=(kind,props={})=>(events.push({kind,...props}),events.length-1);
 emit('terminal',{command:'mkdir spring-petclinic',label:'Create project directory'});
 emit('terminal',{command:'cd spring-petclinic',label:'Enter project directory'});
 emit('terminal',{command:'git init -b main',label:'Initialize Git repository',output:'Git initialized (simulation)'});
 function prepare(f,commit){
  if(f.createdAt>=0)return;
  const parts=f.path.split('/').slice(0,-1);
  parts.forEach((_,i)=>{const d=parts.slice(0,i+1).join('/');if(!dirs.has(d)){dirs.add(d);emit('terminal',{command:'mkdir -p '+quote(d),label:'Create directory',commit});}});
  if(f.kind==='asset'){
   const command=f.generated?'./mvnw package':'cp '+quote('starter-assets/'+f.path.split('/').at(-1))+' '+quote(f.path);
   f.createdAt=emit('terminal',{file:f.path,command,label:'Import or generate asset',output:'Simulated build/import; not executed',commit,created:true});
  }else f.createdAt=emit('terminal',{file:f.path,command:'touch '+quote(f.path),label:'Create source file',commit,created:true});
 }
 for(const [key,group] of [...groups].sort(([a],[b])=>a.localeCompare(b))){
  group.sort((a,b)=>a.path.localeCompare(b.path));
  const titleBase=key.split('|')[1];let remaining=group.slice(),iteration=1,touched=new Map(),fromStep=events.length;
  const touch=(p,n)=>(touched.set(p,(touched.get(p)||0)+n));
  function commit(){
   if(!touched.size)return;
   const id=phases.length+1,changed=[...touched.keys()],added=[...touched.values()].reduce((a,b)=>a+b,0);
   changed.forEach(p=>emit('terminal',{file:p,command:'git add -- '+quote(p),label:'Stage related file changes',commit:id-1}));
   const title=titleBase+' · iteration '+iteration++;
   emit('terminal',{command:'git commit -m '+quote(title),label:'Commit logical change',output:'Simulated teaching commit; not an original upstream SHA',commit:id-1});
   phases.push({id,title,fromStep,toStep:events.length-1,totalLines:added,filesChanged:changed.length,files:changed,changes:changed.map(file=>({file,added:touched.get(file)})),mode:'Logical feature commit'});
   touched=new Map();fromStep=events.length;
  }
  while(remaining.length){
   const next=[];
   for(const f of remaining){
    prepare(f,phases.length);
    if(f.kind==='asset'){touch(f.path,0);continue;}
    const lines=sources[f.path];
    if(!Array.isArray(lines))throw Error('Missing pinned source: '+f.path);
    const start=cursor.get(f.path),end=Math.min(start+12,lines.length);
    for(let i=start;i<end;i++){
     emit('add',{file:f.path,line:i,commit:phases.length,label:'Write source line'});
     touch(f.path,1);
     if((i+1)%6===0)emit('save',{file:f.path,commit:phases.length,label:'Save working code'});
    }
    cursor.set(f.path,end);
    if(end===lines.length){if(end&&end%6)emit('save',{file:f.path,commit:phases.length,label:'Save completed code'});}
    else next.push(f);
    if([...touched.values()].reduce((a,b)=>a+b,0)>=96&&(touched.size>=2||remaining.length===1))commit();
   }
   remaining=next;if(!remaining.length)commit();
  }
 }
 emit('terminal',{command:'git status --short',label:'Inspect repository status',output:'Working tree clean (simulated)'});
 emit('terminal',{command:'./mvnw test',label:'Review planned test command',output:'Suggested check; tests not executed by this UI'});
 // Keep the original exact number of minutes; balance only editor-save events.
 if(events.length>target){
  let excess=events.length-target;
  for(let i=events.length-1;i>=0&&excess>0;i--){if(events[i].kind==='save'&&i%2===0){events.splice(i,1);excess--;}}
  for(let i=events.length-1;i>=0&&excess>0;i--){if(events[i].kind==='save'){events.splice(i,1);excess--;}}
  if(excess)throw Error('Too many non-save actions for existing timeline');
 }else if(events.length<target){
  let missing=target-events.length,adds=events.filter(e=>e.kind==='add').length;
  if(missing>adds)throw Error('Too few additions for save balancing');
  const every=Math.max(1,Math.floor(adds/missing));let seen=0;
  for(let i=events.length-1;i>=0&&missing>0;i--)if(events[i].kind==='add'&&++seen%every===0){events.splice(i+1,0,{kind:'save',file:events[i].file,label:'Save edit buffer',commit:events[i].commit});missing--;}
  for(let i=events.length-1;i>=0&&missing>0;i--)if(events[i].kind==='add'){events.splice(i+1,0,{kind:'save',file:events[i].file,label:'Save edit buffer',commit:events[i].commit});missing--;}
 }
 files.forEach(f=>{f.createdAt=-1;f.finishedAt=-1;f.lineSteps=[];});
 phases.forEach(p=>{p.fromStep=-1;p.toStep=-1;});
 events.forEach((e,index)=>{
  if(e.created&&e.file)byPath.get(e.file).createdAt=index;
  if(e.kind==='add'){const f=byPath.get(e.file);f.lineSteps.push(index);f.finishedAt=index;}
  if(Number.isInteger(e.commit)&&phases[e.commit]){const p=phases[e.commit];if(p.fromStep<0)p.fromStep=index;p.toStep=index;}
 });
 files.forEach(f=>{if(f.finishedAt<0)f.finishedAt=f.createdAt;});
 const exact=new Map();
 events.forEach((e,step)=>{
  if(e.kind!=='add'||!Number.isInteger(e.commit))return;
  const key=e.commit+'|'+e.file;
  if(!exact.has(key))exact.set(key,[]);
  exact.get(key).push({line:e.line+1,step:step+1});
 });
 phases.forEach((phase,index)=>phase.changes.forEach(change=>{
  const lines=exact.get(index+'|'+change.file)||[];
  const ranges=[];
  for(const x of lines){const last=ranges.at(-1);if(last&&x.line===last.to+1)last.to=x.line;else ranges.push({from:x.line,to:x.line});}
  change.lineRanges=ranges;
  change.firstStep=lines[0]?.step??null;
  change.lastStep=lines.at(-1)?.step??null;
 }));
 const sourceLines=files.reduce((n,f)=>n+f.lineSteps.length,0);
 if(events.length!==target||sourceLines!==original.metrics.sourceLines||!files.every(f=>f.kind==='asset'||f.lineSteps.length===f.totalLines)||events.some(e=>['remove','strike','delete'].includes(e.kind)))throw Error('Logical schedule source audit failed');
 const multi=phases.filter(p=>p.filesChanged>1).length,revisits=files.filter(f=>phases.filter(p=>p.files.includes(f.path)).length>1).length;
 if(!multi||!revisits)throw Error('Logical feature / cross-file audit failed');
 return {...original,mode:'logical-feature-commits',events,files,phases,note:'Source-faithful simulated logical commits. Not original upstream history.',metrics:{...original.metrics,steps:events.length,sourceLines,terminalSteps:events.filter(e=>e.kind==='terminal').length,saveSteps:events.filter(e=>e.kind==='save').length,commits:phases.length,multiFileCommits:multi,revisitedFiles:revisits}};
}
