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
/* The top bar has a collapsed theme dropdown; study content never shows palette cards. */
(function browserApp(){
  'use strict';

  const DEFAULT_THEME='glacier';
  let activeTheme=DEFAULT_THEME;
  function setupThemeDropdown(){
    const dropdown=document.getElementById('themeDropdown');
    const disclosure=document.getElementById('themeMenu');
    const label=document.getElementById('themeName');
    function selectTheme(id,updateURL){
      const t=THEMES.find(x=>x.id===id)||THEMES.find(x=>x.id===DEFAULT_THEME);
      activeTheme=t.id;
      const vars={
        '--bg':t.bg,'--accent':t.a,'--accent-mid':t.mid,'--accent-dark':t.dark,
        '--accent-soft':t.soft,'--accent-border':t.border,'--canvas':t.canvas,
        '--surface':t.surface,'--on-accent':t.mode==='dark'?'#142938':'#ffffff',
        '--page-head':t.mode==='dark'?'#f4f9fc':'#263d50',
        '--page-muted':t.mode==='dark'?'#d3e2ec':'#526b7c',
        '--page-eyebrow':t.mode==='dark'?t.a:t.dark
      };
      Object.entries(vars).forEach(([key,val])=>document.documentElement.style.setProperty(key,val));
      document.body.classList.toggle('theme-light',t.mode==='light');
      document.body.classList.toggle('theme-dark',t.mode==='dark');
      label.textContent=t.name;
      dropdown.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===t.id)));
      if(updateURL && location.protocol!=='file:'){
        try{const u=new URL(location.href);u.searchParams.set('theme',t.id);history.replaceState(null,'',u.href);}catch(err){}
      }
      disclosure.open=false;
    }
    dropdown.replaceChildren();
    THEMES.forEach((t,i)=>{
      const b=document.createElement('button');
      b.type='button';b.dataset.theme=t.id;b.setAttribute('aria-pressed','false');
      const swatch=document.createElement('span');swatch.className='dropdown-dot';
      swatch.style.setProperty('--dot-accent',t.a);
      swatch.style.setProperty('--dot-bg',t.bg);
      const name=document.createElement('span');name.textContent=String(i+1).padStart(2,'0')+'. '+t.name;
      b.append(swatch,name);
      b.addEventListener('click',()=>selectTheme(t.id,true));
      dropdown.appendChild(b);
    });
    let initial=DEFAULT_THEME;
    try{
      const fromURL=new URL(location.href).searchParams.get('theme');
      if(THEMES.some(t=>t.id===fromURL))initial=fromURL;
    }catch(err){}
    selectTheme(initial,false);
    disclosure.addEventListener('keydown',e=>{
      if(e.key==='Escape'){disclosure.open=false;disclosure.querySelector('summary').focus();}
    });
    document.addEventListener('click',e=>{if(disclosure.open&&!disclosure.contains(e.target))disclosure.open=false;});
    const download=document.getElementById('downloadStandalone');
    download.addEventListener('click',async e=>{
      e.preventDefault();
      const filename='Web-API-Keyword-Study-001.html';
      try{
        let htmlText;
        if(document.documentElement.dataset.standalone==='true'){
          const clone=document.documentElement.cloneNode(true);
          clone.querySelector('#themeDropdown').replaceChildren();
          clone.querySelector('#quiz').replaceChildren();
          clone.querySelector('#result').replaceChildren();
          clone.querySelector('#result').hidden=true;
          htmlText='<!DOCTYPE html>\n'+clone.outerHTML;
        }else{
          const response=await fetch(download.getAttribute('href'),{cache:'no-store'});
          if(!response.ok)throw Error('Standalone file unavailable');
          htmlText=await response.text();
        }
        // Export the color the learner actually chose.
        htmlText=htmlText.replace("const DEFAULT_THEME='glacier';","const DEFAULT_THEME='"+activeTheme+"';");
        const url=URL.createObjectURL(new Blob([htmlText],{type:'text/html;charset=utf-8'}));
        const anchor=document.createElement('a');
        anchor.href=url;anchor.download=filename;
        document.body.appendChild(anchor);anchor.click();anchor.remove();
        setTimeout(()=>URL.revokeObjectURL(url),2000);
      }catch(err){
        // Direct checked-in, self-contained file remains downloadable if fetch fails.
        const anchor=document.createElement('a');
        anchor.href=download.getAttribute('href');anchor.download=filename;
        document.body.appendChild(anchor);anchor.click();anchor.remove();
      }
    });
  }

  const LETTERS=['a','b','c','d'];
  const questions=[
  {
    "level": "INTRODUCTION",
    "skill": "API vs Web API",
    "diagram": 1,
    "question": "What makes a Web API different from an API in general?",
    "choices": [
      "An API always needs internet access, but a Web API can work inside one program.",
      "A Web API works through web communication; other APIs can also work locally.",
      "A Web API must display web pages, while other APIs communicate only with servers.",
      "A Web API must always use REST, while other APIs can follow different styles."
    ],
    "correct": 1,
    "title": "A Web API is one kind of API.",
    "explain": "<p>An <strong>API</strong> is a set of rules that lets one piece of software use another. For example, a Java program can call a method from a library. That is an API, even if no network is involved.</p><p>A <strong>Web API</strong> lets applications communicate using web technologies, usually HTTP. For example, a shopping app can ask a store's server for product information. Web APIs do not have to use REST, and they do not have to display web pages.</p>",
    "why": "A general API does not always use the internet. A Web API is not the same thing as a website, and REST is only one possible design style."
  },
  {
    "level": "FUNDAMENTALS",
    "skill": "Why APIs matter",
    "diagram": 2,
    "question": "Why is a clear Web API useful when several apps need the same service?",
    "choices": [
      "It lets each app read the database directly without going through the service.",
      "It makes all apps use the same programming language as the backend server.",
      "It lets the server change inside while apps keep using the same agreed rules.",
      "It means apps never need to handle errors when the service is unavailable."
    ],
    "correct": 2,
    "title": "An API gives different apps a shared agreement.",
    "explain": "<p>Imagine a website and a mobile app that both show the same product list. Each can call <code>GET /products</code> rather than needing to know how the server stores or finds products.</p><p>That shared agreement is often called an <strong>API contract</strong>. It says what requests clients can make and what responses they can expect. The backend team can change the database or code without breaking clients, as long as the contract stays compatible.</p>",
    "why": "Clients should not bypass the server and access its database directly. A clear API also does not eliminate network failures or the need to handle errors."
  },
  {
    "level": "WORKING MECHANISM",
    "skill": "Request and response",
    "diagram": 3,
    "question": "What usually happens after a client sends a request to a Web API?",
    "choices": [
      "The server finds the route, checks the request, does the work, and replies.",
      "The server sends a reply first, then checks the request and finds the route.",
      "The client reads the database, then asks the server which route it should use.",
      "The server changes its database before it knows which request arrived."
    ],
    "correct": 0,
    "title": "A request travels through several steps before a response returns.",
    "explain": "<p>Suppose you open a product in a shopping app. The app sends a request such as <code>GET /products/42</code>. The server finds the matching route, checks whether the request is allowed, and runs the code that handles it.</p><p>The server may read a product from a database. It then sends a <strong>response</strong>, often with JSON data and a status such as <code>200 OK</code>. If something goes wrong, it sends an appropriate error instead.</p>",
    "why": "The server needs to understand and check the request before producing the final response. The client normally does not read the server's private database."
  },
  {
    "level": "TECHNICAL UNDERSTANDING",
    "skill": "Parts of an HTTP message",
    "diagram": 4,
    "question": "Which explanation of HTTP methods, paths, headers, and status codes is correct?",
    "choices": [
      "The path chooses an action; the method carries data; headers report success.",
      "The method stores the result; the path checks security; headers name the user.",
      "The method sets the format; the path stores data; status codes name routes.",
      "The method says what to do; the path says where; status codes show the result."
    ],
    "correct": 3,
    "title": "Each part of an HTTP request has a specific job.",
    "explain": "<p>Look at <code>GET /products/42</code>. <strong>GET</strong> is the HTTP method: it asks to read something. <strong>/products/42</strong> is the path: it identifies which product. <strong>Headers</strong> carry extra information, such as the accepted data format or login details.</p><p>Some requests also have a <strong>body</strong> that carries data—for example, the items in a new order. The server returns a <strong>status code</strong> to show what happened, such as <code>200</code> for success or <code>404</code> when a product cannot be found. The response body may contain data or an error message.</p>",
    "why": "Methods, paths, headers, bodies, and status codes have different roles. Mixing them up leads to confusing requests and responses."
  },
  {
    "level": "PRACTICAL APPLICATION",
    "skill": "Products and orders",
    "diagram": 5,
    "question": "Which routes would you use to list products, create an order, and read one order?",
    "choices": [
      "GET /products, then POST /orders, then GET /orders/{id}.",
      "POST /products, then GET /orders, then GET /orders/{id}.",
      "GET /products, then GET /orders, then POST /orders/{id}.",
      "GET /products, then POST /orders, then DELETE /orders/{id}."
    ],
    "correct": 0,
    "title": "Use resource names for paths and methods for actions.",
    "explain": "<p>A shop might use <code>GET /products</code> to show the product list. When a customer places an order, the app sends <code>POST /orders</code> with the order details. To view an existing order, it uses <code>GET /orders/8472</code>.</p><p>This design keeps routes easy to understand: <strong>products</strong> and <strong>orders</strong> are the things being managed. GET reads information; POST usually creates something. The server must still check prices, stock, and who is allowed to see each order.</p>",
    "why": "Creating an order should not be a GET request. DELETE removes a resource; it is not used to read order details."
  },
  {
    "level": "ADVANCED UNDERSTANDING",
    "skill": "Handling problems",
    "diagram": 6,
    "question": "Which HTTP status codes fit invalid data, missing login, missing items, and server errors?",
    "choices": [
      "404 for invalid data; 400 for missing login; 500 for missing items; 401 for server errors.",
      "500 for invalid data; 404 for missing login; 401 for missing items; 400 for server errors.",
      "400 for invalid data; 401 for missing login; 404 for missing items; 500 for server errors.",
      "401 for invalid data; 500 for missing login; 400 for missing items; 404 for server errors."
    ],
    "correct": 2,
    "title": "Clear error codes help the client know what to do next.",
    "explain": "<p>If a customer sends invalid order details, the API can return <code>400 Bad Request</code>. If login details are missing or invalid, it can return <code>401</code>. If the customer asks for an order that does not exist, <code>404</code> is suitable. If the server fails unexpectedly, it can return <code>500</code>.</p><p>One more useful code is <code>403 Forbidden</code>: the user may be logged in but does not have permission to perform that action. A good API also returns a short, consistent error message without exposing private server details.</p>",
    "why": "These codes describe different problems. Using the wrong one makes it harder for apps and users to understand what went wrong."
  },
  {
    "level": "SMART-LEVEL REASONING",
    "skill": "Safe order retries",
    "diagram": 7,
    "question": "An order request times out. What is the safest way for the app to try again?",
    "choices": [
      "Send a new key on every retry so each attempt appears as a separate request.",
      "Try again after a short delay and assume the first order was never saved.",
      "Ask the customer to submit the order again without checking the first attempt.",
      "Retry with the same request key so the server can recognize an earlier order."
    ],
    "correct": 3,
    "title": "A timeout does not always mean the order failed.",
    "explain": "<p>Imagine a customer taps <strong>Place order</strong>. The server saves the order, but the reply gets lost. The app shows a timeout. If it creates a second order immediately, the customer could be charged or receive items twice.</p><p>An <strong>idempotency key</strong> is a unique reference for one intended action. The app sends the key with the order and uses <strong>the same key</strong> when retrying that order. The server remembers the first result and avoids creating a duplicate. This only works when the server saves and checks keys safely, including when two requests arrive close together.</p>",
    "why": "Waiting longer does not prove whether an order was saved. A new key can look like a completely new order instead of a retry."
  },
  {
    "level": "INTERVIEW QUESTION",
    "skill": "Real-world design choices",
    "diagram": 8,
    "interview": true,
    "question": "What is the strongest starting design for an e-commerce Web API with many users?",
    "choices": [
      "Build separate routes for each app and let each client decide its own order rules.",
      "Prioritize speed first and leave permissions and older-client support until later.",
      "Use clear routes, check access, load large lists in pages, and make order retries safe.",
      "Share database details with apps and change response formats whenever needed."
    ],
    "correct": 2,
    "title": "Start with clear rules and correct behavior, then improve performance.",
    "explain": "<p><strong>1. Design clear routes.</strong> Use simple names such as <code>/products</code> and <code>/orders</code>. Keep responses consistent, so websites and mobile apps can use the same API.</p><p><strong>2. Protect customer data.</strong> Check who is logged in and whether they are allowed to view or change an order. Never trust product prices or permissions supplied by the client.</p><p><strong>3. Handle many users sensibly.</strong> Return large product lists in smaller pages, use caching where fresh-enough data is acceptable, and monitor slow requests and errors.</p><p><strong>4. Plan for failures and changes.</strong> Make order retries safe, and avoid breaking older apps when you add new fields or features.</p><p><strong>Interview trade-off:</strong> More caching can improve speed but may show older information. Splitting everything into separate services may help some teams scale, but it also adds complexity. Choose based on the store's real needs, not trends.</p>",
    "why": "The other plans either weaken security, let clients control important business rules, or make future changes unnecessarily risky."
  }
]
  const iconMap={
    code:'<path d="M22 19L9 32l13 13M42 19l13 13-13 13M36 13l-8 38"/>',
    globe:'<circle cx="32" cy="32" r="23"/><path d="M9 32h46M32 9c-14 13-14 33 0 46M32 9c14 13 14 33 0 46M13 20h38M13 44h38"/>',
    phone:'<rect x="17" y="6" width="30" height="52" rx="6"/><path d="M26 12h12M29 52h6"/>',
    laptop:'<rect x="9" y="10" width="46" height="35" rx="4"/><path d="M5 49h54l-6 6H11z"/>',
    database:'<ellipse cx="32" cy="13" rx="20" ry="8"/><path d="M12 13v36c0 12 40 12 40 0V13M12 31c0 12 40 12 40 0"/>',
    server:'<rect x="12" y="8" width="40" height="15" rx="4"/><rect x="12" y="28" width="40" height="15" rx="4"/><path d="M20 15h6M20 35h6M40 15h4M40 35h4"/>',
    lock:'<rect x="15" y="27" width="34" height="29" rx="5"/><path d="M22 27v-9a10 10 0 0 1 20 0v9M32 39v7"/>',
    cart:'<path d="M7 10h7l6 29h28l8-22H17M23 48a3 3 0 1 0 0 6a3 3 0 0 0 0-6M46 48a3 3 0 1 0 0 6a3 3 0 0 0 0-6"/>',
    box:'<path d="M32 5L9 18v28l23 13 23-13V18zM9 18l23 14 23-14M32 32v27M21 11l23 14"/>',
    cloud:'<path d="M17 49H49a12 12 0 0 0 1-24 18 18 0 0 0-35-4 14 14 0 0 0 2 28z"/>',
    shield:'<path d="M32 5L53 14v17c0 14-10 23-21 28C21 54 11 45 11 31V14zM23 32l6 7 13-14"/>',
    clock:'<circle cx="32" cy="32" r="23"/><path d="M32 17v16l11 8"/>',
    refresh:'<path d="M54 23A23 23 0 0 0 15 16l-6 8M9 11v13h13M10 41A23 23 0 0 0 49 48l6-8M55 53V40H42"/>',
    layers:'<path d="M32 7L6 22l26 15 26-15zM6 32l26 15 26-15M6 42l26 15 26-15"/>',
    file:'<path d="M15 6h27l9 10v42H15zM42 6v11h9M22 29h21M22 38h21M22 47h12"/>',
    user:'<circle cx="32" cy="20" r="10"/><path d="M11 57c0-14 9-23 21-23s21 9 21 23"/>'
  };
  function svg(name){return '<svg class="icon-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(iconMap[name]||iconMap.code)+'</svg>';}
  const diagram=(n)=>{
    switch(n){
      case 1:return `<div class="d-api-umbrella diagram-main"><div class="api-umbrella-root"><div class="root-badge">API — software interface</div></div><div class="api-branch">${svg('code')}<strong>Local API</strong><p>One module calls an operating-system or library function directly.</p></div><div class="api-branch web">${svg('globe')}<strong>Web API</strong><p>A client sends HTTP requests to a published network endpoint.</p></div></div><p class="visual-caption">Both are APIs. The Web API branch specifies web-facing transport, not a new definition of “interface.”</p>`;
      case 2:return `<div class="d-integrate diagram-main"><div><span class="eyebrow">THREE CONSUMERS</span><div class="integrate-apps"><div class="client-strip">${svg('laptop')} Browser storefront</div><div class="client-strip">${svg('phone')} Mobile app</div><div class="client-strip">${svg('server')} Partner service</div></div></div><div class="integrate-line"></div><div><div class="integrate-contract"><span class="eyebrow">ONE SHARED CONTRACT</span><strong>Product catalog Web API</strong><code>GET /products</code><code>200 · application/json</code></div><div class="integrate-note">Server internals can change; client contract stays stable.</div></div></div><p class="visual-caption">Independent clients do not need to share an internal database schema or implementation language.</p>`;
      case 3:return `<div class="d-lifecycle diagram-main">${[['phone','Send','Client request'],['globe','Route','Endpoint match'],['shield','Check','Auth + input'],['server','Handle','Logic + data'],['file','Return','Status + body']].map(([ic,t,st])=>`<div class="lifecycle-item"><span class="lifecycle-dot">${svg(ic)}</span><strong>${t}</strong><small>${st}</small></div>`).join('')}</div><p class="visual-caption">A logical request journey. Validation and security may be performed in middleware and at multiple layers.</p>`;
      case 4:return `<div class="d-http diagram-main"><div class="http-pane"><div class="http-title">REQUEST · CLIENT TO SERVER</div><pre><mark>GET</mark> /products/42 HTTP/1.1
<em>Accept: application/json</em>
<em>Authorization: Bearer …</em>

<i>(No request body)</i></pre></div><div class="http-pane"><div class="http-title">RESPONSE · SERVER TO CLIENT</div><pre>HTTP/1.1 <b>200 OK</b>
<em>Content-Type: application/json</em>

{ "id": 42,
  "name": "Trail Bottle" }</pre></div></div><div class="http-legend"><span>Method / route</span><span>Headers / metadata</span><span>Status / outcome</span></div><p class="visual-caption">Methods, URLs, headers, status codes, and optional bodies each serve separate purposes.</p>`;
      case 5:return `<div class="d-resources diagram-main"><div class="resource-panel">${svg('box')} <strong>Product collection</strong><div class="endpoint-line"><span class="method">GET</span><code>/products</code></div><div class="endpoint-line"><span class="method">GET</span><code>/products/42</code></div></div><div class="resource-panel">${svg('cart')} <strong>Order collection</strong><div class="endpoint-line"><span class="method post">POST</span><code>/orders</code></div><div class="endpoint-line"><span class="method">GET</span><code>/orders/8472</code></div></div><div class="resource-link">Browse product → create order → retrieve order details</div></div><p class="visual-caption">Resource nouns stay consistent; methods communicate reads versus creation.</p>`;
      case 6:return `<div class="d-errors diagram-main"><div class="status-block amber"><strong class="status-number">400</strong><small>Bad input<br>Client should fix the request</small></div><div class="status-block violet"><strong class="status-number">401</strong><small>Authentication<br>Missing or invalid credentials</small></div><div class="status-block blue"><strong class="status-number">404</strong><small>Not found<br>No matching resource</small></div><div class="status-block red"><strong class="status-number">500</strong><small>Server fault<br>Unexpected server failure</small></div></div><p class="visual-caption">Also distinguish 403 Forbidden: the caller may be authenticated but lacks permission.</p>`;
      case 7:return `<div class="d-retry diagram-main"><div class="retry-lane timeout"><strong>First attempt</strong><div class="retry-road"></div><div class="retry-result"><strong>Key: order-8472</strong><br>Order created; reply lost in transit.</div></div><div class="retry-lane safe"><strong>Retry</strong><div class="retry-road"></div><div class="retry-result"><strong>Same key: order-8472</strong><br>Return recorded outcome; no second order.</div></div></div><p class="visual-caption">One logical operation, one stable key, one committed effect: the server must enforce this relationship.</p>`;
      case 8:return `<div class="d-architecture diagram-main"><div class="arch-node">${svg('globe')}<strong>Clients</strong><small>Browser · mobile</small></div><div class="arch-arrow"></div><div class="arch-node">${svg('shield')}<strong>API edge</strong><small>Auth · limits · routing</small></div><div class="arch-arrow"></div><div class="arch-backend"><span>Products</span><span>Orders</span><span>Cache</span><span>Data store</span></div></div><div class="arch-guardrails"><span>Pagination</span><span>Access checks</span><span>Idempotency</span><span>Observability</span><span>Compatibility</span></div><p class="visual-caption">A blueprint for discussing trade-offs, not a prescription to deploy many services on day one.</p>`;
    }
    return '';
  };
  const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  function renderQuiz(){
    const quiz=document.getElementById('quiz');
    quiz.innerHTML=questions.map((q,i)=>`<article class="q-card${q.interview?' interview-card':''}" data-answer="${LETTERS[q.correct]}" id="question-${i+1}">
      <div class="q-head"><div class="q-heading"><span class="q-index">${String(i+1).padStart(2,'0')}</span><div><div class="q-kind">${esc(q.level)}</div><div class="q-skill">${esc(q.skill)}</div></div></div><span class="q-progress-label">${i+1} / ${questions.length}</span></div>
      <figure class="q-visual"><div class="visual-inner"><div class="visual-heading">DIAGRAM ${String(i+1).padStart(2,'0')} / ${esc(q.skill)}</div>${diagram(q.diagram)}</div></figure>
      <div class="q-body">${q.interview?'<span class="interview-ribbon">FINAL · SCENARIO-BASED INTERVIEW CHALLENGE</span>':''}<h3>${esc(q.question)}</h3><div class="choices" role="radiogroup" aria-label="Answers to question ${i+1}">${q.choices.map((choice,j)=>`<label class="option"><input type="radio" name="q${i+1}" value="${LETTERS[j]}"><span class="option-mark">${LETTERS[j].toUpperCase()}</span><span>${esc(choice)}</span></label>`).join('')}</div><div class="explain" hidden><strong>${esc(q.title)}</strong>${q.explain}<p><strong>Why the other options do not fit:</strong> ${esc(q.why)}</p></div></div></article>`).join('');
    const total=questions.length;
    const cards=Array.from(quiz.querySelectorAll('.q-card'));
    const filled=document.getElementById('progressFill'),counter=document.getElementById('counter'),result=document.getElementById('result');
    function progress(){const answered=cards.filter(q=>q.querySelector('input:checked')).length;counter.textContent=answered+' / '+total;filled.style.width=(answered/total*100)+'%';}
    quiz.addEventListener('change',()=>{progress();if(!result.hidden){result.hidden=true;cards.forEach(c=>{c.classList.remove('is-checked','correct','incorrect');c.querySelectorAll('label').forEach(l=>l.classList.remove('is-right','is-wrong'));c.querySelector('.explain').hidden=true;});}});
    document.getElementById('checkBtn').addEventListener('click',()=>{
      let score=0,missing=0;
      cards.forEach(c=>{
        const answer=c.dataset.answer,checked=c.querySelector('input:checked');
        c.classList.remove('correct','incorrect');c.classList.add('is-checked');
        c.querySelectorAll('label').forEach(l=>l.classList.remove('is-right','is-wrong'));
        const right=c.querySelector('input[value="'+answer+'"]');
        if(right)right.closest('label').classList.add('is-right');
        if(!checked)missing++;else if(checked.value===answer)score++;else checked.closest('label').classList.add('is-wrong');
        c.classList.add(checked&&checked.value===answer?'correct':'incorrect');
        c.querySelector('.explain').hidden=false;
      });
      const pct=Math.round(score/total*100);
      result.hidden=false;
      result.innerHTML='<div class="score">'+score+' / '+total+' correct · '+pct+'%</div><p>'+(
        score===total?'All eight decisions are correct. Revisit the interview trade-offs for deeper practice.':
        score>=6?'Good progress. Read the reasoning for every missed or uncertain answer.':
        'Work through the mechanisms and try again; the diagrams and labs provide concrete examples.'
      )+(missing?' '+missing+' question(s) were unanswered.':'')+'</p>';
      result.scrollIntoView({behavior:'smooth',block:'center'});
    });
    document.getElementById('resetBtn').addEventListener('click',()=>{
      quiz.reset();cards.forEach(c=>{c.classList.remove('is-checked','correct','incorrect');c.querySelectorAll('label').forEach(l=>l.classList.remove('is-right','is-wrong'));c.querySelector('.explain').hidden=true;});result.hidden=true;result.innerHTML='';progress();document.getElementById('questions').scrollIntoView({behavior:'smooth',block:'start'});
    });
    progress();
  }
  function setupRequestLab(){
    const flows={
      get:{request:'GET /products/42 HTTP/1.1\nAccept: application/json\nAuthorization: Bearer <token>',status:'200 OK',reply:'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"id":42,"name":"Trail Bottle"}',noun:'product 42',action:'reads product information',notes:['The client requests product 42 with an HTTP GET.','The router maps /products/42 to a product retrieval handler.','Credentials and route permissions are evaluated; parameters are checked.','The product handler applies application rules.','The service reads product 42 from storage.','The server formats a 200 response with product JSON.']},
      post:{request:'POST /orders HTTP/1.1\nContent-Type: application/json\nAuthorization: Bearer <token>\nIdempotency-Key: order-8472\n\n{"productId":42,"qty":1}',status:'201 Created',reply:'HTTP/1.1 201 Created\nLocation: /orders/8472\nContent-Type: application/json\n\n{"id":8472,"status":"placed"}',noun:'new order',action:'creates an order',notes:['The client submits an order creation request with a body.','The router matches POST /orders to the creation handler.','The service checks authentication, authorization, and order fields.','The order handler validates prices and business rules.','An order is committed and its idempotency result is recorded safely.','The server returns 201 with the new order location.']},
      missing:{request:'GET /orders/999 HTTP/1.1\nAccept: application/json\nAuthorization: Bearer <token>',status:'404 Not Found',reply:'HTTP/1.1 404 Not Found\nContent-Type: application/json\n\n{"error":{"code":"ORDER_NOT_FOUND"}}',noun:'missing order',action:'cannot find order 999',notes:['The client asks for an order ID that does not exist.','The server matches the order retrieval route.','The service checks the caller’s permissions to read orders.','The handler asks for order 999.','The lookup finds no matching visible order.','The API returns 404 with a structured error body.']}
    };
    let current='get',stage=0;
    const steps=['Client','Route','Checks','Handler','Storage','Response'],stepUI=document.getElementById('lifeSteps'),req=document.getElementById('requestPreview'),res=document.getElementById('responsePreview'),status=document.getElementById('responseStatus'),title=document.getElementById('lifeTitle'),narration=document.getElementById('lifeNarration'),next=document.getElementById('nextLife');
    function paint(){
      const f=flows[current];
      req.textContent=f.request;
      stepUI.innerHTML=steps.map((name,i)=>'<div class="life-step '+(i===stage?'active':i<stage?'complete':'')+'"><span>'+String(i+1)+'</span>'+name+'</div>').join('');
      title.textContent=steps[stage]+' · '+f.noun;
      narration.textContent=f.notes[stage];
      res.textContent=stage===5?f.reply:'No response yet. Advance to the final stage.';
      status.textContent=stage===5?f.status:'Awaiting server';
      next.disabled=stage===5;next.textContent=stage===5?'Request finished':'Next stage →';
      document.querySelectorAll('#requestExamples button').forEach(b=>{const active=b.dataset.flow===current;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    }
    document.querySelectorAll('#requestExamples button').forEach(b=>b.addEventListener('click',()=>{current=b.dataset.flow;stage=0;paint();}));
    next.addEventListener('click',()=>{stage=Math.min(5,stage+1);paint();});
    document.getElementById('restartLife').addEventListener('click',()=>{stage=0;paint();});
    paint();
  }
  function setupErrors(){
    const errorMap={
      400:['Bad Request','The submitted fields or input format do not meet the documented contract.','INVALID_REQUEST','Check the required fields and try again.',''],
      401:['Unauthorized','The client has not supplied valid authentication credentials.','AUTH_REQUIRED','Sign in with valid credentials.','violet'],
      403:['Forbidden','The caller is authenticated but is not allowed to perform this operation.','ACCESS_DENIED','You do not have permission for this action.','violet'],
      404:['Not Found','The requested order does not exist or is not visible to this caller.','ORDER_NOT_FOUND','The requested order was not found.','blue'],
      500:['Internal Server Error','An unexpected server-side failure stopped the operation.','INTERNAL_ERROR','An unexpected error occurred.','red']
    };
    function paint(key){
      const e=errorMap[key],ring=document.querySelector('.status-ring');
      document.getElementById('errorCode').textContent=key;
      document.getElementById('errorName').textContent=e[0];
      document.getElementById('errorWhy').textContent=e[1];
      document.getElementById('errorPayload').textContent=JSON.stringify({error:{code:e[2],message:e[3],requestId:'demo-001'}},null,2);
      ring.className='status-ring '+e[4];
      document.querySelectorAll('#errorChoices button').forEach(b=>{const active=b.dataset.error===key;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    }
    document.querySelectorAll('#errorChoices button').forEach(b=>b.addEventListener('click',()=>paint(b.dataset.error)));
    paint('400');
  }
  function setupRetries(){
    let orders=0,started=false,newKeys=0;
    const count=document.getElementById('orderCount'),out=document.getElementById('retryEvents');
    const first=document.getElementById('firstSend'),same=document.getElementById('sameRetry'),fresh=document.getElementById('newRetry');
    function log(label,details,type){const row=document.createElement('div');row.className='retry-event '+type;const bold=document.createElement('strong');bold.textContent=label+' ';row.append(bold,document.createTextNode(details));out.prepend(row);}
    function paint(){count.textContent=String(orders);first.disabled=started;same.disabled=!started;fresh.disabled=!started;}
    first.addEventListener('click',()=>{if(started)return;started=true;orders=1;out.innerHTML='';log('Request A (key order-8472-request):','Order #8472 is committed, but the client sees a simulated timeout.','warn');paint();});
    same.addEventListener('click',()=>{if(!started)return;log('Retry with SAME key:','Server finds the stored result and returns order #8472. No new order is created.','ok');paint();});
    fresh.addEventListener('click',()=>{if(!started)return;newKeys++;orders++;log('Retry with NEW key '+newKeys+':','Server interprets this as another creation. A duplicate order appears.','bad');paint();});
    document.getElementById('resetRetry').addEventListener('click',()=>{orders=0;started=false;newKeys=0;out.innerHTML='<div class="retry-event muted">Awaiting first request…</div>';paint();});
    paint();
  }
  setupThemeDropdown();
  renderQuiz();
  setupRequestLab();
  setupErrors();
  setupRetries();
})();
