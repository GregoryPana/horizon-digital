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
import gsap from 'gsap';
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
describe('editorial home lifecycle resource ownership',()=>{
  it('owns async decoded-preview continuation and refuses it after route unmount',async()=>{
    let ready!:()=>void;
    const decoded=new Promise<void>(resolve=>{ready=resolve});
    dispose=mountEditorialHome(root);
    const env=h.environments[0],build=vi.fn();
    const pending=decoded.then(()=>env.runOwned(build));
    dispose();dispose=undefined;ready();await pending;
    expect(build).not.toHaveBeenCalled();
    expect(h.contexts[0].revert).toHaveBeenCalledOnce();
    expect(h.tickers.size).toBe(0);
  });
  it('runs decoded-preview creation inside only the current owned context',()=>{
    dispose=mountEditorialHome(root);
    const build=vi.fn(()=>42);
    expect(h.environments[0].runOwned(build)).toBe(42);
    expect(build).toHaveBeenCalledOnce();
  });
  it('registers the shared plugin before Home DOM mount and never re-registers on remount',async()=>{
    expect(gsap.registerPlugin).toHaveBeenCalledOnce();
    Object.defineProperty(document,'fonts',{configurable:true,value:{ready:Promise.resolve()}});
    const first=mountEditorialHome(root);await flush();first();
    dispose=mountEditorialHome(root);await flush();
    expect(gsap.registerPlugin).toHaveBeenCalledOnce();
    expect(h.jobs).toBe(2);
    expect((root as any).__editorialHome.active).toBe(true);
  });
  it('cancels deferred font setup before unmount, and disconnects every owned observer/ticker/listener',async()=>{
    let ready!:()=>void;
    Object.defineProperty(document,'fonts',{configurable:true,value:{ready:new Promise<void>(resolve=>{ready=resolve;})}});
    dispose=mountEditorialHome(root);
    const state=(root as any).__editorialHome;
    document.dispatchEvent(new Event('home-test-event'));
    expect(h.events).toBe(1);expect(h.tickers.size).toBe(1);
    dispose();dispose=undefined;
    ready();await flush();
    expect(h.jobs).toBe(0);expect(h.tickers.size).toBe(0);
    expect(state.active).toBe(false);expect(state.lenis).toBeNull();
    expect((root as any).__editorialHome).toBeUndefined();
    for(const observer of h.observers) expect(observer.disconnect).toHaveBeenCalledOnce();
    expect(h.lenis[0].destroy).toHaveBeenCalledOnce();
    expect(h.contexts[0].revert).toHaveBeenCalledOnce();
    document.dispatchEvent(new Event('home-test-event'));expect(h.events).toBe(1);
  });
  it('exposes the identical owned observer to legacy window capability checks and injection', () => {
    dispose=mountEditorialHome(root);
    const env=h.environments[0];
    expect('IntersectionObserver' in env.window).toBe(true);
    expect(env.window.IntersectionObserver).toBe(env.IntersectionObserver);
    const observer=new env.window.IntersectionObserver(()=>{});
    expect(h.observers).toContain(observer);
    dispose(); dispose=undefined;
    expect(observer.disconnect).toHaveBeenCalledOnce();
  });
  it('remounts independently without a global Lenis or retained callbacks',async()=>{
    Object.defineProperty(document,'fonts',{configurable:true,value:{ready:Promise.resolve()}});
    const first=mountEditorialHome(root);await flush();first();
    dispose=mountEditorialHome(root);await flush();
    document.dispatchEvent(new Event('home-test-event'));
    expect(h.jobs).toBe(2);expect(h.events).toBe(1);expect(h.tickers.size).toBe(1);
    expect(h.lenis).toHaveLength(2);expect(h.lenis[0].destroy).toHaveBeenCalledOnce();
    expect((window as any).lenis).toBeUndefined();
    expect(root.dataset.motionReady).toBe('true');
  });
});
