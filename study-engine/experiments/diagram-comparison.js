/** Three-way per-card diagram selector and VizLinter-inspired rendered SVG audit. */
export function mountResearchComparison(root){
 const cards=[...root.querySelectorAll('.pb-card')];
 function auditOne(svg){
  if(!svg||typeof svg.createSVGPoint!=='function')return [];
  const vb=svg.viewBox?.baseVal, issues=[],texts=[...svg.querySelectorAll('text')].filter(t=>!t.closest('defs'));
  const bb=e=>{try{const v=e.getBBox();return {x:v.x,y:v.y,w:v.width,h:v.height}}catch{return null}};
  const blocks=texts.map(e=>({e,b:bb(e)})).filter(o=>o.b&&o.b.w>1&&o.b.h>1);
  const hit=(a,b,pad=0)=>Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>pad&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>pad;
  for(let i=0;i<blocks.length;i++){
   const o=blocks[i],b=o.b;
   if(vb&&(b.x<vb.x-3||b.y<vb.y-3||b.x+b.w>vb.x+vb.width+3||b.y+b.h>vb.y+vb.height+3))issues.push('out-of-viewBox label: '+o.e.textContent.trim().slice(0,36));
   for(let k=i+1;k<blocks.length;k++)if(hit(b,blocks[k].b,2))issues.push('label collision: '+o.e.textContent.trim().slice(0,23)+' ↔ '+blocks[k].e.textContent.trim().slice(0,23));
   for(const rect of svg.querySelectorAll('[data-chart-bar]')){const bar=bb(rect);if(bar&&hit(b,bar,2))issues.push('chart-label collision: '+o.e.textContent.trim().slice(0,30))}
  }
  // Collision groups are authored explicitly. Generic SVG rectangles can
  // intentionally enclose labels, so checking every shape would produce noise.
  const obstacles=[...svg.querySelectorAll('[data-layout-obstacle]')]
    .map(e=>({e,b:bb(e),type:e.getAttribute('data-layout-obstacle')}))
    .filter(o=>o.b&&o.b.w>0&&o.b.h>0);
  for(let i=0;i<obstacles.length;i++)for(let j=i+1;j<obstacles.length;j++){
    const a=obstacles[i],b=obstacles[j];
    if(a.type!==b.type&&hit(a.b,b.b,1))issues.push('object collision: '+a.type+' / '+b.type);
  }
  for(const item of blocks)for(const o of obstacles){
    if(item.e===o.e||!hit(item.b,o.b,2))continue;
    const label=item.e.textContent.trim();
    const contained=item.b.x>=o.b.x-2&&item.b.x+item.b.w<=o.b.x+o.b.w+2
      &&item.b.y>=o.b.y-2&&item.b.y+item.b.h<=o.b.y+o.b.h+2;
    if(contained&&((o.type==='query-head'&&/^Q[1-4]$/.test(label))
      ||(o.type==='kv-node'&&/^KV[12]$/.test(label))))continue;
    issues.push('text overlaps '+o.type+': '+label.slice(0,35));
  }
  // Route paths are only marked when the path is required to stay clear of labels.
  for(const path of svg.querySelectorAll('path[data-route]')){
   try{const len=path.getTotalLength(),samples=Math.max(10,Math.min(150,Math.ceil(len/8)));
    for(let i=1;i<samples;i++){const pt=path.getPointAtLength(len*i/samples);
     const label=blocks.find(x=>pt.x>x.b.x+2&&pt.x<x.b.x+x.b.w-2&&pt.y>x.b.y+2&&pt.y<x.b.y+x.b.h-2);
     if(label){issues.push('connector crosses label: '+label.e.textContent.trim().slice(0,28));break}
    }
   }catch{}
  }
  return [...new Set(issues)];
 }
 function update(card){
  const mode=card.querySelector('.pb-select').value;
  card.dataset.view=mode;
  card.querySelectorAll('.pb-variant').forEach(el=>{el.hidden=mode!=='all'&&el.dataset.version!==mode});
  const summary=card.querySelector('.pb-view-status');
  summary.textContent=mode==='all'?'Comparing all three diagrams':mode==='paperbanana'?'Showing PaperBanana-inspired vector artwork':mode==='scisketch'?'Showing previous SciSketch artwork':'Showing original GradStudio diagram';
  requestAnimationFrame(()=>{
   let issues=[];
   card.querySelectorAll('.pb-variant:not([hidden]) .pb-svg, .pb-variant:not([hidden]) .sc-diagram').forEach(svg=>issues.push(...auditOne(svg)));
   const status=card.querySelector('.pb-layout-status');
   if(status){status.dataset.problems=String(issues.length>0);status.textContent=issues.length?('Layout audit: '+issues.length+' potential collisions; inspect the affected diagram.'):'Partial layout audit: no detected collisions in checked text, marked paths, and marked objects.';}
   if(issues.length)console.warn('[GradStudio diagram audit]',card.querySelector('.pb-controls-label strong')?.textContent,issues);
  });
 }
 for(const card of cards){const select=card.querySelector('.pb-select');select.addEventListener('change',()=>update(card));update(card);}
}
