(async function boot(){
  'use strict';
  const root=document.getElementById('moduleRoot');
  const params=new URLSearchParams(location.search);
  const slug=params.get('module');
  const esc=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Use published site assets first. If a Pages deployment is delayed,
  // read public lesson JSON from the exact GitHub repository instead.
  // This fallback is confined to checked module JSON filenames.
  async function getJSON(url){
    let originalError;
    try{
      const response=await fetch(url,{cache:'no-store'});
      if(response.ok)return response.json();
      originalError=Error('Published lesson unavailable (HTTP '+response.status+')');
    }catch(error){originalError=error;}
    const requested=new URL(url,base);
    const relative=requested.href.startsWith(base.href)?requested.href.slice(base.href.length):'';
    if(!/^(?:modules|unlisted)\/[a-z0-9]+(?:-[a-z0-9]+)*\.json$/.test(relative))throw originalError;
    const raw='https://raw.githubusercontent.com/sabareeshrao/Gradstudio-Version-2.0/main/study-engine/'+relative;
    try{
      const alternate=await fetch(raw,{cache:'no-store'});
      if(alternate.ok)return alternate.json();
    }catch(error){console.warn('GitHub source fallback unavailable',error);}
    throw Error('Lesson data is not yet available on Pages or GitHub. Try refreshing after deployment.');
  }
  const base=new URL('./',import.meta.url);
  try{
    // The library needs the module registry, but a direct lesson link does not.
    // Fetching the lesson JSON directly avoids rejecting newer links when the
    // deployed index.json is cached or older than the module file.
    if(!slug){
      const manifest=await getJSON(new URL('modules/index.json',base));
      document.getElementById('themeMenu').style.display='none';
      root.innerHTML='<h1>Gradstudio Study Modules</h1><p class="sub">Select a keyword to open its seven-layer visual quiz. The same page engine powers every module.</p>'+
      manifest.modules.map(m=>'<article class="question"><div class="q-head"><span class="q-badge">7 LAYERS</span><span class="q-tag">'+esc(m.domain)+'</span></div><h2>'+esc(m.title)+'</h2><p><a href="?module='+encodeURIComponent(m.slug)+'">Open interactive lesson in browser →</a></p></article>').join('');
      return;
    }
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw Error('Invalid keyword: '+slug);
    // The published 58-topic catalog stays locked; this approved direct-link
    // lesson is kept separately and never added to the public index.
    const lessonPath=(slug==='data-augmentation'||slug==='transformer-scisketch')?'unlisted/'+slug+'.json':'modules/'+slug+'.json';
    const data=await getJSON(new URL(lessonPath,base));
    if(!Array.isArray(data.questions)||data.questions.length<1||data.questions.some(q=>q.options?.length!==4||!['a','b','c','d'].includes(q.answer)||!q.figure))throw Error('Invalid module: each question needs four choices, one answer, and its own figure.');
    if(data.diagramStyle){
      // Prefer the deployed stylesheet; fall back to the matching GitHub source
      // for recently added modules while Pages is catching up.
      const loadStyle=(href)=>new Promise((res,rej)=>{
        const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href=href;
        sheet.onload=res;sheet.onerror=()=>{sheet.remove();rej(Error('Diagram CSS unavailable'))};
        document.head.appendChild(sheet);
      });
      try{
        const styleURL=new URL(data.diagramStyle,base);
        // A fresh stylesheet version prevents previously cached nested-SVG
        // sizing rules from overriding the corrected lesson diagrams.
        if(slug==='data-augmentation')styleURL.searchParams.set('v','20261101-no-sideways-v1');
        if(slug==='transformer-scisketch')styleURL.searchParams.set('v','20261101-constraint-mobile-v1');
        await loadStyle(styleURL.href);
      }catch(error){
        if(!/^diagrams\/[a-z0-9]+(?:-[a-z0-9]+)*\.css$/.test(data.diagramStyle))throw error;
        await loadStyle('https://raw.githubusercontent.com/sabareeshrao/Gradstudio-Version-2.0/main/study-engine/'+data.diagramStyle);
      }
    }
    document.title=data.title+' — Gradstudio';
    document.querySelector('#moduleBrand').innerHTML=esc(data.keyword)+'<small>Visual Study · '+data.questions.length+' Learning Layers</small>';
    document.getElementById('progress').setAttribute('aria-valuemax',String(data.questions.length));
    const renderCard=(q,i)=>{
      // Defensive fallback for imported lessons: show the question, not its Layer N label.
      const questionText=String(q.stem||'').replace(/^\s*(?:\d+\s*[.)]\s*)?Layer\s*\d+\s*[:.\-–—]\s*/i,'');
      const opts=q.options.map((opt,j)=>'<label><input name="q'+(i+1)+'" type="radio" value="'+('abcd'[j])+'"><span class="answer-text"><strong class="option-letter">'+('ABCD'[j])+'.</strong> '+opt+'</span></label>').join('');
      // Progressive disclosure: show the beginner takeaway first. The older,
      // comprehensive explanation stays available only when explicitly expanded.
      const deeper=q.technicalExplanation
        ?'<details class="explanation-deep"><summary>Read the detailed explanation</summary><div class="explanation-deep-content">'+q.technicalExplanation+'</div></details>'
        :'';
      return '<section class="question" data-answer="'+esc(q.answer)+'"><div class="q-head"><span class="q-badge">Q'+(i+1)+'</span><span class="q-tag">'+esc(q.tag)+'</span></div><figure class="q-fig">'+q.figure+'</figure><p class="q-text">'+questionText+'</p><fieldset class="answer-choices"><legend class="sr-only">Choose the best answer for question '+(i+1)+'</legend>'+opts+'</fieldset><div class="reveal-control-row"><button type="button" class="reveal-toggle" aria-expanded="false" aria-controls="reveal-explanation-'+(i+1)+'" aria-label="Reveal answer for question '+(i+1)+'">Reveal</button></div><div id="reveal-explanation-'+(i+1)+'" class="explanation" aria-live="polite"><div class="explanation-quick">'+q.explanation+'</div>'+deeper+'</div></section>';
    };
    root.innerHTML='<h1>'+esc(data.title)+'</h1><p class="sub">'+esc(data.subtitle)+'</p>'+data.hero+
      '<div id="result" role="status" aria-live="polite"></div><form id="quiz">'+data.questions.map(renderCard).join('')+'</form>'+
      '<div class="actions"><button id="checkBtn" type="button">Check Answers</button><button id="resetBtn" type="button">Reset</button></div>'+
      (data.sources||'')+'<p class="footer">'+esc(data.footer||data.keyword+' · Visual study module · 15 themes')+'</p>';
    if(slug==='transformer-scisketch'){
      document.body.classList.add('transformer-research');
      try{
        const mobileCSS=new URL('./experiments/mobile-constraint-layout.css?v=20261101-cl-v1',base);
        const link=document.createElement('link');
        link.rel='stylesheet';link.href=mobileCSS.href;
        document.head.appendChild(link);
        const {mountConstraintMobileLayout}=await import('./experiments/mobile-constraint-layout.js?v=20261101-cl-v1');
        mountConstraintMobileLayout(root);
      }catch(e){console.error('Constraint-first responsive layout unavailable',e)}
    }
    if(slug==='transformer-scisketch'){
      try{const {mountResearchComparison}=await import('./experiments/diagram-comparison.js?v=20261101-q7-object-audit');mountResearchComparison(root)}
      catch(e){console.error('Research diagram comparison unavailable',e)}
    }
    // Fit all figure SVGs on mobile and reflow Data Augmentation into semantic panels.
    try{const {mountResponsiveFigures}=await import('./responsive-figures.js?v=20261101-no-sideways-v1');mountResponsiveFigures(root,slug)}
    catch(e){console.warn('Responsive figure helper unavailable',e)}
    // Normalize arrowheads for every English module; no stroke-width-scaled triangles.
    try{const {normalizeSvgArrowheads}=await import('./svg-arrowheads.js?v=20261101-slim-arrows');normalizeSvgArrowheads(root)}
    catch(e){console.warn('SVG arrowhead guard unavailable',e)}
    // Render delimited mathematics in every dynamically injected English lesson.

    // Readable fallback appears immediately even when MathJax cannot load.

    try{

      const {renderMath}=await import('./math-render.js?v=20261031-math-fix');

      renderMath(root); // Upgrades to SVG asynchronously without blocking quiz controls.

    }catch(mathError){console.warn('Math rendering unavailable',mathError);}

    await import('./quiz-theme.js?v=20261031-reveal-hide');
  }catch(error){
    document.getElementById('themeMenu').style.display='none';
    root.innerHTML='<h1>Unable to open lesson</h1><p class="sub">'+esc(error.message)+'</p><p><a href="./">Back to the study library</a></p>';
    console.error(error);
  }
})();