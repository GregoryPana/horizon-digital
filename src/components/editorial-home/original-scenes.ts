// @ts-nocheck
/* Faithful legacy choreography. Generated from v13b; scoped APIs are lifecycle-owned.
 * Copyright (c) 2026 8B, MIT. No eval, script injection or document-global selectors. */
export function mountOriginalScenes(env) {
const {document,window,browser,gsap,ScrollTrigger,queueMotion,refreshScroll,matchMedia,IntersectionObserver,ResizeObserver,MutationObserver,listen,alive,runOwned,diagnostics}=env;

// Original section-script:opening

(() => {
  const stage = document.querySelector('#opening .op-s1');
  new IntersectionObserver(([entry]) => entry.isIntersecting ? stage.removeAttribute('data-paused') : stage.setAttribute('data-paused', '')).observe(stage);
})();


// Original motion

const blurOK = () => matchMedia('(min-width: 1024px) and (hover: hover)').matches;
const effects = {
  streak(element, vars = {}) {
    const dir = vars.dir || (element.dataset.from === 'left' ? -1 : 1);
    return gsap.timeline(vars.timeline)
      .fromTo(element, { x: () => dir * Math.min(innerWidth * .22, 320), skewX: -20 * dir, scaleX: 1.15, transformOrigin: dir > 0 ? '100% 50%' : '0% 50%' },
        { x: 0, skewX: 0, scaleX: 1, duration: 1, ease: vars.ease || 'expo.out', immediateRender: true }, 0)
      .fromTo(element, { opacity: 0 }, { opacity: 1, duration: .35, ease: 'none', immediateRender: true }, 0);
  },
  focus(element, vars = {}) {
    const blur = blurOK();
    return gsap.timeline(vars.timeline)
      .fromTo(element, { scale: 1.14, filter: blur ? 'blur(14px)' : 'none' },
        { scale: 1, filter: blur ? 'blur(0px)' : 'none', duration: 1.2, ease: 'power3.out', immediateRender: true, clearProps: blur ? 'filter' : '' });
  },
  rise(element, vars = {}) {
    return gsap.timeline(vars.timeline)
      .fromTo(element.children, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .09, ease: 'power3.out', immediateRender: true });
  },
  orbit(element, vars = {}) {
    const circles = element.querySelectorAll('circle, ellipse');
    return gsap.timeline(vars.timeline)
      .fromTo(element, { rotation: -24 }, { rotation: 24, duration: 1, ease: 'none', immediateRender: true }, 0)
      .fromTo(circles, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .45, stagger: .05, ease: 'power2.out', immediateRender: true }, 0);
  }
};
const bindings = {
  streak: element => ({ trigger: element, start: 'top 88%', once: true }),
  focus: element => ({ trigger: element, start: 'top 85%', once: true }),
  rise: element => ({ trigger: element, start: 'top 86%', once: true }),
  orbit: element => ({ trigger: element, start: 'top bottom', end: 'bottom top', scrub: true })
};
document.querySelectorAll('[data-8b-section]').forEach(section => {
  Object.keys(bindings).forEach(name => {
    const elements = section.querySelectorAll(`[data-8b-motion~="${name}"]`);
    if (!elements.length) return;
    const id = `effect:${name}:${section.id}`;
    queueMotion(() => gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      elements.forEach((element, index) => ScrollTrigger.create({ id: `${id}:${index}`, ...bindings[name](element), animation: effects[name](element) }));
    }), { first: section.getBoundingClientRect().top < innerHeight, id });
  });
});


// Original scene:opening

queueMotion(() => {
  gsap.matchMedia().add({ motion: '(prefers-reduced-motion: no-preference)', blur: '(min-width: 1024px) and (hover: hover)' }, context => {
    if (!context.conditions.motion) return;
    const section = document.getElementById('opening');
    const q = selector => section.querySelector(selector);
    const vw = f => () => innerWidth * f;
    const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      id: 'opening', trigger: section, start: 'top top', end: () => '+=' + q('.op-s1').offsetHeight, scrub: true, invalidateOnRefresh: true
    }});
    timeline
      .to(q('.op-line--1'), { x: vw(-.6), skewX: 24, scaleX: 1.25, transformOrigin: '100% 50%', duration: .7, ease: 'power1.in' }, 0)
      .to(q('.op-line--2'), { x: vw(.55), skewX: -24, scaleX: 1.25, transformOrigin: '0% 50%', duration: .66, ease: 'power1.in' }, .03)
      .to(q('.op-line--3'), { x: vw(-.75), skewX: 24, scaleX: 1.25, transformOrigin: '100% 50%', duration: .62, ease: 'power1.in' }, .06)
      .to(section.querySelectorAll('.op-line'), { opacity: 0, duration: .2, ease: 'none' }, .5)
      .to(q('.op-meta'), { y: -40, opacity: 0, duration: .35 }, 0)
      .to(q('.op-photo'), { scale: 1.3, xPercent: -6, filter: context.conditions.blur ? 'blur(10px)' : 'none', duration: 1 }, 0)
      .to(q('.op-slide'), { scale: .8, yPercent: -4, xPercent: 6, duration: 1, ease: 'power1.in' }, 0)
      .to(q('.op-dim'), { opacity: .78, duration: 1 }, 0)
      .to(q('.op-ground'), { opacity: 0, duration: 1 }, 0)
      .fromTo(q('.op-card'), { x: vw(.08), rotation: 2.5 }, { x: 0, rotation: 0, duration: 1, ease: 'power2.out' }, 0)
      .fromTo(q('.op-title2'), { x: vw(.35), skewX: -24, scaleX: 1.3, transformOrigin: '0% 50%' }, { x: 0, skewX: 0, scaleX: 1, duration: .8, ease: 'expo.out' }, .2)
      .fromTo(q('.op-orb'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power3.out' }, 0);
  });
}, { first: true, id: 'opening' });


// Original scene:method

queueMotion(() => {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const section = document.getElementById('method');
    const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      id: 'method', trigger: section.querySelector('.mt-title'), start: 'top 92%', end: 'top 32%', scrub: true, invalidateOnRefresh: true
    }});
    section.querySelectorAll('.mt-gap').forEach((gap, index) => {
      const chip = gap.querySelector('.mt-chip');
      const after = gap.parentElement.querySelector('.mt-after');
      const at = index * .16;
      if (after) timeline.fromTo(after, { x: () => -gap.offsetWidth }, { x: 0, duration: .45, ease: 'power2.out' }, at);
      timeline.fromTo(chip, { x: () => -gap.offsetWidth * 1.5, y: () => -innerHeight * .28, rotation: -300, scale: .45 },
        { x: 0, y: 0, rotation: 0, scale: 1, duration: .7, ease: 'power2.inOut' }, at + .04);
    });
  });
});


// Original scene:disciplines

queueMotion(() => {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const section = document.getElementById('disciplines');
    const grid = section.querySelector('.ds-grid');
    const tiles = [...grid.querySelectorAll('.ds-tile')];
    const tilt = [-8, 5, -3, 9, -6, 3, -10, 6];
    const toCentre = (tile, axis) => axis === 'x'
      ? grid.clientWidth / 2 - (tile.offsetLeft + tile.offsetWidth / 2)
      : Math.min(grid.clientHeight, innerHeight * .9) / 2 - (tile.offsetTop + tile.offsetHeight / 2);
    const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      id: 'disciplines', trigger: grid, start: 'top 88%', end: () => grid.offsetHeight > innerHeight ? 'top 2%' : grid.offsetHeight > innerHeight * .8 ? 'top 38%' : 'center 52%', scrub: true, invalidateOnRefresh: true
    }});
    gsap.set(tiles, { zIndex: index => tiles.length - index });
    tiles.forEach((tile, index) => {
      timeline.fromTo(tile, {
        x: () => toCentre(tile, 'x'), y: () => toCentre(tile, 'y'), rotation: tilt[index % tilt.length],
        scale: () => Math.min(1, 210 / tile.offsetWidth, 240 / tile.offsetHeight)
      }, { x: 0, y: 0, rotation: 0, scale: 1, duration: .5, ease: 'power2.inOut' }, index * .07);
    });
  });
});


// Original scene:lab

queueMotion(() => {
  gsap.matchMedia().add({ motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 861px)' }, context => {
    if (!context.conditions.motion) return;
    const section = document.getElementById('lab');
    const stage = section.querySelector('.lb-stage');
    const notes = [...section.querySelectorAll('.lb-note')];
    const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      id: 'lab', trigger: stage, start: 'top 88%', end: 'center 55%', scrub: true, invalidateOnRefresh: true
    }});
    timeline
      .fromTo(section.querySelector('.lb-lens'), { clipPath: 'circle(7% at 50% 50%)' }, { clipPath: 'circle(50% at 50% 50%)', duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(section.querySelector('.lb-lens .lb-core'), { scale: 1.5 }, { scale: 1, duration: 1, ease: 'power2.out' }, 0)
      .fromTo(section.querySelector('.lb-ring'), { rotation: -140, transformOrigin: '50% 50%' }, { rotation: 0, duration: 1, ease: 'power2.out' }, 0)
      .fromTo(section.querySelector('.lb-ring circle'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .6 }, 0);
    if (context.conditions.wide) {
      notes.forEach((note, index) => {
        const angle = parseFloat(note.style.getPropertyValue('--a')) || 0;
        timeline.fromTo(note, { '--a': '-90deg', opacity: 0 }, { '--a': `${angle}deg`, opacity: 1, duration: .7, ease: 'power2.out' }, .2 + index * .06);
      });
    } else {
      timeline.fromTo(notes, { x: 48, opacity: 0 }, { x: 0, opacity: 1, duration: .45, stagger: .08, ease: 'power2.out' }, .45);
    }
  });
});


// Original scene:week

queueMotion(() => {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const section = document.getElementById('week');
    const stage = section.querySelector('.wk-stage');
    const view = section.querySelector('.wk-view');
    const track = section.querySelector('.wk-track');
    section.setAttribute('data-scrubbed', '');
    const distance = () => {
      const pad = parseFloat(getComputedStyle(view).paddingLeft) || 0;
      return Math.max(0, track.offsetWidth - (view.clientWidth - pad * 2));
    };
    const measure = () => section.style.setProperty('--wk-height', `${stage.offsetHeight + distance()}px`);
    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);
    const skewTo = gsap.quickTo(track, 'skewX', { duration: .45, ease: 'power3.out' });
    const settle = gsap.delayedCall(.14, () => skewTo(0)).pause();
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      id: 'week', trigger: section, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true,
      onUpdate: self => { skewTo(gsap.utils.clamp(-9, 9, self.getVelocity() / -260)); settle.restart(true); }
    }})
      .to(track, { x: () => -distance(), duration: 1 }, 0)
      .fromTo(section.querySelector('.wk-progress span'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
    return () => {
      ScrollTrigger.removeEventListener('refreshInit', measure);
      section.style.removeProperty('--wk-height');
      section.removeAttribute('data-scrubbed');
    };
  });
});


// Original scene:recovery
queueMotion(()=>{gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{gsap.fromTo('.rc-care',{yPercent:4,scale:1.04},{yPercent:0,scale:1,ease:'none',scrollTrigger:{id:'recovery',trigger:'.rc-window',start:'top 92%',end:'center 50%',scrub:true}})})});

// Original scene:faq

queueMotion(() => {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const section = document.getElementById('faq');
    const rail = section.querySelector('.fq-rail');
    const ball = section.querySelector('.fq-ball');
    const travel = () => Math.max(0, rail.clientHeight - ball.offsetHeight);
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      id: 'faq', trigger: section.querySelector('.fq-list'), start: 'top 72%', end: 'bottom 72%', scrub: .5, invalidateOnRefresh: true
    }})
      .fromTo(ball, { y: 0, rotation: 0 }, { y: travel, rotation: 0, duration: 1 });
    const items = section.querySelectorAll('.fq-item');
    const onToggle = () => refreshScroll();
    items.forEach(item => item.addEventListener('toggle', onToggle));
    return () => items.forEach(item => item.removeEventListener('toggle', onToggle));
  });
});


// Original scene:contact

queueMotion(() => {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const section = document.getElementById('contact');
    const run = section.querySelector('.ct-run');
    const title = section.querySelector('.ct-title');
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      id: 'contact', trigger: run, start: 'top 92%', end: 'top 38%', scrub: true, invalidateOnRefresh: true
    }})
      .fromTo(section.querySelector('.ct-line'), { scaleX: () => title.offsetWidth / run.clientWidth }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(title, { x: () => -(run.clientWidth - title.offsetWidth), skewX: -16 }, { x: 0, skewX: 0, duration: 1, ease: 'power2.inOut' }, 0);
  });
});


// Original scene:compact-work
queueMotion(()=>gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
 const grid=document.querySelector('.co-list'),cards=[...grid.children],tilt=[-8,6,-4];
 const tl=gsap.timeline({scrollTrigger:{id:'compact-work-spread',trigger:grid,start:'top 88%',end:'top 65%',scrub:true,invalidateOnRefresh:true}});
 cards.forEach((card,i)=>tl.fromTo(card,{x:()=>grid.clientWidth/2-card.offsetLeft-card.offsetWidth/2,y:()=>Math.min(grid.clientHeight,innerHeight*.7)/2-card.offsetTop-card.offsetHeight/2,rotation:tilt[i],scale:.72},{x:0,y:0,rotation:0,scale:1,duration:.55,ease:'power2.inOut'},i*.09));
}));
/* Owned motion for service demonstrations; no video/network dependency. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const targets=[...document.querySelectorAll('[data-service-demo],.hd-plan-visual')];
 const visible=new WeakMap();
 const update=()=>targets.forEach(e=>{
  const run=visible.get(e)&&(!e.matches('[data-service-demo]')||e.closest('figure').dataset.demoHovered==='true')&&!reduce.matches&&!document.hidden&&!document.body.hasAttribute('data-ambient-paused')&&!document.body.hasAttribute('data-menu-open');
  e.style.setProperty('--service-play',run?'running':'paused');e.dataset.demoPlaying=String(!!run);
 });
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(es=>{es.forEach(x=>visible.set(x.target,x.isIntersecting));update()},{threshold:.15});targets.forEach(e=>observer.observe(e));}
 else targets.forEach(e=>visible.set(e,true));
 targets.filter(e=>e.matches('[data-service-demo]')).forEach(e=>{const tile=e.closest('figure');tile.dataset.demoHovered='false';listen(tile,'pointerenter',event=>{tile.dataset.demoHovered=String(event.pointerType!=='touch'&&matchMedia('(hover:hover)').matches);update()});listen(tile,'pointerleave',()=>{tile.dataset.demoHovered='false';update()})});
 new MutationObserver(update).observe(document.body,{attributes:true,attributeFilter:['data-ambient-paused','data-menu-open']});
 listen(document,'visibilitychange',update);listen(reduce,'change',update);update();
})();

/* Choreographed entrances, responsive flow traces and authentic website screen loops. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),touch=matchMedia('(hover: none)');
 const plan=document.querySelector('.hd-plan-visual');
 const drawFlow=()=>{if(!plan)return;const nodes=[...plan.querySelectorAll('.hd-plan-node')],svg=plan.querySelector('svg');svg.setAttribute('viewBox',`0 0 ${plan.clientWidth} ${plan.clientHeight}`);const local=e=>{let x=0,y=0,n=e;while(n&&n!==plan){x+=n.offsetLeft;y+=n.offsetTop;n=n.offsetParent}return {x,y,w:e.offsetWidth,h:e.offsetHeight}};for(let i=0;i<2;i++){let a=local(nodes[i]),b=local(nodes[i+1]),vertical=b.y>a.y+a.h/2;let d=vertical?`M${a.x+a.w/2},${a.y+a.h} L${b.x+b.w/2},${b.y}`:`M${a.x+a.w},${a.y+a.h/2} L${b.x},${b.y+b.h/2}`;svg.querySelector(`.hd-flow-base-${i+1}`).setAttribute('d',d);svg.querySelector(`.hd-flow-trace-${i+1}`).setAttribute('d',d);svg.querySelector(`.hd-flow-signal-${i+1}`)?.setAttribute('d',d)}};
 if(plan){new ResizeObserver(drawFlow).observe(plan);document.fonts.ready.then(()=>{if(alive())drawFlow()});listen(browser,'resize',drawFlow,{passive:true});drawFlow()}
 // Each transform has one owner: outer media enters; inner cameras/screens animate independently.
 const entrances=()=>{if(!alive())return;
  if(!window.gsap||!window.ScrollTrigger)return;
  const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const reveal=(targets,trigger,delay=0,duration=.75,stagger=.11)=>{if(!targets.length||targets.some(e=>e.contains(document.activeElement)||e.closest('a')===document.activeElement))return;gsap.fromTo(targets,{y:28,opacity:0,filter:'blur(5px)'},{y:0,opacity:1,filter:'blur(0px)',duration,stagger,delay,ease:'power3.out',scrollTrigger:{trigger,start:'top 86%',once:true}})};
   reveal([...document.querySelectorAll('.hd-plan-node')],plan,0,.55,.08);

   reveal([...document.querySelectorAll('#disciplines .ds-copy p,#disciplines .ds-note')],document.querySelector('.ds-copy'));

  });
 };
 const settleFocus=event=>{const owner=event.target.closest?.('.co-person>a,.ds-tile--link,.mt-foot a');if(!owner||!window.gsap)return;const targets=owner.matches('.co-person>a')?[owner.querySelector('.co-photo'),...owner.querySelector('figcaption').children]:[owner];gsap.killTweensOf(targets);gsap.set(targets,{y:0,opacity:1,filter:'blur(0px)'})};
 listen(document,'focusin',settleFocus);Promise.resolve(window.motionReady).then(()=>{entrances();settleFocus({target:document.activeElement})});
 const models=[];
 const update=()=>models.forEach(m=>{const allowed=m.ready&&m.tl&&!reduced.matches&&!document.hidden&&!document.body.hasAttribute('data-ambient-paused')&&!document.body.hasAttribute('data-menu-open')&&m.visible&&m.hovered;m.el.dataset.previewPlaying=String(!!allowed);if(m.tl)allowed?m.tl.resume():m.tl.pause()});
 document.querySelectorAll('[data-work-preview]').forEach(el=>{
  const image=el.querySelector('img'),link=el.closest('a'),m={el,image,visible:false,hovered:false,focused:false,ready:false,pending:false,tl:null,travel:0};models.push(m);
  const measure=()=>{m.travel=Math.max(0,Math.min(image.clientHeight-el.clientHeight,el.clientHeight*1.75));if(m.tl){const t=m.tl.time();m.tl.invalidate();m.tl.time(t)}};
  const build=()=>{if(!alive()||m.tl||!window.gsap)return;measure();const phase=p=>()=>{el.dataset.previewPhase=p};m.tl=gsap.timeline({paused:true,repeat:-1,onRepeat:()=>{el.dataset.previewLoop=String(m.tl.iteration())}}).call(phase('hold')).to(image,{y:()=>-m.travel,duration:10,ease:'none'},1.2).call(phase('blur')).to(image,{filter:'blur(11px)',opacity:0,duration:.45},'>+=.7').set(image,{y:0}).call(phase('reset')).to(image,{filter:'blur(0px)',opacity:1,duration:.6}).call(phase('hold')).to({},{duration:1.1});m.ready=true;el.__preview=m;update()};
  const init=(()=>{let generation=0;return ()=>{
   if(!alive()||m.tl)return;generation++;
   if(m.pending||!image.complete||!image.naturalWidth)return;
   m.pending=true;const requested=generation,source=image.currentSrc||image.src;
   // Coalesce loads received during decode; only the latest source may build.
   // No new load means no retry after a persistent decode failure.
   const settle=ok=>{m.pending=false;if(!alive())return;
    if(requested!==generation){init();return;}
    if(ok&&source===(image.currentSrc||image.src))runOwned(build);
   };
   try{const decoded=typeof image.decode==='function'?image.decode():Promise.resolve();
    Promise.resolve(decoded).then(()=>settle(true),()=>settle(false));
   }catch{settle(false);}
  };})();
  listen(image,'load',init);if(image.complete&&image.naturalWidth)init();new ResizeObserver(measure).observe(el);
  listen(el,'pointerenter',e=>{m.hovered=e.pointerType!=='touch'&&matchMedia('(hover:hover)').matches;update()});listen(el,'pointerleave',()=>{m.hovered=false;update()});listen(link,'focusin',()=>{m.focused=true;update()});listen(link,'focusout',()=>{m.focused=false;update()});
  new IntersectionObserver(es=>{m.visible=es[0].intersectionRatio>.2;update()},{threshold:[0,.2,.5]}).observe(el);
 });
 const preferences=()=>{models.forEach(m=>{if(reduced.matches){m.tl?.pause(0);gsap.set(m.image,{y:0,filter:'blur(0px)',opacity:1});m.el.dataset.previewPhase='still'}});update()};
 listen(reduced,'change',preferences);listen(touch,'change',update);listen(document,'visibilitychange',update);new MutationObserver(update).observe(document.body,{attributes:true,attributeFilter:['data-ambient-paused','data-menu-open']});update();diagnostics.workPreviews=models;
})();

(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),hover=matchMedia('(hover:hover)');
 const cards=[...document.querySelectorAll('[data-process-card]')],visible=new WeakMap(),pointed=new WeakMap();
 const update=()=>cards.forEach(e=>{const run=visible.get(e)&&pointed.get(e)&&hover.matches&&!reduced.matches&&!document.hidden&&!document.body.hasAttribute('data-ambient-paused')&&!document.body.hasAttribute('data-menu-open');e.dataset.processPlaying=String(!!run)});
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>visible.set(e.target,e.intersectionRatio>.15));update()},{threshold:[0,.15,.5]});
 cards.forEach(e=>{e.dataset.processPlaying='false';observer.observe(e);listen(e,'pointerenter',event=>{pointed.set(e,event.pointerType!=='touch');update()});listen(e,'pointerleave',()=>{pointed.set(e,false);update()})});
 listen(reduced,'change',update);listen(hover,'change',update);listen(document,'visibilitychange',update);new MutationObserver(update).observe(document.body,{attributes:true,attributeFilter:['data-ambient-paused','data-menu-open']});update();
})();

}
