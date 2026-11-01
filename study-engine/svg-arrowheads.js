/** Gradstudio shared SVG arrowhead safety net: small unfilled, fixed-pixel chevrons.
 * Preserve each marker's ID and color; never scale heads with strokeWidth.
 * Called after a lesson is inserted into the DOM, for English and Telugu pages.
 */
export function normalizeSvgArrowheads(scope){
  const ns='http://www.w3.org/2000/svg';
  for(const marker of scope.querySelectorAll('svg marker')){
    const graphic=marker.querySelector('path, polygon');
    if(!graphic || marker.querySelectorAll('path, polygon').length!==1)continue;
    const id=(marker.getAttribute('id')||'').toLowerCase();
    if(!/(?:arrow|arr|tip|chevron|head)/.test(id))continue;
    const fill=graphic.getAttribute('fill');
    const color=graphic.getAttribute('stroke')||((fill&&fill!=='none')?fill:null)||'currentColor';
    marker.setAttribute('viewBox','0 0 10 10');
    marker.setAttribute('markerUnits','userSpaceOnUse');
    marker.setAttribute('markerWidth','9');
    marker.setAttribute('markerHeight','9');
    marker.setAttribute('refX','8');
    marker.setAttribute('refY','5');
    marker.setAttribute('orient','auto');
    while(marker.firstChild)marker.removeChild(marker.firstChild);
    const tip=document.createElementNS(ns,'path');
    for(const [name,value] of Object.entries({d:'M1.5 2.2 L7.8 5 L1.5 7.8',fill:'none',stroke:color,'stroke-width':'1.35','stroke-linecap':'round','stroke-linejoin':'round'}))tip.setAttribute(name,value);
    marker.appendChild(tip);
  }
}
