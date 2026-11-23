export function makeEngine(project) {
  const events=[], files=new Map(), commitDetails=[];
  let index=0, knownDirs=new Set(['.']);
  const pad=n=>String(n).padStart(2,'0');
  const quote=s=>`'${s.replaceAll("'",`'\\''`)}'`;
  function emit(kind,opts={}) {
    const m=project.startMinute+index;
    const event={index,kind,day:Math.floor(m/1440)+1,time:`${pad(Math.floor((m%1440)/60))}:${pad(m%60)}`,...opts};
    event.stamp=`D${pad(event.day)} ${event.time}`;
    events.push(event);index++;return event;
  }
  emit('terminal',{command:`mkdir ${quote(project.name)}`,label:'Create project'});
  emit('terminal',{command:`cd ${quote(project.name)}`,label:'Enter project'});
  emit('terminal',{command:'git init -b main',output:'Initialized empty Git repository (demo)',label:'Initialize repository'});
  for(let c=0;c<project.commits.length;c++) {
    const commit=project.commits[c];const start=index, initialFileCount=(commit.files||[]).length;
    const changedLines=(commit.files||[]).reduce((n,f)=>n+f.lines.length,0)+
      (commit.changes||[]).reduce((n,ch)=>n+ch.insert.length+1,0);
    // Small commits use Git-patch order. Larger multi-file commits use logical order.
    const mode=(initialFileCount>=4||changedLines>50)?'Logical reconstruction':'Git patch order';
    emit('terminal',{command:`# ${commit.title}`,label:`Commit ${c+1} begins`,commit:c});
    for(const f of commit.files||[]) {
      const parent=f.path.includes('/')?f.path.slice(0,f.path.lastIndexOf('/')):'';
      if(parent && !knownDirs.has(parent)) {
        const bits=parent.split('/');for(let x=1;x<=bits.length;x++)knownDirs.add(bits.slice(0,x).join('/'));
        emit('terminal',{command:`mkdir -p ${quote(parent)}`,label:'Create directories',commit:c});
      }
      emit('create',{file:f.path,command:`touch ${quote(f.path)}`,label:'Create file',commit:c});
      files.set(f.path,{language:f.language});
      for(let i=0;i<f.lines.length;i++)emit('add',{file:f.path,at:i,text:f.lines[i],label:'Write source line',commit:c});
    }
    for(const ch of commit.changes||[]) {
      // Git supplies a removal and addition, never an actual typing-order event.
      // The strike phase is an explicit learning animation step.
      emit('strike',{file:ch.path,targetText:ch.deleteText,label:'Strike deleted line',commit:c});
      emit('remove',{file:ch.path,targetText:ch.deleteText,label:'Remove deleted line',commit:c});
      for(let i=0;i<ch.insert.length;i++)emit('insert',{file:ch.path,afterText:i===0?'        Order order = new Order(id, customerId, quantity, "PENDING");':ch.insert[i-1],text:ch.insert[i],label:'Add replacement code',commit:c});
    }
    emit('terminal',{command:'git add .',label:'Stage changes',commit:c});
    emit('terminal',{command:`git commit -m ${quote(commit.title)}`,output:`[main ${commit.sha}] ${commit.title}\n ${initialFileCount||1} file(s) changed · demo`,label:'Commit changes',commit:c});
    commitDetails.push({id:c+1,sha:commit.sha,title:commit.title,mode,from:start,to:index-1,changedLines,files:initialFileCount||1});
  }
  emit('terminal',{command:'git status --short',output:'Working tree clean (demo)',label:'Check Git status',commit:2});
  const snapshots=new Map();
  function snapshot(at){
    const n=Math.max(0,Math.min(events.length-1,at));
    if(snapshots.has(n))return snapshots.get(n);
    const state=new Map();
    for(let i=0;i<=n;i++){
      const e=events[i];
      if(e.kind==='create')state.set(e.file,[]);
      else if(e.kind==='add')state.get(e.file)?.splice(e.at,0,{text:e.text,addedAt:i});
      else if(e.kind==='strike'){
        const lines=state.get(e.file)||[],hit=lines.find(x=>x.text===e.targetText && !x.struck);
        if(hit)hit.struck=i;
      }
      else if(e.kind==='remove'){
        const lines=state.get(e.file)||[],pos=lines.findIndex(x=>x.text===e.targetText);
        if(pos>=0)lines.splice(pos,1);
      }
      else if(e.kind==='insert'){
        const lines=state.get(e.file)||[],pos=lines.findIndex(x=>x.text===e.afterText);
        lines.splice(pos<0?lines.length:pos+1,0,{text:e.text,addedAt:i});
      }
    }
    snapshots.set(n,state);
    if(snapshots.size>140){const first=snapshots.keys().next().value;snapshots.delete(first);}
    return state;
  }
  function timeIndex(day,time){const [h,m]=time.split(':').map(Number);return (day-1)*1440+h*60+m-project.startMinute;}
  return {events,files,commitDetails,snapshot,timeIndex};
}