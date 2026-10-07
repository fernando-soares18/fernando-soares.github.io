document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const topButton = document.querySelector('.to-top');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));

  const sections = [...document.querySelectorAll('main section[id]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));

  const onScroll = () => {
    topButton?.classList.toggle('show', window.scrollY > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// Code Snake — controles por teclado, mouse e toque
(() => {
  const canvas = document.getElementById('snakeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const stage = document.getElementById('snakeStage');
  const scoreEl = document.getElementById('snakeScore');
  const bestEl = document.getElementById('snakeBest');
  const startBtn = document.getElementById('snakeStart');
  const statusEl = document.getElementById('snakeStatus');
  const overlay = document.getElementById('snakeOverlay');
  const symbols = ['{}', '</>', '()', '[]', ';', '=>', '#'];
  const COLS = 20, ROWS = 12;
  let snake, food, dir, nextDir, score = 0, best = 0, timer = null, running = false, pointerStart = null;
  try { best = Math.max(0, Number(localStorage.getItem('code_snake_best')) || 0); } catch (_) {}
  bestEl.textContent = String(best);

  function reset() {
    snake = [{x:8,y:6},{x:7,y:6},{x:6,y:6}];
    dir = nextDir = {x:1,y:0}; score = 0; scoreEl.textContent = '0';
    placeFood(); draw();
  }
  function placeFood() {
    do { food = {x:Math.floor(Math.random()*COLS), y:Math.floor(Math.random()*ROWS), s:symbols[Math.floor(Math.random()*symbols.length)]}; }
    while (snake && snake.some(p => p.x === food.x && p.y === food.y));
  }
  function setDirection(x,y) {
    if (!running || (x === -dir.x && y === -dir.y)) return;
    nextDir = {x,y};
  }
  function speed(){ return Math.max(70, 145 - Math.floor(score/50)*8); }
  function schedule(){ clearTimeout(timer); if(running) timer=setTimeout(tick,speed()); }
  function tick(){
    dir = nextDir; const h = {x:snake[0].x+dir.x,y:snake[0].y+dir.y};
    if(h.x<0||h.x>=COLS||h.y<0||h.y>=ROWS||snake.some(p=>p.x===h.x&&p.y===h.y)){ gameOver(); return; }
    snake.unshift(h);
    if(h.x===food.x&&h.y===food.y){ score+=10; scoreEl.textContent=String(score); const previousBest = best; best=Math.max(best,score); bestEl.textContent=String(best);
      if (best !== previousBest) { try { localStorage.setItem('code_snake_best', String(best)); } catch (_) {} }
      placeFood(); }
    else snake.pop();
    draw(); schedule();
  }
  function start(){
    clearTimeout(timer); reset(); running=true; overlay.classList.add('hidden'); startBtn.textContent='Recompilar ↻'; statusEl.textContent='Compilando… coma os símbolos de código.'; schedule();
  }
  function gameOver(){
    running=false; clearTimeout(timer); draw(); overlay.classList.remove('hidden'); overlay.innerHTML='<strong>CODE CRASHED 💥</strong><span>'+score+' XP • clique em Recompilar</span>'; statusEl.textContent='Erro 404: Snake crashed 😂'; startBtn.textContent='Compilar novamente ↻';
  }
  function draw(){
    const w=canvas.width,h=canvas.height,cw=w/COLS,ch=h/ROWS;
    ctx.fillStyle='#080d12';ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(255,255,255,.035)';ctx.lineWidth=1;
    for(let x=1;x<COLS;x++){ctx.beginPath();ctx.moveTo(x*cw,0);ctx.lineTo(x*cw,h);ctx.stroke()}
    for(let y=1;y<ROWS;y++){ctx.beginPath();ctx.moveTo(0,y*ch);ctx.lineTo(w,y*ch);ctx.stroke()}
    snake.forEach((p,i)=>{ctx.fillStyle=i===0?'#38d477':'#1f9d58';ctx.beginPath();ctx.roundRect(p.x*cw+3,p.y*ch+3,cw-6,ch-6,6);ctx.fill()});
    ctx.fillStyle='#e6edf3';ctx.font='700 16px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(food.s,(food.x+.5)*cw,(food.y+.5)*ch);
  }
  function pointerDirection(dx,dy){ if(Math.abs(dx)<8&&Math.abs(dy)<8){ const r=canvas.getBoundingClientRect(), x=pointerStart.x-r.left, y=pointerStart.y-r.top, cx=r.width/2, cy=r.height/2; dx=x-cx;dy=y-cy; } if(Math.abs(dx)>Math.abs(dy)) setDirection(dx>0?1:-1,0); else setDirection(0,dy>0?1:-1); }
  stage.addEventListener('pointerdown',e=>{pointerStart={x:e.clientX,y:e.clientY};});
  stage.addEventListener('pointerup',e=>{if(!pointerStart)return;pointerDirection(e.clientX-pointerStart.x,e.clientY-pointerStart.y);pointerStart=null;});
  document.addEventListener('keydown',e=>{ const k=e.key.toLowerCase(); const map={arrowup:[0,-1],w:[0,-1],arrowdown:[0,1],s:[0,1],arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0]}; if(map[k]&&running){e.preventDefault();setDirection(...map[k]);} });
  startBtn.addEventListener('click',start); reset();
})();
