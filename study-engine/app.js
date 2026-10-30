(async function boot(){
  'use strict';
  const root=document.getElementById('moduleRoot');
  const params=new URLSearchParams(location.search);
  const slug=params.get('module');
  const esc=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function getJSON(url){const r=await fetch(url,{cache:'no-cache'});if(!r.ok)throw Error('Module not found (HTTP '+r.status+')');return r.json();}
  const base=new URL('./',import.meta.url);
  try{
    const manifest=await getJSON(new URL('modules/index.json',base));
    if(!slug){
      document.getElementById('themeMenu').style.display='none';
      root.innerHTML='<h1>Gradstudio Study Modules</h1><p class="sub">Select a keyword to open its seven-layer visual quiz. The same page engine powers every module.</p>'+
      manifest.modules.map(m=>'<article class="question"><div class="q-head"><span class="q-badge">7 LAYERS</span><span class="q-tag">'+esc(m.domain)+'</span></div><h2>'+esc(m.title)+'</h2><p><a href="?module='+encodeURIComponent(m.slug)+'">Open interactive lesson in browser →</a></p></article>').join('');
      return;
    }
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||!manifest.modules.some(m=>m.slug===slug))throw Error('Unknown keyword: '+slug);
    const data=await getJSON(new URL('modules/'+slug+'.json',base));
    if(!Array.isArray(data.questions)||data.questions.length<1||data.questions.some(q=>q.options?.length!==4||!['a','b','c','d'].includes(q.answer)||!q.figure))throw Error('Invalid module: each question needs four choices, one answer, and its own figure.');
    if(data.diagramStyle){
      const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href=new URL(data.diagramStyle,base).href;
      await new Promise((res,rej)=>{sheet.onload=res;sheet.onerror=()=>rej(Error('Diagram CSS missing'));document.head.appendChild(sheet)});
    }
    document.title=data.title+' — Gradstudio';
    document.querySelector('#moduleBrand').innerHTML=esc(data.keyword)+'<small>Visual Study · '+data.questions.length+' Learning Layers</small>';
    document.getElementById('progress').setAttribute('aria-valuemax',String(data.questions.length));
    const renderCard=(q,i)=>{
      const opts=q.options.map((opt,j)=>'<label><input name="q'+(i+1)+'" type="radio" value="'+('abcd'[j])+'"><span class="answer-text"><strong class="option-letter">'+('ABCD'[j])+'.</strong> '+opt+'</span></label>').join('');
      return '<section class="question" data-answer="'+esc(q.answer)+'"><div class="q-head"><span class="q-badge">LAYER '+(i+1)+'</span><span class="q-tag">'+esc(q.tag)+'</span></div><figure class="q-fig">'+q.figure+'</figure><p class="q-text">'+q.stem+'</p><fieldset class="answer-choices"><legend class="sr-only">Choose the best answer for layer '+(i+1)+'</legend>'+opts+'</fieldset><div class="explanation" aria-live="polite">'+q.explanation+'</div></section>';
    };
    root.innerHTML='<h1>'+esc(data.title)+'</h1><p class="sub">'+esc(data.subtitle)+'</p>'+data.hero+
      '<div id="result" role="status" aria-live="polite"></div><form id="quiz">'+data.questions.map(renderCard).join('')+'</form>'+
      '<div class="actions"><button id="checkBtn" type="button">Check Answers</button><button id="resetBtn" type="button">Reset</button></div>'+
      (data.sources||'')+'<p class="footer">'+esc(data.footer||data.keyword+' · Visual study module · 15 themes')+'</p>';
    await import('./quiz-theme.js');
  }catch(error){
    document.getElementById('themeMenu').style.display='none';
    root.innerHTML='<h1>Unable to open lesson</h1><p class="sub">'+esc(error.message)+'</p><p><a href="./">Back to the study library</a></p>';
    console.error(error);
  }
})();