/* Shared Gradstudio mathematical typesetting for dynamically inserted lesson content.
 * Source remains untouched. Immediately displays readable plaintext fallback,
 * then progressively upgrades delimited TeX to accessible MathJax SVG.
 * Used by both English and Telugu study apps.
 */
const DELIMITED_MATH=/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$/g;
const SKIP='script,style,pre,code,textarea,svg,math,mjx-container,.math-expression';
const GREEK={
  alpha:'α',beta:'β',gamma:'γ',delta:'δ',epsilon:'ε',varepsilon:'ε',
  theta:'θ',vartheta:'ϑ',lambda:'λ',mu:'μ',nu:'ν',pi:'π',rho:'ρ',sigma:'σ',
  tau:'τ',phi:'φ',varphi:'φ',omega:'ω',eta:'η',xi:'ξ',zeta:'ζ',kappa:'κ',
  Delta:'Δ',Gamma:'Γ',Sigma:'Σ',Theta:'Θ',Phi:'Φ',Omega:'Ω',
  nabla:'∇',partial:'∂',infty:'∞',times:'×',cdot:'·',leq:'≤',geq:'≥',
  neq:'≠',approx:'≈',rightarrow:'→',to:'→',mapsto:'↦',in:'∈',
  sum:'Σ',prod:'Π',forall:'∀',exists:'∃',pm:'±',div:'÷',ldots:'…',
  log:'log',ln:'ln',exp:'exp',sin:'sin',cos:'cos',tan:'tan',
  min:'min',max:'max',argmin:'argmin',argmax:'argmax'
};
const SUB=Object.fromEntries([... '0123456789+-=()ait'].map((c,i)=>[c,'₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐᵢₜ'.charAt(i)]));
// Keep the plain-text fallback legible on offline / restricted clients.
function rewriteFractions(source){
  // Brace-aware parsing handles nested fractions, powers and subscripts:
  // \frac{e^{z_i}}{\sum_j e^{z_j}} instead of a partial regex replacement.
  function group(text,at){
    while(text[at]===' ')at++;
    if(text[at]!=='{')return null;
    const start=at+1;let depth=1;
    for(let i=start;i<text.length;i++){
      if(text[i]==='{')depth++;
      else if(text[i]==='}'){
        depth--;
        if(depth===0)return {value:text.slice(start,i),next:i+1};
      }
    }
    return null;
  }
  let out='';
  for(let i=0;i<source.length;){
    const fraction=source.startsWith('\\frac',i);
    const radical=source.startsWith('\\sqrt',i);
    if(fraction||radical){
      const end=i+(fraction?5:5),a=group(source,end);
      const b=fraction&&a?group(source,a.next):null;
      if(a&&(!fraction||b)){
        out+=fraction?'('+rewriteFractions(a.value)+')/('+rewriteFractions(b.value)+')':'√('+rewriteFractions(a.value)+')';
        i=fraction?b.next:a.next;
        continue;
      }
    }
    out+=source[i++];
  }
  return out;
}
export function readableMath(source){
  let s=rewriteFractions(String(source).trim());
  for(let k=0;k<5;k++){
    const old=s;
    s=s.replace(/\\(?:text|mathrm|operatorname|mathbf|mathit|boldsymbol)\s*\{([^{}]*)\}/g,'$1')
      .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g,(_,a,b)=>'('+a+')/('+b+')')
      .replace(/\\sqrt\s*\{([^{}]*)\}/g,(_,a)=>'√('+a+')');
    if(s===old)break;
  }
  s=s.replace(/\\left|\\right|\\bigl|\\bigr|\\Bigl|\\Bigr/g,'')
    .replace(/\\([A-Za-z]+)/g,(_,name)=>Object.hasOwn(GREEK,name)?GREEK[name]:name)
    .replace(/\\,/g,' ').replace(/\\;/g,' ').replace(/\\!/g,'')
    .replace(/\\\{/g,'{').replace(/\\\}/g,'}')
    .replace(/_/g,'_') // preserve unrecognized subscripts before simplification
    .replace(/_\{([^{}]+)\}/g,(_,group)=>{
      const mapped=[...group].map(c=>SUB[c]||'').join('');
      return mapped.length===group.length?mapped:'_('+group+')';
    })
    .replace(/_([0-9a-z])/g,(_,a)=>SUB[a]||'_'+a)
    .replace(/\^\{([^{}]+)\}/g,'^($1)')
    .replace(/[{}]/g,'')
    .replace(/\\[a-zA-Z]+/g,'').replace(/\s+/g,' ').trim();
  return s||String(source).replace(/\\/g,'');
}
let mathjaxLoad;
function ensureMathJax(){
  if(globalThis.MathJax?.tex2svgPromise)return Promise.resolve(globalThis.MathJax);
  if(mathjaxLoad)return mathjaxLoad;
  mathjaxLoad=new Promise((resolve,reject)=>{
    const urls=[
      'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js',
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.min.js'
    ];
    let at=0;
    globalThis.MathJax={startup:{typeset:false},tex:{inlineMath:[['\\(','\\)']],displayMath:[['\\[','\\]']]}};
    const attempt=()=>{
      if(at===urls.length){reject(new Error('MathJax unavailable; using readable math fallback'));return}
      const s=document.createElement('script');
      s.src=urls[at++];s.async=true;s.referrerPolicy='no-referrer';
      s.onload=()=>{
        Promise.resolve(globalThis.MathJax?.startup?.promise)
          .then(()=>{
            if(typeof globalThis.MathJax?.tex2svgPromise!=='function')throw Error('MathJax not initialized');
            resolve(globalThis.MathJax);
          }).catch(()=>{s.remove();attempt()});
      };
      s.onerror=()=>{s.remove();attempt()};
      document.head.appendChild(s);
    };
    attempt();
  });
  return mathjaxLoad;
}
export function renderMath(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const textNodes=[];
  while(walker.nextNode()){
    const node=walker.currentNode;
    if(!node.parentElement||node.parentElement.closest(SKIP))continue;
    if(/\\\(|\\\[|\$\$/.test(node.nodeValue))textNodes.push(node);
  }
  const math=[];
  for(const node of textNodes){
    const original=node.nodeValue;
    const matches=[...original.matchAll(DELIMITED_MATH)];
    if(!matches.length)continue;
    const frag=document.createDocumentFragment();
    let at=0;
    for(const match of matches){
      if(match.index>at)frag.append(document.createTextNode(original.slice(at,match.index)));
      const tex=match[1]??match[2]??match[3]??'';
      const span=document.createElement('span');
      const display=match[2]!=null||match[3]!=null;
      span.className='math-expression'+(display?' math-display':'');
      span.dataset.tex=tex;
      span.dataset.display=String(display);
      span.dataset.mathState='fallback';
      span.setAttribute('aria-label',readableMath(tex));
      span.textContent=readableMath(tex);
      frag.append(span);
      math.push(span);
      at=match.index+match[0].length;
    }
    if(at<original.length)frag.append(document.createTextNode(original.slice(at)));
    node.replaceWith(frag);
  }
  if(!math.length)return Promise.resolve({count:0,rendered:0});
  // The quiz is immediately readable; math upgrade never blocks controls.
  return ensureMathJax().then(async engine=>{
    let rendered=0;
    for(const node of math){
      if(!node.isConnected)continue;
      try{
        const svg=await engine.tex2svgPromise(node.dataset.tex,{display:node.dataset.display==='true'});
        node.replaceChildren(svg);
        node.dataset.mathState='rendered';
        rendered++;
      }catch(e){console.warn('Math equation fallback:',e?.message||e)}
    }
    return {count:math.length,rendered};
  }).catch(error=>{
    console.warn('MathJax could not load; showing readable equations.',error?.message||error);
    return {count:math.length,rendered:0};
  });
}
