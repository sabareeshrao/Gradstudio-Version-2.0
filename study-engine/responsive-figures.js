/** Shared Gradstudio no-sideways-panning figure renderer.
 * Specialized mobile scenes retain readable vector details rather than
 * forcing a 1000-unit SVG into a 360px diagram card.
 */
const SVG_NS='http://www.w3.org/2000/svg';
const DA_SECTIONS=[
 [{label:'Original bicycle image',crop:[40,110,260,251]},{label:'Safe variations',crop:[347,110,313,251]},{label:'Better model exposure',crop:[700,140,260,196]}],
 [{label:'Original sample',crop:[44,108,217,253]},{label:'Lighting change',crop:[285,108,217,253]},{label:'Horizontal flip',crop:[526,108,217,253]},{label:'Safe crop',crop:[767,108,217,253]}],
 [{label:'Sparse data: memorization risk',crop:[60,150,282,190]},{label:'More variety: smoother boundary',crop:[543,150,282,190]}],
 [{label:'Image: change the pixels',crop:[36,105,293,269]},{label:'Text: preserve the meaning',crop:[351,105,296,269]},{label:'Audio: alter the signal safely',crop:[669,105,295,269]}],
 {processes:[
  {title:'Online: while training',lane:'online',steps:['Load a source image','Apply a random transform','Use a fresh training view','Train immediately']},
  {title:'Offline: before training',lane:'offline',steps:['Load a source image','Generate transformed copies','Save the copies to disk','Reuse them during training']}
 ]},
 [{label:'Safe: the digit is still 6',crop:[75,160,345,198]},{label:'Unsafe: the label may change',crop:[554,160,350,198]}],
 null,
 [{label:'Training: augment only training data',crop:[55,151,244,139]},{label:'Holdout: independent evaluation',crop:[371,151,235,139]},{label:'Check realism and label quality',items:['Labels remain correct','No shared identities across splits','Variations are realistic','Match deployment conditions','Compare results by group']}]
];
function renameSvgIds(svg,prefix){
 const map=new Map();
 for(const node of svg.querySelectorAll('[id]')){
  const prior=node.getAttribute('id'),fresh=prefix+prior;
  map.set(prior,fresh);node.setAttribute('id',fresh);
 }
 for(const node of [svg,...svg.querySelectorAll('*')]){
  for(const attribute of [...node.attributes]){
   let value=attribute.value;
   for(const [prior,fresh] of map){
    value=value.split('url(#'+prior+')').join('url(#'+fresh+')');
    if((attribute.name==='href'||attribute.name==='xlink:href')&&value==='#'+prior)value='#'+fresh;
    if(attribute.name==='aria-labelledby'||attribute.name==='aria-describedby')
      value=value.split(/\s+/).map(word=>word===prior?fresh:word).join(' ');
   }
   if(value!==attribute.value)node.setAttribute(attribute.name,value);
  }
 }
}
function makePanel(source,spec,section,number){
 const card=document.createElement('section');card.className='da-mobile-card';
 const title=document.createElement('h4');title.textContent=spec.label;card.append(title);
 if(spec.items){
  const list=document.createElement('ul');list.className='da-mobile-checklist';
  for(const item of spec.items){const li=document.createElement('li');li.textContent=item;list.append(li)}
  card.append(list);return card;
 }
 const svg=source.cloneNode(true);
 svg.setAttribute('viewBox',spec.crop.join(' '));
 svg.removeAttribute('aria-labelledby');
 svg.setAttribute('role','img');
 svg.setAttribute('aria-label',spec.label+' — Data Augmentation illustration');
 renameSvgIds(svg,'da-mobile-'+section+'-'+number+'-');
 card.append(svg);return card;
}
function makeProcess(spec){
 const stack=document.createElement('div');stack.className='da-mobile-panels';
 for(const lane of spec.processes){
  const panel=document.createElement('section');panel.className='da-mobile-process';panel.dataset.lane=lane.lane;
  const title=document.createElement('h4');title.textContent=lane.title;panel.append(title);
  const list=document.createElement('ol');
  for(const step of lane.steps){const li=document.createElement('li');li.textContent=step;list.append(li)}
  panel.append(list);stack.append(panel);
 }
 return stack;
}
export function mountResponsiveFigures(root,slug){
 if(!root)return;
 if(slug==='data-augmentation'){
  const figures=[...root.querySelectorAll('.da-hero,.da-figure')];
  if(figures.length!==8)console.warn('Expected hero and seven Data Augmentation figures');
  figures.forEach((figure,i)=>{
   const spec=DA_SECTIONS[i];
   if(!spec||figure.querySelector('.da-mobile-panels'))return;
   if(spec.processes){figure.append(makeProcess(spec));return;}
   const source=figure.querySelector('.da-art > svg');
   if(!source)return;
   const stack=document.createElement('div');stack.className='da-mobile-panels';
   spec.forEach((part,j)=>stack.append(makePanel(source,part,i,j)));
   figure.append(stack);
  });
 }
 // Preserve all non-SVG text and art; only resize top-level oversized SVGs.
 // This legacy safety net applies to every approved English module and Telugu overlay.
 const fit=()=>{
  for(const region of root.querySelectorAll('.q-fig,.hero,.da-hero')){
   if(!region.clientWidth)continue;
   for(const svg of region.querySelectorAll('svg')){
    if(svg.ownerSVGElement)continue;
    const parent=svg.parentElement;
    if(!parent||parent.namespaceURI===SVG_NS||!parent.clientWidth)continue;
    if(svg.getBoundingClientRect().width>parent.clientWidth+2){
     svg.style.setProperty('min-width','0','important');
     svg.style.setProperty('width','100%','important');
     svg.style.setProperty('max-width','100%','important');
     svg.style.setProperty('height','auto','important');
     parent.style.setProperty('overflow-x','clip','important');
    }
   }
  }
 };
 fit();
 window.addEventListener('resize',fit,{passive:true});
}
