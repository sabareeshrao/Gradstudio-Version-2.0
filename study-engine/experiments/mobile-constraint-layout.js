/**
 * Constraint-first responsive Transformer diagram renderer.
 *
 * Unlike legacy absolute-position SVGs, these seven mobile compositions are
 * expressed as semantic elements with flow/grid constraints. No absolute
 * coordinates for labels, no overflow-x, and no image assets.
 *
 * This is an engineering adaptation of separation-constraint layout ideas,
 * NOT an execution of the original IPSep-CoLa/Cassowary research software.
 */
const ESC=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const el=(tag,cls,content)=>'<'+tag+' class="'+cls+'">'+content+'</'+tag+'>';
const pill=(text,kind='')=>el('span','cl-pill '+kind,ESC(text));
const pills=(a,kind='')=>el('div','cl-pills',a.map(t=>pill(t,kind)).join(''));
const heading=(title,desc)=>'<div class="cl-section-title"><strong>'+ESC(title)+'</strong>'+(desc?'<small>'+ESC(desc)+'</small>':'')+'</div>';
const panel=(title,desc,body)=>'<section class="cl-panel">'+heading(title,desc)+body+'</section>';
const down=()=>'<div class="cl-down" aria-hidden="true">↓</div>';
const steps=(array)=>el('div','cl-steps',array.map((x,i)=>el('div','cl-step',pill(String(i+1),'num')+'<strong>'+ESC(x)+'</strong>')).join(''));
const seq=(array,kind='')=>el('div','cl-sequence '+kind,array.map((x,i)=>(i?'<span class="cl-connector" aria-hidden="true">↓</span>':'')+el('div','cl-seq-node',ESC(x))).join(''));
const miniBars=(xs)=>'<div class="cl-bars" aria-label="Illustrative score bars">'+xs.map((height,i)=>'<div class="cl-bar-holder"><span style="height:'+Number(height)+'%" class="cl-bar '+(i===3?'em':'')+'"></span><small>'+['a','b','c','d','e'][i]+'</small></div>').join('')+'</div>';
const matrix=(n,rule)=>'<div class="cl-matrix" style="--n:'+n+'" role="img" aria-label="'+ESC(rule==='full'?'All positions permitted':rule==='causal'?'Only past and current positions':'Sparse local and global positions')+'">'+Array.from({length:n*n},(_,k)=>{const i=Math.floor(k/n),j=k%n,ok=rule==='full'||rule==='causal'&&j<=i||rule==='sparse'&&(Math.abs(i-j)<=1||j===0);return '<span class="cl-cell '+(ok?'on':'off')+'">'+(ok?'●':'·')+'</span>'}).join('')+'</div>';
const microNetwork=(type)=>'<svg class="cl-micro-svg" viewBox="0 0 310 130" role="img" aria-label="'+ESC(type==='rope'?'Position-dependent vector rotations':'Context token information flow')+'"><rect x="1" y="1" width="308" height="128" rx="12" fill="#f3faf8" stroke="#d7e7e2"/>'+ (type==='rope'?'<path d="M68 104 H246 M156 114 V15" fill="none" stroke="#b7cdd1" stroke-width="1.4"/><circle cx="156" cy="69" r="46" fill="none" stroke="#cbdcdd"/><path d="M156 69 L184 32 M156 69 L199 58 M156 69 L193 100" fill="none" stroke-width="3" stroke-linecap="round" stroke="#178f86"/><circle cx="184" cy="32" r="4" fill="#e8a54d"/><circle cx="199" cy="58" r="4" fill="#178f86"/><circle cx="193" cy="100" r="4" fill="#8262bb"/>':'<path d="M35 36 Q145 9 248 96 M35 98 Q155 56 248 96 M136 36 V84" stroke="#63baad" stroke-width="3" fill="none"/><circle cx="35" cy="36" r="17" fill="#d9f2eb" stroke="#32998d"/><circle cx="136" cy="36" r="17" fill="#d9f2eb" stroke="#32998d"/><circle cx="35" cy="98" r="17" fill="#f7ead6" stroke="#cb9854"/><circle cx="248" cy="96" r="23" fill="#0b8c80"/><text x="248" y="100" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">bank</text>')+'</svg>';
const qualityNote='<p class="cl-note">Responsive vector reflow: the technical concepts are preserved, while the original desktop artwork remains unchanged in its comparison variant.</p>';
const scenes=[
 (mode)=>panel('Token sequence','All positions contribute context',pills(['The','bank','approved','the','loan','.']))+
 panel('Contextual attention','The target token combines information from its sequence',microNetwork('context')+
 el('div','cl-key',pill('bank','focus')+' ← '+pill('approved')+' '+pill('loan')))+
 panel('Context-enriched representation','Attention produces context-dependent token states',seq(['Token attention','Weighted information','Updated vector'])),
 (mode)=>panel('RNN / LSTM','Hidden-state update is sequential',seq(['h₁ · first step','h₂ · waits for h₁','h₃ · waits for h₂','h₄ · waits for h₃']))+
 panel('Transformer','Tokens can be projected in parallel within a layer',pills(['Q₁/K₁/V₁','Q₂/K₂/V₂','Q₃/K₃/V₃','Q₄/K₄/V₄'])+down()+el('div','cl-emphasis','Shared multi-head self-attention layer'))+
 panel('Essential distinction','Parallel position processing does not make attention computation free',el('p','cl-summary','Recurrence introduces time-step dependency; self-attention permits parallel per-layer token processing.')),
 (mode)=>panel('1 · Tokenize','Convert input text into token IDs',pills(['A','small','robot','runs']))+
 panel('2 · Embed','Look up learned vectors and add position information',el('div','cl-small-grid',Array.from({length:12},(_,i)=>'<span style="--intensity:'+((i*3)%7+2)*.12+'"></span>').join('')))+
 panel('3 · Attention + FFN','Compute contextual representations',steps(['Q, K, V projections','Attention weights','Residual + feed-forward']))+
 panel('4 · Predict','Vocabulary logits and softmax probabilities',miniBars([24,54,43,85,38])),
 (mode)=>panel('Encoder pathway','Source tokens are encoded bidirectionally',seq(['Source embeddings + position','Multi-head self-attention','Residual · normalization · FFN','Encoder memory (K,V)']))+
 panel('Cross-attention bridge','Decoder queries source encoder memory',el('div','cl-emphasis','Encoder K,V → decoder cross-attention'))+
 panel('Decoder pathway','Causal mask blocks future target tokens',seq(['Shifted target embeddings','Masked self-attention','Cross-attention to encoder','FFN · Add & Norm','Vocabulary prediction'])),
 (mode)=>panel('Forward pass','Read the tensor flow in computation order',steps(['IDs [B,T]','Embeddings [B,T,D]','MHA with mask [B,T,D]','FFN + Norm [B,T,D]','Vocabulary logits [B,T,V]']))+
 panel('Illustrative PyTorch','Compact code sketch, not a standalone runnable training script',el('pre','cl-code',ESC('x = embed(ids) + pos\na, _ = mha(x,x,x,attn_mask=mask)\nh = norm(x + a + ffn(a))\nlogits = head(h)\nloss.backward()\noptimizer.step()')))+
 panel('Parameter update','Gradients propagate from loss to learnable weights',seq(['Loss','Backpropagation','Optimizer step'])),
 (mode)=>panel('BERT · Encoder-only','Bidirectional visibility: every token can see every token',matrix(4,'full'))+
 panel('GPT · Decoder-only','Causal visibility: future output tokens are masked',matrix(4,'causal'))+
 panel('T5 · Encoder–decoder','Decoder uses its own causal context plus encoded source states',seq(['Encoder source states (K,V)','Decoder query + cross-attention','Target-token output'])),
 (mode)=>panel('FlashAttention','Tiled exact attention reduces memory transfers',pills(['Q tiles','K/V tiles','On-chip computation']))+
 panel('Grouped-Query Attention','Multiple query heads share fewer KV heads',el('div','cl-heads',pills(['Q1','Q2','Q3','Q4'])+down()+pills(['KV1','KV2'],'kv')))+
 panel('Rotary Position Embeddings','Vector pairs rotate by token position',microNetwork('rope'))+
 panel('Sparse attention','Local neighborhoods and selected global connections',matrix(6,'sparse'))+
 panel('Distributed training','Model partitions and computation span multiple devices',pills(['GPU 1','GPU 2','GPU 3']))
];
function measureAndRepair(section){
 // Separation constraint: annotations must be normal-flow children;
 // resolve overflow by forcing every content child into a shrinkable box.
 for(const e of section.querySelectorAll('.cl-panel,.cl-pills,.cl-steps,.cl-sequence,.cl-code')){
   e.style.minWidth='0';e.style.maxWidth='100%';
 }
}
export function mountConstraintMobileLayout(root){
 const cards=[...root.querySelectorAll('.pb-card')];
 for(let i=0;i<cards.length;i++){
  const card=cards[i];
  card.querySelectorAll('.pb-variant').forEach(variant=>{
   const mode=variant.dataset.version;
   if(!['original','scisketch','paperbanana'].includes(mode))return;
   const head=variant.querySelector('.pb-version-heading');
   if(!head)return;
   const fig=document.createElement('div');
   fig.className='cl-mobile';
   fig.dataset.q=String(i+1);
   fig.dataset.mode=mode;
   fig.setAttribute('aria-label','Responsive '+mode+' Transformer question '+(i+1)+' diagram');
   fig.innerHTML='<header class="cl-header"><strong>Q'+(i+1)+' · '+mode.toUpperCase()+' · MOBILE</strong><span>Constraint-first, responsive technical diagram</span></header>'+
    scenes[i](mode)+qualityNote;
   head.after(fig);
   measureAndRepair(fig);
  });
 }
}
