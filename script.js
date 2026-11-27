// Responsive navigation, including keyboard dismissal and focus containment.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const closeMenu = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = 'Menu';
  navigation.removeAttribute('data-open');
  document.body.classList.remove('menu-open');
};
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
  navigation.toggleAttribute('data-open', open);
  document.body.classList.toggle('menu-open', open);
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
  if (event.key === 'Tab' && menuButton?.getAttribute('aria-expanded') === 'true') {
    const last = [...navigation.querySelectorAll('a')].at(-1);
    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); menuButton.focus();
    }
  }
});
matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

// Original illustrative spatial scan; this is not live or measured data.
const canvas = document.querySelector('.spatial-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const points = [], lines = [];
    let width=0, height=0, frame=0, visible=true, raf=0, seed=41, paused=false;
    const scanToggle = document.querySelector('.scan-toggle');
    scanToggle?.addEventListener('click', () => {
      paused = !paused;
      scanToggle.setAttribute('aria-pressed', String(paused));
      scanToggle.innerHTML = paused ? 'Resume scan <span aria-hidden="true">▷</span>' : 'Pause scan <span aria-hidden="true">Ⅱ</span>';
      if (!paused && !raf) draw();
    });
    function updateMotionControl() {
      if (scanToggle) scanToggle.hidden = reducedMotion.matches;
    }
    updateMotionControl();
    const random = () => { seed=(seed*16807)%2147483647; return (seed-1)/2147483646; };
    const point = (x,y,z,alpha=1) => points.push({x,y,z,alpha,size:random()>.97?1.7:.8});
    for (let x=-11;x<=11;x+=.22) {
      for (let z=-8;z<=8;z+=.25) {
        if (random()>.23) point(x+random()*.04,0,z,.25+random()*.45);
      }
    }
    function wall(x1,z1,x2,z2,top,doorway=false) {
      const length=Math.hypot(x2-x1,z2-z1);
      for (let d=0;d<=length;d+=.17) {
        const t=d/length;
        for (let y=.1;y<top;y+=.16) {
          if (doorway && t>.34 && t<.61 && y<2.8) continue;
          if (random()>.2) point(x1+(x2-x1)*t,y,z1+(z2-z1)*t,.3+random()*.65);
        }
      }
      lines.push([[x1,0,z1],[x1,top,z1]],[[x2,0,z2],[x2,top,z2]],[[x1,top,z1],[x2,top,z2]]);
    }
    wall(-7,-5,7,-5,4,true); wall(7,-5,7,5,4,true);
    wall(-7,-5,-7,4,4); wall(-1,-5,-1,1,3.6,true);
    wall(-1,1,5,1,3.6,true); wall(-7,4,-2,4,2.7);
    for (let z=-5;z<=5;z+=2.5) lines.push([[-7,4,z],[7,4,z]]);
    function project(x,y,z) {
      const angle=-.48,rx=x*Math.cos(angle)-z*Math.sin(angle),rz=x*Math.sin(angle)+z*Math.cos(angle);
      const scale=Math.min(width/23,height/15);
      return [width*.72+rx*scale,height*.57+(rz*.44-y)*scale];
    }
    function draw() {
      ctx.clearRect(0,0,width,height);
      const scan=((frame*.025)%22)-11;
      for (const [a,b] of lines) {
        const start=project(...a),end=project(...b);
        ctx.strokeStyle='rgba(181,111,220,.23)';ctx.lineWidth=.6;
        ctx.beginPath();ctx.moveTo(...start);ctx.lineTo(...end);ctx.stroke();
      }
      for (const p of points) {
        const [x,y]=project(p.x,p.y,p.z);
        const highlight=!reducedMotion.matches && Math.abs(p.x-scan)<.25;
        ctx.fillStyle=highlight?'rgba(235,204,255,.95)':`rgba(181,111,220,${p.alpha*.65})`;
        ctx.fillRect(x,y,highlight?1.6:p.size,highlight?1.6:p.size);
      }
      if (!reducedMotion.matches && !paused && visible && !document.hidden) {frame++;raf=requestAnimationFrame(draw);} else raf=0;
    }
    function resize() {
      width=canvas.clientWidth;height=canvas.clientHeight;
      const ratio=Math.min(window.devicePixelRatio||1,2);
      canvas.width=width*ratio;canvas.height=height*ratio;
      ctx.setTransform(ratio,0,0,ratio,0,0);
      if (!raf) draw();
    }
    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!raf)draw();}).observe(canvas);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!raf)draw();});
    reducedMotion.addEventListener('change',()=>{updateMotionControl();cancelAnimationFrame(raf);raf=0;draw();});
  }
}
