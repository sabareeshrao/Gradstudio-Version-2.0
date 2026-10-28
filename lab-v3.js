const LAB3_HTML="<header class=\"lab3-head\"><div><span class=\"lab3-eyebrow\">THREE INTERACTIVE EXPERIMENTS / OFFLINE SIMULATION</span><h2>Concept Lab</h2><p>Change the input, watch the mechanism, then choose what you would do as a developer. Values and outputs are for teaching, not actual model inference.</p></div><svg viewBox=\"0 0 64 64\" class=\"lab3-icon\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M32 12c-10-10-21 2-18 12-9 6-5 18 3 21-1 10 10 15 15 8 5 7 17 2 15-8 9-3 13-16 3-21 3-10-9-22-18-12Z\"/><path d=\"M32 12v41M25 26c-9-2-12 6-9 11M39 26c9-2 12 6 9 11\"/></svg></header>\n<div class=\"lab3-unit\"><div class=\"lab3-title\"><span>01</span><div><h3>Which image matches your sentence?</h3><p>Compare a text embedding with three image embeddings and watch the nearest image change.</p></div></div>\n<div class=\"lab3-query\"><strong>TEXT QUERY</strong><div id=\"lab3-queries\" class=\"lab3-buttonset\"><button type=\"button\" class=\"active\" data-query=\"dog\" aria-pressed=\"true\">A dog on the beach</button><button type=\"button\" data-query=\"cat\" aria-pressed=\"false\">A curious cat</button><button type=\"button\" data-query=\"car\" aria-pressed=\"false\">A blue car</button></div><div class=\"lab3-pipeline\"><span id=\"lab3-query-label\">“A dog on the beach”</span><b>→</b><div class=\"lab3-encoder\"><svg viewBox=\"0 0 64 64\" class=\"lab3-icon\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"14\" r=\"5\"/><circle cx=\"52\" cy=\"14\" r=\"5\"/><circle cx=\"32\" cy=\"51\" r=\"5\"/><path d=\"M16 18l13 28M48 18L35 46M18 14h28\"/></svg> Text encoder</div><b>→</b><div id=\"lab3-vector\" class=\"lab3-vector\"></div></div></div>\n<div class=\"lab3-row-heading\"><div><strong>Image similarity ranking</strong><small>Example cosine-similarity visualization</small></div><span id=\"lab3-best\" class=\"lab3-status\">Best: dog</span></div>\n<div id=\"lab3-images\" class=\"lab3-image-row\"><button type=\"button\" class=\"lab3-image\" data-image=\"dog\" aria-pressed=\"true\"><div class=\"lab3-art\"><svg viewBox=\"0 0 150 132\" class=\"lab3-picture\" role=\"img\" aria-label=\"Illustrated dog\"><rect width=\"150\" height=\"132\" fill=\"#e5f1ed\" rx=\"14\"/><circle cx=\"119\" cy=\"27\" r=\"17\" fill=\"#f4cf9e\"/><path d=\"M0 112q75-15 150 0v20H0z\" fill=\"#abd0c5\"/><path d=\"M20 92l20-22 10-22 17 5 14 19 30-1 20-15 5 10-15 25-20 2-4 21-12 1-3-20-28 1-6 19H32l5-21Z\" fill=\"#6c5141\"/><path d=\"M48 54L28 41l3 32 17 1\" fill=\"#926e56\"/><circle cx=\"75\" cy=\"70\" r=\"3\" fill=\"#fff\"/></svg></div><div class=\"lab3-image-label\"><strong>Dog</strong><span class=\"rank\">#1</span></div><div class=\"lab3-meter\"><i></i></div><small class=\"score\">—</small></button><button type=\"button\" class=\"lab3-image\" data-image=\"cat\" aria-pressed=\"false\"><div class=\"lab3-art\"><svg viewBox=\"0 0 150 132\" class=\"lab3-picture\" role=\"img\" aria-label=\"Illustrated cat\"><rect width=\"150\" height=\"132\" fill=\"#e5f1ed\" rx=\"14\"/><circle cx=\"119\" cy=\"27\" r=\"17\" fill=\"#f4cf9e\"/><path d=\"M0 112q75-15 150 0v20H0z\" fill=\"#abd0c5\"/><path d=\"M43 48L35 21l27 19 19-20 8 29c14 18 10 41-3 53-13 11-32 13-45 1-14-14-14-38 2-55Z\" fill=\"#b18d75\"/><path d=\"M45 41l-5-12 13 10M77 39l2-11-11 10\" fill=\"#f0cdba\"/><ellipse cx=\"49\" cy=\"74\" rx=\"4\" ry=\"5\" fill=\"#35434a\"/><ellipse cx=\"76\" cy=\"74\" rx=\"4\" ry=\"5\" fill=\"#35434a\"/><path d=\"M58 87l5 6 5-6Z\" fill=\"#6d4c43\"/><path d=\"M40 87L21 82M40 94L21 98M86 87l19-5M86 94l19 4\" stroke=\"#6d4c43\" stroke-width=\"2\"/></svg></div><div class=\"lab3-image-label\"><strong>Cat</strong><span class=\"rank\">#2</span></div><div class=\"lab3-meter\"><i></i></div><small class=\"score\">—</small></button><button type=\"button\" class=\"lab3-image\" data-image=\"car\" aria-pressed=\"false\"><div class=\"lab3-art\"><svg viewBox=\"0 0 150 132\" class=\"lab3-picture\" role=\"img\" aria-label=\"Illustrated car\"><rect width=\"150\" height=\"132\" fill=\"#e5f1ed\" rx=\"14\"/><circle cx=\"119\" cy=\"27\" r=\"17\" fill=\"#f4cf9e\"/><path d=\"M0 112q75-15 150 0v20H0z\" fill=\"#abd0c5\"/><path d=\"M18 83l15-32 11-8h55l13 10 13 32-3 24H17Z\" fill=\"#5682b1\"/><path d=\"M43 52h51l11 27H31Z\" fill=\"#e0f0f5\"/><path d=\"M67 52v28\" stroke=\"#85a8c8\" stroke-width=\"3\"/><rect x=\"17\" y=\"90\" width=\"106\" height=\"18\" rx=\"6\" fill=\"#4c73a3\"/><circle cx=\"37\" cy=\"107\" r=\"13\" fill=\"#29394b\"/><circle cx=\"102\" cy=\"107\" r=\"13\" fill=\"#29394b\"/><circle cx=\"37\" cy=\"107\" r=\"5\" fill=\"#e9f3f6\"/><circle cx=\"102\" cy=\"107\" r=\"5\" fill=\"#e9f3f6\"/></svg></div><div class=\"lab3-image-label\"><strong>Car</strong><span class=\"rank\">#3</span></div><div class=\"lab3-meter\"><i></i></div><small class=\"score\">—</small></button></div>\n<div class=\"lab3-insight\"><svg viewBox=\"0 0 64 64\" class=\"lab3-icon\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M32 8l6 18 18 6-18 6-6 18-6-18-18-6 18-6z\"/></svg><div><strong id=\"lab3-match-title\">Nearest match</strong><p id=\"lab3-match-note\">Choose any image to compare its vector with the sentence.</p></div></div><p class=\"lab3-disclaimer\">All vectors and displayed scores are invented for illustration; these are not CLIP measurements or confidence estimates.</p></div>\n<div class=\"lab3-rule\"></div>\n<div class=\"lab3-unit\"><div class=\"lab3-title\"><span>02</span><div><h3>AI adaptation studio</h3><p>Keep the same retail product. Discover the difference between instructions, retrieved context, and training.</p></div></div>\n<div class=\"lab3-product-brief\"><span>PRODUCT BRIEF</span><div><strong>Trail Bottle · 600 ml</strong><small>The retailer wants descriptions that reflect brand tone and recent customer information.</small></div><svg viewBox=\"0 0 64 64\" class=\"lab3-icon\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 7h26l10 11v39H15zM41 7v12h10M23 31h21M23 40h21M23 49h14\"/></svg></div>\n<div id=\"lab3-methods\" class=\"lab3-methods\"><button type=\"button\" class=\"active\" data-method=\"prompt\" aria-pressed=\"true\"><svg viewBox=\"0 0 64 64\" class=\"lab3-icon\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 7h26l10 11v39H15zM41 7v12h10M23 31h21M23 40h21M23 49h14\"/></svg><span><b>Prompt</b><small>Instructions</small></span></button><button type=\"button\" data-method=\"rag\" aria-pressed=\"false\"><svg viewBox=\"0 0 64 64\" class=\"lab3-icon\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"27\" cy=\"27\" r=\"16\"/><path d=\"M39 39l16 16\"/></svg><span><b>RAG</b><small>Evidence</small></span></button><button type=\"button\" data-method=\"tune\" aria-pressed=\"false\"><svg viewBox=\"0 0 64 64\" class=\"lab3-icon\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"14\" r=\"5\"/><circle cx=\"52\" cy=\"14\" r=\"5\"/><circle cx=\"32\" cy=\"51\" r=\"5\"/><path d=\"M16 18l13 28M48 18L35 46M18 14h28\"/></svg><span><b>Finetuning</b><small>Weights</small></span></button></div>\n<div class=\"lab3-studio\"><div class=\"lab3-control\">\n<div id=\"lab3-prompt-panel\"><strong>CHANGE INSTRUCTIONS</strong><p>Pick a brand voice. The example output changes without updating model weights.</p><div class=\"lab3-buttonset\" id=\"lab3-voices\"><button type=\"button\" class=\"active\" data-voice=\"friendly\" aria-pressed=\"true\">Friendly</button><button type=\"button\" data-voice=\"minimal\" aria-pressed=\"false\">Minimal</button><button type=\"button\" data-voice=\"premium\" aria-pressed=\"false\">Premium</button></div><blockquote id=\"lab3-instruction\">Write in a warm, everyday tone.</blockquote></div>\n<div id=\"lab3-rag-panel\" hidden><strong>RETRIEVE CURRENT CONTEXT</strong><p>Choose whether to include a recent review. The model does not need to memorize the review.</p><label class=\"lab3-rag-switch\"><input type=\"checkbox\" id=\"lab3-rag-enabled\" checked> Add retrieved customer review</label><blockquote id=\"lab3-review\">“Keeps water cold throughout my commute.”</blockquote><small>Illustrative review provided at request time</small></div>\n<div id=\"lab3-tune-panel\" hidden><strong>UPDATE MODEL PARAMETERS</strong><p>Compare a generic baseline with a scripted example of behavior after further training.</p><div class=\"lab3-buttonset\" id=\"lab3-training\"><button type=\"button\" class=\"active\" data-training=\"before\" aria-pressed=\"true\">Before</button><button type=\"button\" data-training=\"after\" aria-pressed=\"false\">After</button></div><div id=\"lab3-network\" class=\"lab3-network\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><small id=\"lab3-network-label\">Starting weights</small></div>\n</div><div class=\"lab3-preview\"><div class=\"lab3-preview-header\"><span class=\"lab3-dot\"></span> SAMPLE PRODUCT PAGE <small>Prewritten demonstration</small></div><div class=\"lab3-preview-body\"><div class=\"lab3-bottle-scene\"><span class=\"lab3-bottle\"></span></div><div><small>HYDRATION / TRAIL BOTTLE</small><h4 id=\"lab3-preview-heading\">Hydration that follows your day</h4><p id=\"lab3-preview-copy\">Meet the Trail Bottle: an easy way to take water along on the go.</p></div></div><span class=\"lab3-weights\" id=\"lab3-weights\">Model weights unchanged</span><p class=\"lab3-preview-note\" id=\"lab3-preview-note\">Instructions changed; model parameters stayed fixed.</p></div></div>\n<div class=\"lab3-insight\"><svg viewBox=\"0 0 64 64\" class=\"lab3-icon\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M32 8l6 18 18 6-18 6-6 18-6-18-18-6 18-6z\"/></svg><div><strong>What changed?</strong><p id=\"lab3-mechanism\">Prompting adjusts the instructions supplied at request time.</p></div></div></div>\n<div class=\"lab3-rule\"></div>\n<div class=\"lab3-unit\"><div class=\"lab3-title\"><span>03</span><div><h3>Choose the engineering approach</h3><p>Try a real-world decision; get feedback explaining why the choice fits.</p></div></div>\n<div id=\"lab3-cases\" class=\"lab3-buttonset\"><button type=\"button\" data-case=\"voice\" class=\"active\" aria-pressed=\"true\">Wrong brand tone</button><button type=\"button\" data-case=\"recent\" aria-pressed=\"false\">New customer reviews</button><button type=\"button\" data-case=\"persistent\" aria-pressed=\"false\">Repeated style failures</button></div>\n<div id=\"lab3-case-question\" class=\"lab3-case\">The content is accurate but too formal. What should you try first?</div><div id=\"lab3-case-choices\" class=\"lab3-buttonset\"><button type=\"button\" data-choice=\"prompt\">Prompt engineering</button><button type=\"button\" data-choice=\"rag\">RAG</button><button type=\"button\" data-choice=\"tune\">Finetuning</button></div><div id=\"lab3-feedback\" class=\"lab3-feedback\" role=\"status\">Choose an approach to reveal the reasoning.</div></div>";

(function(){
'use strict';
const holder=document.getElementById('concept-lab');
if(!holder)return;
holder.className='lab lab-v3';
holder.innerHTML=LAB3_HTML;
const VECTORS={text:{dog:[.92,.15,.1],cat:[.61,.77,.18],car:[-.58,.02,.8]},image:{dog:[.88,.22,.09],cat:[.67,.72,.21],car:[-.52,-.06,.84]}};
let query='dog',selected='dog';
const qlabels={dog:'“A dog on the beach”',cat:'“A curious cat”',car:'“A blue car”'};
const similarity=(a,b)=>a.reduce((t,v,i)=>t+v*b[i],0)/(Math.hypot(...a)*Math.hypot(...b));
function toggleActive(selector,attr,value){
 document.querySelectorAll(selector).forEach(b=>{const active=b.dataset[attr]===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
}
function matching(){
 const vector=VECTORS.text[query];
 const ranks=Object.entries(VECTORS.image).map(([key,v])=>({key,sim:similarity(vector,v)})).sort((a,b)=>b.sim-a.sim);
 document.getElementById('lab3-query-label').textContent=qlabels[query];
 document.getElementById('lab3-vector').innerHTML=vector.map(n=>'<i>'+n.toFixed(2)+'</i>').join('');
 document.getElementById('lab3-best').textContent='Best: '+ranks[0].key;
 toggleActive('#lab3-queries button','query',query);
 ranks.forEach((x,i)=>{
  const card=document.querySelector('#lab3-images [data-image="'+x.key+'"]');
  const percent=Math.round((1+x.sim)*50);
  card.style.order=i;card.classList.toggle('winner',i===0);
  card.classList.toggle('inspected',selected===x.key);card.setAttribute('aria-pressed',String(selected===x.key));
  card.querySelector('.rank').textContent='#'+(i+1);
  card.querySelector('.lab3-meter i').style.width=Math.max(2,Math.min(100,percent))+'%';
  card.querySelector('.score').textContent=percent+'% similarity';
 });
 const match=ranks.find(x=>x.key===selected);
 const best=ranks[0].key;
 document.getElementById('lab3-match-title').textContent=selected===best?'Nearest match: '+best:'Inspecting '+selected;
 document.getElementById('lab3-match-note').textContent='The '+selected+' image and this sentence have an illustrative cosine-based score of '+Math.round((1+match.sim)*50)+'%. '+(selected===best?'Their vectors point in the closest directions in this example.':'The '+best+' image scores higher. Try a different sentence and compare.');
}
document.querySelectorAll('#lab3-queries button').forEach(b=>b.addEventListener('click',()=>{query=b.dataset.query;selected=query;matching();}));
document.querySelectorAll('#lab3-images button').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.image;matching();}));
matching();
const VOICES={
friendly:['Write in a warm, everyday tone.','Hydration that follows your day','Meet the Trail Bottle: an easy way to take water along on the go.'],
minimal:['Write directly, avoiding marketing filler.','Trail Bottle · 600 ml','A reusable 600 ml bottle for everyday hydration and carrying.'],
premium:['Use refined language without unsupported claims.','A considered everyday essential','The 600 ml Trail Bottle brings thoughtful simplicity to a daily routine.']
};
let method='prompt',voice='friendly',rag=true,training='before';
function render(){
 toggleActive('#lab3-methods button','method',method);
 ['prompt','rag','tune'].forEach(m=>document.getElementById('lab3-'+m+'-panel').hidden=(m!==method));
 const title=document.getElementById('lab3-preview-heading'),text=document.getElementById('lab3-preview-copy');
 const pill=document.getElementById('lab3-weights'),note=document.getElementById('lab3-preview-note'),mechanism=document.getElementById('lab3-mechanism');
 pill.classList.remove('updated');
 if(method==='prompt'){
  toggleActive('#lab3-voices button','voice',voice);
  document.getElementById('lab3-instruction').textContent=VOICES[voice][0];
  title.textContent=VOICES[voice][1];text.textContent=VOICES[voice][2];
  pill.textContent='Model weights unchanged';
  note.textContent='Only the instruction and the scripted writing style changed.';
  mechanism.textContent='Prompt engineering changes instructions, examples or task framing, not the trained model parameters.';
 }else if(method==='rag'){
  document.getElementById('lab3-rag-enabled').checked=rag;
  document.getElementById('lab3-review').classList.toggle('disabled-review',!rag);
  title.textContent='Trail Bottle · 600 ml';
  text.textContent=rag?'A reusable bottle for everyday use. A recent reviewer says it kept their water cold during a commute.':'A reusable 600 ml bottle for everyday carrying. No recent customer review was provided.';
  pill.textContent='Model weights unchanged';
  note.textContent=rag?'A review was retrieved and cited as contextual evidence.':'The description omits details not present in the provided context.';
  mechanism.textContent=rag?'RAG retrieves external evidence and supplies it at response time without updating the model weights.':'Retrieval is disabled; the response should not assume access to recent customer reviews.';
 }else{
  const after=training==='after';
  toggleActive('#lab3-training button','training',training);
  document.getElementById('lab3-network').classList.toggle('trained',after);
  document.getElementById('lab3-network-label').textContent=after?'Conceptually updated weights':'Starting weights';
  title.textContent=after?'Ready for the road ahead':'A high-quality hydration solution';
  text.textContent=after?'Fill your Trail Bottle, head out, and keep hydration simple throughout your day.':'This excellent product offers reliable hydration and great everyday value.';
  pill.textContent=after?'Model weights updated':'Model weights unchanged';pill.classList.toggle('updated',after);
  note.textContent=after?'Illustrative behavior after training; not a measured result.':'Illustrative output from the original model.';
  mechanism.textContent=after?'Finetuning performs further training and changes model parameters; real improvements require evaluation.':'The original trained model has not yet been modified.';
 }
}
document.querySelectorAll('#lab3-methods button').forEach(b=>b.addEventListener('click',()=>{method=b.dataset.method;render();}));
document.querySelectorAll('#lab3-voices button').forEach(b=>b.addEventListener('click',()=>{voice=b.dataset.voice;render();}));
document.getElementById('lab3-rag-enabled').addEventListener('change',e=>{rag=e.target.checked;render();});
document.querySelectorAll('#lab3-training button').forEach(b=>b.addEventListener('click',()=>{training=b.dataset.training;render();}));
render();
const CASES={
voice:['The content is accurate but too formal. What should you try first?','prompt','Try clearer tone instructions and examples before changing the model.'],
recent:['Reviews change daily and the model needs fresh evidence. Which technique directly supplies it?','rag','Retrieval supplies up-to-date evidence at the moment of the request.'],
persistent:['Even after careful prompts and relevant context, the model consistently misses an important style pattern. What might you evaluate next?','tune','Finetuning is worth testing for persistent behavioral gaps, with curated examples and measurable outcomes.']
};
let caseId='voice';
function pickCase(id){
 caseId=id;toggleActive('#lab3-cases button','case',id);
 document.getElementById('lab3-case-question').textContent=CASES[id][0];
 document.querySelectorAll('#lab3-case-choices button').forEach(b=>b.classList.remove('correct','wrong'));
 const out=document.getElementById('lab3-feedback');out.className='lab3-feedback';out.textContent='Choose an approach to reveal the reasoning.';
}
document.querySelectorAll('#lab3-cases button').forEach(b=>b.addEventListener('click',()=>pickCase(b.dataset.case)));
document.querySelectorAll('#lab3-case-choices button').forEach(b=>b.addEventListener('click',()=>{
 const ok=b.dataset.choice===CASES[caseId][1];
 document.querySelectorAll('#lab3-case-choices button').forEach(x=>x.classList.remove('correct','wrong'));
 b.classList.add(ok?'correct':'wrong');
 const out=document.getElementById('lab3-feedback');out.className='lab3-feedback '+(ok?'ok':'no');
 out.textContent=(ok?'Correct. ':'Not the best first choice. ')+CASES[caseId][2];
}));
pickCase('voice');
})();