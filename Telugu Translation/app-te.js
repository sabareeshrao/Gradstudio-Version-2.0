(async function startTeluguLesson(){
'use strict';
const root=document.getElementById('moduleRoot');
const slug=document.body.dataset.module || 'transformer';
if(!/^[a-z0-9-]+$/.test(slug))throw new Error('Invalid lesson slug');
const contentFile=slug==='transformer'?'./transformer.te.json':'./modules/'+slug+'.te.json';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
try{
  const res=await fetch(new URL(contentFile,import.meta.url),{cache:'no-cache'});
  if(!res.ok)throw new Error('పాఠం దొరకలేదు (HTTP '+res.status+')');
  let data=await res.json();
  // New lessons keep translation text separate from the canonical English figures.
  if(data.translationOverlay===true){
    const translated=data;
    const sourceRes=await fetch(new URL('../study-engine/modules/'+slug+'.json',import.meta.url),{cache:'no-cache'});
    if(!sourceRes.ok)throw new Error('Original English diagram data could not load (HTTP '+sourceRes.status+')');
    const source=await sourceRes.json();
    if(!Array.isArray(source.questions)||source.questions.length!==7||
       !Array.isArray(translated.questions)||translated.questions.length!==7)
      throw new Error('English/translated question count mismatch');
    data={...source,...translated,
      diagramStyle:'../study-engine/'+source.diagramStyle,
      hero:source.hero,
      questions:source.questions.map((original,i)=>({
        ...original,...translated.questions[i],answer:original.answer,figure:original.figure,
        technicalExplanation:translated.questions[i].technicalExplanation?.includes('Correct Answer:')
          ? translated.questions[i].technicalExplanation
          : '<strong>Correct Answer: '+original.answer.toUpperCase()+'.</strong> '+(translated.questions[i].technicalExplanation||'')
      }))
    };
  }
  if(data.language!=='te'||!Array.isArray(data.questions)||data.questions.length!==7||
     data.questions.some(q=>q.options?.length!==4||!['a','b','c','d'].includes(q.answer)||!q.figure))
    throw new Error('Lessonలో Q data సరిగా లేదు.');
  if(data.diagramStyle){
    const link=document.createElement('link');link.rel='stylesheet';
    link.href=new URL(data.diagramStyle,import.meta.url).href;
    await new Promise((resolve,reject)=>{link.onload=resolve;link.onerror=()=>reject(new Error('డయాగ్రామ్ శైలి లోడ్ కాలేదు'));document.head.appendChild(link)});
  }
  document.title=data.title+' — Gradstudio తెలుగు';
  document.getElementById('moduleBrand').innerHTML=esc(data.keyword)+'<small>Telugu + English Study · '+data.questions.length+' Questions</small>';
  const renderCard=(q,i)=>{
    const options=q.options.map((opt,j)=>'<label><input name="q'+(i+1)+'" type="radio" value="'+('abcd'[j])+'"><span class="answer-text"><strong class="option-letter">'+('ABCD'[j])+'.</strong> '+opt+'</span></label>').join('');
    const detailLabel=data.translationSource?.preserveEnglishExplanationStructure?'Read the detailed explanation':'Detailed Explanation · ఇంకా తెలుసుకోండి';
    const detail=q.technicalExplanation?'<details class="explanation-deep"><summary>'+detailLabel+'</summary><div class="explanation-deep-content">'+q.technicalExplanation+'</div></details>':'';
    return '<section class="question" data-answer="'+esc(q.answer)+'"><div class="q-head"><span class="q-badge">Q'+(i+1)+'</span><span class="q-tag">'+esc(q.tag)+'</span></div><figure class="q-fig">'+q.figure+'</figure><p class="q-text">'+esc(q.stem)+'</p><fieldset class="answer-choices"><legend class="sr-only">Q'+(i+1)+': Best Answer ఎంచుకోండి</legend>'+options+'</fieldset><div class="reveal-control-row"><button type="button" class="reveal-toggle" aria-expanded="false" aria-controls="te-reveal-explanation-'+(i+1)+'" aria-label="Reveal answer for question '+(i+1)+'">Reveal</button></div><div class="explanation" id="te-reveal-explanation-'+(i+1)+'" aria-live="polite"><div class="explanation-quick">'+q.explanation+'</div>'+detail+'</div></section>';
  };
  root.innerHTML='<h1>'+esc(data.title)+'</h1><p class="sub">'+esc(data.subtitle)+'</p>'+data.hero+
    '<div id="result" role="status" aria-live="polite"></div><form id="quiz">'+data.questions.map(renderCard).join('')+'</form>'+
    '<div class="actions"><button id="checkBtn" type="button">Check Answers · సమాధానాలు చూడండి</button><button id="resetBtn" type="button">Reset Quiz · మళ్లీ ప్రయత్నించండి</button></div>'+
    (data.sources||'')+'<p class="footer">'+esc(data.footer)+'</p>';
  // Shared mobile-fit fallback for English diagrams reused in Telugu lessons.
  try{const {mountResponsiveFigures}=await import('../study-engine/responsive-figures.js?v=20261101-fit-only-v2');mountResponsiveFigures(root,slug)}
  catch(e){console.warn('Responsive figure helper unavailable',e)}
  // Apply the shared visual safety check; Telugu wording and source remain untouched.
  try{const {normalizeSvgArrowheads}=await import('../study-engine/svg-arrowheads.js?v=20261101-slim-arrows');normalizeSvgArrowheads(root)}
  catch(e){console.warn('SVG arrowhead guard unavailable',e)}
  // Match English math rendering for bilingual lesson stems and explanations.
  // Typeset after dynamic HTML insertion; preserve original Telugu source data.
  try{
    const {renderMath}=await import('../study-engine/math-render.js?v=20261031-math-fix');
    renderMath(root);
  }catch(mathError){console.warn('Telugu math display fallback',mathError);}
  await import('./quiz-te.js?v=20261031-te-reveal-hide');
}catch(error){
  root.innerHTML='<h1>Lesson open కాలేదు</h1><p class="sub">'+esc(error.message)+'</p><p><a href="./">All Lessons</a></p>';
  console.error(error);
}
})();
