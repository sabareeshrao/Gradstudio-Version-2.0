/** Gradstudio shared figure fitting.
 * Fit the ORIGINAL outer SVG to its EXISTING card; never enlarge a card,
 * force SVG minimum width, introduce sideways scrolling or clone mobile panels.
 * Leave nested SVG illustrations alone.
 */
export function mountResponsiveFigures(root){
 if(!root)return;
 const fit=()=>{
  for(const region of root.querySelectorAll('.q-fig,.hero,.da-hero')){
   for(const svg of region.querySelectorAll('svg')){
    if(svg.ownerSVGElement)continue;
    const parent=svg.parentElement;
    if(!parent||!parent.clientWidth)continue;
    const width=svg.getBoundingClientRect().width;
    if(width>parent.clientWidth+1){
     svg.style.setProperty('width','100%','important');
     svg.style.setProperty('min-width','0','important');
     svg.style.setProperty('max-width','100%','important');
     svg.style.setProperty('height','auto','important');
     parent.style.setProperty('overflow-x','hidden','important');
    }
   }
  }
 };
 fit();
 window.addEventListener('resize',fit,{passive:true});
}
