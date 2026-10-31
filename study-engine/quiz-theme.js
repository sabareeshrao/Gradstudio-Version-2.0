'use strict';
const quiz=document.getElementById('quiz'),questions=[...quiz.querySelectorAll('.question')],counter=document.getElementById('counter'),progressFill=document.getElementById('progressFill'),progress=document.getElementById('progress'),resultBox=document.getElementById('result');
function updateProgress(){const n=questions.filter(q=>q.querySelector('input:checked')).length;counter.textContent=n+' / '+questions.length;progressFill.style.width=(n/questions.length*100)+'%';progress.setAttribute('aria-valuenow',String(n));}
quiz.addEventListener('change',updateProgress);updateProgress();
/* Keep the visible label and accessibility state in sync. */
function updateRevealLabel(q,open){
  const button=q.querySelector('.reveal-toggle');
  if(!button)return;
  const label=open?'Hide':'Reveal';
  button.textContent=label;
  button.setAttribute('aria-expanded',String(open));
  button.setAttribute('aria-label',label+' answer for '+(q.querySelector('.q-badge')?.textContent||'question'));
}
/* Reveal one question's answer and explanation without selecting an option or grading. */
function setQuestionReveal(q,open){
  const button=q.querySelector('.reveal-toggle');
  const explanation=q.querySelector('.explanation');
  if(!button||!explanation)return;
  updateRevealLabel(q,open);
  explanation.style.display=open?'block':'none';
  q.querySelectorAll('label.revealed-opt').forEach(label=>label.classList.remove('revealed-opt'));
  if(open){
    const right=[...q.querySelectorAll('input[type="radio"]')].find(input=>input.value===q.dataset.answer);
    right?.closest('label')?.classList.add('revealed-opt');
  }else{
    q.querySelector('.explanation-deep')?.removeAttribute('open');
  }
}
quiz.addEventListener('click',event=>{
  const button=event.target.closest('.reveal-toggle');
  if(!button||!quiz.contains(button))return;
  const q=button.closest('.question');
  if(!q)return;
  setQuestionReveal(q,button.getAttribute('aria-expanded')!=='true');
});

document.getElementById('checkBtn').addEventListener('click',()=>{let score=0,unanswered=0;questions.forEach(q=>{q.classList.remove('correct','incorrect');q.querySelectorAll('label').forEach(l=>l.classList.remove('correct-opt','incorrect-opt'));const selected=q.querySelector('input:checked'),correct=q.dataset.answer;const correctInput=[...q.querySelectorAll('input')].find(i=>i.value===correct);if(correctInput)correctInput.closest('label').classList.add('correct-opt');if(!selected){unanswered++;q.classList.add('incorrect');}else if(selected.value===correct){score++;q.classList.add('correct');}else{q.classList.add('incorrect');selected.closest('label').classList.add('incorrect-opt');}q.querySelector('.explanation-deep')?.removeAttribute('open');q.querySelector('.explanation').style.display='block';updateRevealLabel(q,true);});const p=Math.round(score/questions.length*100);const msg=p===100?'Great work — you finished every layer.':p>=71?'Good progress. Review the layers you missed.':'Try again, starting from the first question.';resultBox.innerHTML='<div class="score">Score: '+score+' / '+questions.length+' ('+p+'%)</div><div class="msg">'+msg+(unanswered?' '+unanswered+' unanswered question(s).':'')+'</div>';resultBox.style.display='block';resultBox.scrollIntoView({behavior:'smooth',block:'start'});});
document.getElementById('resetBtn').addEventListener('click',()=>{quiz.reset();questions.forEach(q=>{q.classList.remove('correct','incorrect');q.querySelectorAll('label').forEach(l=>l.classList.remove('correct-opt','incorrect-opt'));q.querySelector('.explanation-deep')?.removeAttribute('open');q.querySelector('.explanation').style.display='none';q.querySelectorAll('label.revealed-opt').forEach(l=>l.classList.remove('revealed-opt'));updateRevealLabel(q,false);});resultBox.style.display='none';resultBox.innerHTML='';updateProgress();window.scrollTo({top:0,behavior:'smooth'});});
const THEMES=[
{id:'sunset',name:'Sunset Orange',a:'#bd511b',dark:'#783714',mid:'#e79a68',soft:'#fff0e5',border:'#f2cbb5',bg:'#fffaf6',surface:'#fde7d6',canvas:'#fff8f2',mode:'light'},
{id:'forest',name:'Forest Green',a:'#23784b',dark:'#185534',mid:'#74ba8c',soft:'#e8f6ec',border:'#b9dfc2',bg:'#f7fcf8',surface:'#dff0e4',canvas:'#f2faf4',mode:'light'},
{id:'sky',name:'Sky Blue',a:'#0878B6',dark:'#145879',mid:'#79C8EF',soft:'#EAF8FF',border:'#ADDDF7',bg:'#F4FBFF',surface:'#DDF3FF',canvas:'#ECF8FF',mode:'light'},
{id:'rose',name:'Rose Quartz',a:'#b23e70',dark:'#82264f',mid:'#e194b4',soft:'#ffedf3',border:'#f2c5d4',bg:'#fff9fb',surface:'#fbe0e9',canvas:'#fff3f7',mode:'light'},
{id:'midnight',name:'Midnight Indigo',a:'#3a4b9d',dark:'#27336c',mid:'#8999dc',soft:'#e9edff',border:'#c1caf0',bg:'#f4f5fc',surface:'#dce2fa',canvas:'#eef1fe',mode:'light'},
{id:'cocoa',name:'Cocoa After Dark',a:'#BD8D6B',dark:'#71462E',mid:'#E2B38C',soft:'#FAF0E7',border:'#E3C8B4',bg:'#291A17',surface:'#F3DCC6',canvas:'#FFF6EC',mode:'dark'},
{id:'paper',name:'Ivory Ink',a:'#145458',dark:'#0B4045',mid:'#6B9496',soft:'#F5EAD9',border:'#E1CFB4',bg:'#FFE8C9',surface:'#F2D9B5',canvas:'#FFF3E3',mode:'light'},
{id:'obsidian',name:'Obsidian Black',a:'#252D36',dark:'#1B222A',mid:'#9CA8B3',soft:'#E8ECEF',border:'#CCD4DB',bg:'#EBEEF0',surface:'#DDE3E7',canvas:'#F1F3F5',mode:'light'},
{id:'lemon',name:'Electric Lemon',a:'#DDE748',dark:'#4D550C',mid:'#F7FC9F',soft:'#F7FBE1',border:'#DCE49A',bg:'#18231A',surface:'#EBEEC7',canvas:'#F8FBEF',mode:'dark'},
{id:'glacier',name:'Glacier Ice',a:'#75D4FF',dark:'#075376',mid:'#A7E7FF',soft:'#E9F8FF',border:'#BDE7F7',bg:'#0A2C45',surface:'#DBF4FF',canvas:'#F0FBFF',mode:'dark'},
{id:'scarlet',name:'Scarlet Signal',a:'#FF6860',dark:'#8E1E24',mid:'#FFB5A6',soft:'#FFF0EC',border:'#FFCCBE',bg:'#33141B',surface:'#FFE2D9',canvas:'#FFF5F0',mode:'dark'},
{id:'jade',name:'Jade Neon',a:'#59E7BC',dark:'#076B53',mid:'#AFFFE1',soft:'#E2FFF2',border:'#B9ECD8',bg:'#06352F',surface:'#D9F8E8',canvas:'#EFFCF7',mode:'dark'},
{id:'peach',name:'Peach Noir',a:'#FFD0A1',dark:'#90512E',mid:'#FFE3C7',soft:'#FFF2E6',border:'#F2D2B4',bg:'#2B1639',surface:'#FAE2CC',canvas:'#FFF8EF',mode:'dark'},
{id:'carbon',name:'Carbon Contrast',a:'#D0D4D9',dark:'#2C3339',mid:'#F0F1F3',soft:'#F5F6F7',border:'#D4D9DE',bg:'#111214',surface:'#E9ECEE',canvas:'#FCFDFE',mode:'dark'},
{id:'cobalt',name:'Electric Cobalt',a:'#8195FF',dark:'#3145A0',mid:'#BBC8FF',soft:'#EDF0FF',border:'#CBD4FF',bg:'#111B43',surface:'#E7ECFF',canvas:'#F4F5FF',mode:'dark'}
];
const menu=document.getElementById('themeMenu'),toggle=document.getElementById('themeToggle'),panel=document.getElementById('themePanel'),choices=document.getElementById('themeChoices'),hint=document.getElementById('themeHint');let activeTheme='sunset';function setMenu(open){panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));}toggle.addEventListener('click',()=>setMenu(panel.hidden));document.addEventListener('pointerdown',e=>{if(!menu.contains(e.target))setMenu(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){setMenu(false);toggle.focus();}});
function chooseTheme(id,save){const t=THEMES.find(o=>o.id===id)||THEMES[0];activeTheme=t.id;const vals={'--accent':t.a,'--accent-dark':t.dark,'--accent-mid':t.mid,'--accent-soft':t.soft,'--accent-border':t.border,'--border':t.border,'--bg':t.bg,'--lab-surface':t.surface,'--lab-canvas':t.canvas};Object.entries(vals).forEach(([k,v])=>document.documentElement.style.setProperty(k,v));document.documentElement.classList.toggle('theme-dark',t.mode==='dark');document.getElementById('themeIndicator').style.background=t.a;hint.textContent='Active: '+t.name;[...choices.children].forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===id)));if(save){try{const url=new URL(location.href);url.searchParams.set('theme',t.id);history.replaceState(null,'',url);localStorage.setItem('gradstudio-theme',t.id);}catch(e){}}}
THEMES.forEach((t,i)=>{const b=document.createElement('button');b.type='button';b.className='theme-choice';b.dataset.theme=t.id;b.setAttribute('aria-pressed','false');b.setAttribute('aria-label',t.name+' theme');b.innerHTML='<span class="theme-swatch" style="--sbg:'+t.bg+';--sac:'+t.a+'"></span><strong>'+String(i+1).padStart(2,'0')+'. '+t.name+'</strong>';b.addEventListener('click',()=>{chooseTheme(t.id,true);setMenu(false);toggle.focus()});choices.appendChild(b)});let initial='sunset';try{initial=new URLSearchParams(location.search).get('theme')||localStorage.getItem('gradstudio-theme')||'sunset';}catch(e){}chooseTheme(initial,false);
document.getElementById('copyThemeUrl').addEventListener('click',async e=>{const b=e.currentTarget;try{const url=new URL(location.href);url.searchParams.set('theme',activeTheme);await navigator.clipboard.writeText(url.href);b.textContent='Copied!';}catch(ex){b.textContent='Use address bar';}setTimeout(()=>b.textContent='Copy link',1700)});