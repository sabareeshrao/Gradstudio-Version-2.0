export function makeEngine(project) {
  const events=[],files=new Map(),commitDetails=[];
  const pad=n=>String(n).padStart(2,'0');
  for(const [c,stage] of project.stages.entries()){
    const from=events.length;
    for(const action of stage.actions){
      const index=events.length,m=project.startMinute+index;
      const day=Math.floor(m/1440)+1,time=pad(Math.floor(m%1440/60))+':'+pad(m%60);
      if(action.kind==='create')files.set(action.file,{language:action.language});
      events.push({...action,index,day,time,stamp:'D'+pad(day)+' '+time,commit:c});
    }
    commitDetails.push({id:stage.id,sha:'Step '+pad(stage.id),title:stage.title,mode:'Guided development',from,to:events.length-1});
  }
  function snapshot(at){
    const state=new Map();
    for(const e of events.slice(0,at+1)){
      if(e.kind==='create')state.set(e.file,[]);
      else if(e.kind==='add'||e.kind==='insert')state.get(e.file).splice(e.at,0,{text:e.text,addedAt:e.index});
      else if(e.kind==='strike')state.get(e.file)[e.at].struck=e.index;
      else if(e.kind==='remove')state.get(e.file).splice(e.at,1);
    }
    return state;
  }
  function timeIndex(day,time){const [h,m]=time.split(':').map(Number);return (day-1)*1440+h*60+m-project.startMinute;}
  return {events,files,commitDetails,snapshot,timeIndex};
}
