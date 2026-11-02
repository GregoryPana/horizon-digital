// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const h = vi.hoisted(() => ({ jobs:0, events:0, contexts:[] as any[], observers:[] as any[], tickers:new Set(), lenis:[] as any[], environments:[] as any[] }));
vi.mock('gsap', () => ({ default: {
  registerPlugin: vi.fn(),
  context: () => { const c={ add:(fn:()=>void)=>fn(), revert:vi.fn(), getTweens:()=>[] };h.contexts.push(c);return c; },
  ticker: { add:(fn:unknown)=>h.tickers.add(fn),remove:(fn:unknown)=>h.tickers.delete(fn) },
  matchMedia:vi.fn(),
} }));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger:{ update:vi.fn(),sort:vi.fn(),refresh:vi.fn(),getAll:()=>[] } }));
vi.mock('./lenis.js', () => ({ default:class {
  start=vi.fn();stop=vi.fn();destroy=vi.fn();on=vi.fn();raf=vi.fn();
  constructor(){h.lenis.push(this);}
} }));
vi.mock('./original-scenes', () => ({ mountOriginalScenes:(env:any)=>{
  h.environments.push(env);
  env.queueMotion(()=>{h.jobs++;});
  env.listen(document,'home-test-event',()=>{h.events++;});
  new env.IntersectionObserver(()=>{}).observe(env.document.body);
} }));
import { mountEditorialHome } from './runtime';
let dispose:(()=>void)|undefined;
let root:HTMLDivElement;
class Observer {
  disconnect=vi.fn();observe=vi.fn();
  constructor(){h.observers.push(this);}
}
beforeEach(()=>{
  h.jobs=0;h.events=0;h.contexts=[];h.observers=[];h.tickers.clear();h.lenis=[];h.environments=[];
  vi.stubGlobal('IntersectionObserver',Observer);vi.stubGlobal('ResizeObserver',Observer);vi.stubGlobal('MutationObserver',Observer);
  vi.stubGlobal('matchMedia',()=>Object.assign(new EventTarget(),{matches:false}));
  window.matchMedia=globalThis.matchMedia;
  root=document.createElement('div');root.getAnimations=()=>[];document.body.append(root);
});
afterEach(()=>{dispose?.();dispose=undefined;root.remove();vi.unstubAllGlobals();});
const flush=async()=>{await Promise.resolve();await Promise.resolve();};
describe('editorial motion replacements for retired Home wiring',()=>{
  it('does not create smooth scrolling when reduced motion is requested', async()=>{
    const media=Object.assign(new EventTarget(),{matches:true});
    vi.stubGlobal('matchMedia',()=>media);window.matchMedia=globalThis.matchMedia;
    dispose=mountEditorialHome(root);await flush();
    expect(h.lenis).toHaveLength(0);
    expect(root.dataset.motionReady).toBe('true');
  });
  it('reacts to changed motion preferences and destroys the old smooth-scroll owner',()=>{
    const media=Object.assign(new EventTarget(),{matches:false});
    vi.stubGlobal('matchMedia',()=>media);window.matchMedia=globalThis.matchMedia;
    dispose=mountEditorialHome(root);
    expect(h.lenis).toHaveLength(1);
    media.matches=true;media.dispatchEvent(new Event('change'));
    expect(h.lenis[0].destroy).toHaveBeenCalledOnce();
    expect((root as any).__editorialHome.lenis).toBeNull();
    media.matches=false;media.dispatchEvent(new Event('change'));
    expect(h.lenis).toHaveLength(2);
    dispose();dispose=undefined;
    expect(h.lenis[1].destroy).toHaveBeenCalledOnce();
    media.dispatchEvent(new Event('change'));expect(h.lenis).toHaveLength(2);
  });
  it('owns pointer atmosphere locally and blocks touch, menu-open and reduced-motion updates',()=>{
    const media=Object.assign(new EventTarget(),{matches:false});
    vi.stubGlobal('matchMedia',()=>media);window.matchMedia=globalThis.matchMedia;
    const move=(pointerType='mouse')=>root.dispatchEvent(Object.assign(new Event('pointermove'),{pointerType,clientX:123,clientY:456}));
    dispose=mountEditorialHome(root);
    move();expect(root.style.getPropertyValue('--home-pointer-x')).toBe('123px');
    expect(root.style.getPropertyValue('--home-pointer-y')).toBe('456px');
    root.style.removeProperty('--home-pointer-x');move('touch');
    expect(root.style.getPropertyValue('--home-pointer-x')).toBe('');
    document.body.setAttribute('data-menu-open','');move();
    expect(root.style.getPropertyValue('--home-pointer-x')).toBe('');
    document.body.removeAttribute('data-menu-open');media.matches=true;move();
    expect(root.style.getPropertyValue('--home-pointer-x')).toBe('');
    dispose();dispose=undefined;media.matches=false;move();
    expect(root.style.getPropertyValue('--home-pointer-x')).toBe('');
    expect(root.style.getPropertyValue('--home-pointer-y')).toBe('');
  });
});
