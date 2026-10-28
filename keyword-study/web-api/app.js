/* Study module uses one fixed theme: Glacier Ice. Theme chooser is separate. */
(function browserApp(){
  'use strict';
  const LETTERS=['a','b','c','d'];
  const questions=[
    {
      level:"INTRODUCTION",skill:"API vs Web API",diagram:1,
      question:"Which statement correctly distinguishes a Web API from the broader concept of an API?",
      choices:[
        "A Web API refers only to REST services, while other APIs can also expose remote interfaces.",
        "An API requires network access, while a Web API may be called only as a local function.",
        "An API defines a software interface; a Web API exposes an interface using web protocols.",
        "A Web API serves browser pages, while other APIs are used for program-to-program calls."
      ],correct:2,
      title:"API is the broader contract; Web API identifies how it is accessed.",
      explain:`<p>An <strong>application programming interface</strong> is an agreed way for software components to interact. Examples include a language library's method signatures, an operating system's interfaces, and a service's network operations. An API does not inherently require HTTP or any network.</p><p>A <strong>Web API</strong> makes capabilities available through web-facing communication—commonly HTTP requests to URLs with structured responses such as JSON. REST is one common style, but it is not the only way to build a Web API; other web-facing interface styles exist. The important distinction is the interface contract plus the communication medium, not whether a website has a graphical page.</p>`,
      why:"The other choices incorrectly restrict all Web APIs to REST, reverse local-versus-network access, or confuse a machine-readable interface with a web page."
    },
    {
      level:"FUNDAMENTALS",skill:"Contracts and decoupling",diagram:2,
      question:"What is the strongest reason for different applications to integrate through a well-defined Web API?",
      choices:[
        "A stable contract lets clients use a service without depending on its internal implementation.",
        "A shared database lets clients bypass the service while preserving independent deployments.",
        "Direct server access removes the need to agree on data shapes and failure responses.",
        "Client-specific integrations ensure that backend changes never require coordination."
      ],correct:0,
      title:"A documented contract reduces coupling between consumers and the service.",
      explain:`<p>A browser, mobile app, and partner service may all need the same product catalog. With a defined Web API, each client relies on documented operations and response formats instead of knowing the server's classes, database schema, or deployment details. The server can change internally while keeping its public contract compatible.</p><p>The contract must still define authentication, accepted input, response schemas, and errors. It does <em>not</em> remove the need for coordination when the contract itself changes. Direct database access, shared implementation code, and ad hoc client-specific endpoints generally make independent changes harder and increase security and maintenance risk.</p>`,
      why:"The alternatives either bypass the service contract or pretend that schema and compatibility work disappears entirely."
    },
    {
      level:"WORKING MECHANISM",skill:"Lifecycle and processing",diagram:3,
      question:"Which sequence best represents what normally happens during a request to a Web API?",
      choices:[
        "Client → database write → response creation → URL matching → access checks → client.",
        "Client → business logic → response → endpoint selection → permission checks → client.",
        "Client → response formatting → authentication → database lookup → routing → client.",
        "Client → routing and checks → handler and data access → response formatting → client."
      ],correct:3,
      title:"The server must route and evaluate a request before producing its result.",
      explain:`<p>First, the client constructs an HTTP request with a method and target URL, along with any required headers and body. The server's HTTP stack receives it, matches the route, and applies relevant checks such as authentication, authorization, and input validation. The handler performs business logic and may read or change data in a database or another service.</p><p>The server then creates a status code, headers, and response body. The client interprets that response and updates its interface or workflow. The exact placement of checks may vary by framework or middleware; the diagram describes the logical responsibilities rather than a mandatory implementation order.</p>`,
      why:"The distractors place output formatting or data changes before routing and checks, which reverses the normal direction of processing."
    },
    {
      level:"TECHNICAL UNDERSTANDING",skill:"HTTP request anatomy",diagram:4,
      question:"Which description correctly matches the main pieces of HTTP-based Web API communication?",
      choices:[
        "Methods select users; paths define status; headers identify tables; bodies hold only errors.",
        "Methods express actions; paths locate resources; headers carry metadata; codes report outcomes.",
        "Methods format payloads; paths set permissions; headers choose servers; codes name resources.",
        "Methods identify responses; paths hold credentials; headers create data; codes return payloads."
      ],correct:1,
      title:"Each part of an HTTP message has a different responsibility.",
      explain:`<p>The <strong>method</strong> describes the intended operation—such as reading with GET or submitting a new order with POST. The <strong>path</strong> identifies the target resource or collection, such as <code>/products/42</code>. <strong>Headers</strong> convey metadata: <code>Accept</code> expresses a preferred response representation, <code>Content-Type</code> identifies the payload format, and <code>Authorization</code> can carry credentials.</p><p>The <strong>request body</strong> contains input when appropriate, while a <strong>response body</strong> may contain the result or a structured error. The <strong>status code</strong> indicates the outcome at the protocol level: for example, 200 for a successful retrieval, 201 for a created resource, or 404 for a missing resource.</p>`,
      why:"The other options assign jobs to methods, paths, and headers that belong to different parts of the request or application."
    },
    {
      level:"PRACTICAL APPLICATION",skill:"Resource-oriented routes",diagram:5,
      question:"Which set of endpoints best supports viewing products, creating orders, and reading one order?",
      choices:[
        "GET /products lists products; POST /orders creates orders; GET /orders/{id} reads an order.",
        "POST /products lists products; GET /orders creates orders; PUT /orders/{id} reads an order.",
        "GET /products lists products; GET /orders creates orders; POST /orders/{id} reads an order.",
        "PUT /products lists products; POST /orders creates orders; DELETE /orders/{id} reads an order."
      ],correct:0,
      title:"Resources are nouns; HTTP methods express what the client wants to do.",
      explain:`<p>Use a <strong>products collection</strong>, <code>GET /products</code>, to return a list of products. Use <strong>order creation</strong>, <code>POST /orders</code>, with a validated request body; on success, return an appropriate creation status, often 201, and identify the new order, commonly with a <code>Location</code> header. Use <strong>order retrieval</strong>, <code>GET /orders/{id}</code>, to read a specific order.</p><p>In a real store, you would add pagination and filtering to the product collection, check availability and prices on the server, authenticate purchases, and ensure users can read only orders they are authorized to access. GET should not create an order as a side effect. API route naming and representation details should remain consistent as the application grows.</p>`,
      why:"The incorrect alternatives confuse safe reads, resource creation, updates, and deletion. Matching route nouns with the correct method matters."
    },
    {
      level:"ADVANCED UNDERSTANDING",skill:"Consistent failure behavior",diagram:6,
      question:"Which status-code mapping is most appropriate when an API needs to report common failures?",
      choices:[
        "401 for invalid fields; 404 for missing login; 400 for absent orders; 500 for server faults.",
        "500 for invalid fields; 401 for missing login; 400 for absent orders; 404 for server faults.",
        "400 for invalid fields; 500 for missing login; 401 for absent orders; 404 for server faults.",
        "400 for invalid fields; 401 for missing login; 404 for absent orders; 500 for server faults."
      ],correct:3,
      title:"An API should tell the client what kind of failure occurred.",
      explain:`<p><strong>400 Bad Request</strong> is suitable when a client submits malformed or invalid data under the API's contract. <strong>401 Unauthorized</strong> means authentication is missing or invalid. <strong>403 Forbidden</strong> is different: the caller may be authenticated but lacks permission. <strong>404 Not Found</strong> means the requested resource could not be found or, in some designs, cannot be disclosed to this caller. <strong>500 Internal Server Error</strong> indicates an unexpected server-side fault.</p><p>Use a <strong>consistent structured error format</strong> with a stable error code, a safe human-readable message, and a request or correlation ID where helpful. Validate input before expensive work, log the details server-side, avoid leaking stack traces or secrets, and document whether retrying makes sense. Status codes guide client behavior but cannot replace a clear error contract.</p>`,
      why:"The distractors swap client mistakes, authentication failures, missing resources, and server faults, which misleads callers about recovery."
    },
    {
      level:"SMART-LEVEL REASONING",skill:"Retry safety and idempotency",diagram:7,
      question:"A POST to create an order times out after the server may have saved it. What is the safest retry design?",
      choices:[
        "Generate a new request key on every retry so the server can treat each attempt separately.",
        "Reuse a stable idempotency key; persist the operation result so the retry is not duplicated.",
        "Change the retry to GET because the server can infer which order the client intended.",
        "Disable client timeouts and trust users not to submit the same operation more than once."
      ],correct:1,
      title:"A lost response is not proof that the operation failed.",
      explain:`<p>The server might have created the order and committed the payment or inventory reservation even though the response never reached the client. Blindly sending a second creation request can duplicate the order. A practical design lets the client attach a stable <strong>idempotency key</strong> to one logical operation and reuse that same key on a retry with the same request content.</p><p>The server records the key and resulting operation status in a concurrency-safe, persistent way. When the same operation is retried, the server returns the earlier result or safely indicates that processing is still in progress, instead of repeating the side effect. Production systems must define a key scope, retention window, request-equivalence check, and atomicity around the order and idempotency record. A different key generally represents a different operation, so it does not prevent duplicates.</p>`,
      why:"A fresh key on every retry defeats deduplication; changing methods cannot recover an unknown order by magic; removing timeouts is not a reliability strategy."
    },
    {
      level:"INTERVIEW QUESTION",skill:"Architecture and trade-offs",diagram:8,interview:true,
      question:"For an e-commerce API serving thousands of users, which design approach best balances correctness, security, scale, and evolution?",
      choices:[
        "Return full catalogs in each response, share one service credential, and revise payloads in place.",
        "Expose database tables to clients, rely on perimeter security, and let clients retry writes.",
        "Use stable resource contracts, enforce permissions, paginate and cache reads, support safe retries.",
        "Create endpoints per screen, keep business validation in clients, and postpone API compatibility."
      ],correct:2,
      title:"A strong architecture starts with correctness and clear contracts, then scales deliberately.",
      explain:`<p><strong>Resource model and contract:</strong> Define a small set of meaningful resources such as products, orders, customers, and inventory. Specify methods, status codes, request and response schemas, pagination, filtering, and predictable error formats. Keep sensitive authorization decisions and order calculations on the server rather than trusting client data.</p><p><strong>Security and correctness:</strong> Use TLS, suitable authentication, resource-level authorization, validated inputs, controlled secrets, and rate limiting. Treat POST order creation as a potentially non-idempotent operation; support stable idempotency keys for safe retries, with transaction boundaries designed around inventory, payment, and order persistence.</p><p><strong>Scale, reliability, and operability:</strong> Paginate large reads, measure hot paths, cache appropriate catalog data with a clear freshness policy, optimize database indexes and connection pools, add bounded timeouts and retry policies, and observe latency, errors, throughput, and saturation. Separate components only where it helps the actual workload; distributed services add operational complexity.</p><p><strong>Evolution and trade-offs:</strong> Prefer additive, backward-compatible changes, explicit deprecation notices and versioning when compatibility cannot be preserved. Weigh cache freshness against latency, consistency against availability needs, and simplicity against independent deployment. Before prescribing microservices or a specific database, ask about traffic shape, business requirements, failure budget, and team capacity.</p>`,
      why:"The alternatives compromise contract compatibility, authorization, safe writes, or server-side validation. A strong interview answer also identifies workload-dependent trade-offs rather than presenting scaling tactics as universal rules."
    }
  ];
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
  renderQuiz();
  setupRequestLab();
  setupErrors();
  setupRetries();
})();
