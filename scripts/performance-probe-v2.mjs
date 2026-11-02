// Browser-only observer: deliberately no recurring geometry reads in RAF.
export function installPerformanceProbe(){
 const state=window.__perf={tasks:[],shifts:[],lcp:[],frames:[],positions:[],marks:{},phase:'startup'};
 for(const type of ['longtask','layout-shift','largest-contentful-paint'])try{
  new PerformanceObserver(list=>{for(const e of list.getEntries()){
   if(type==='longtask')state.tasks.push({t:e.startTime,d:e.duration});
   if(type==='layout-shift')state.shifts.push({t:e.startTime,value:e.value,recent:e.hadRecentInput});
   if(type==='largest-contentful-paint')state.lcp.push({t:e.startTime,size:e.size,url:e.url});
  }}).observe({type,buffered:true});
 }catch{}
 let last;
 function frame(t){if(last!==undefined)state.frames.push({t,d:t-last});last=t;requestAnimationFrame(frame);}
 requestAnimationFrame(frame);
 let sampled=-Infinity;
 addEventListener('scroll',()=>{
  if(state.phase!=='scroll')return;const t=performance.now();if(t-sampled<50)return;sampled=t;
  const y=window.scrollY;state.positions.push({t,y});
  if(y>0&&!state.marks.activeStart){state.marks.activeStart=t;performance.mark('remediation-active-start');}
  if(y>=1705&&!state.marks.openingEnd){state.marks.openingEnd=t;performance.mark('remediation-opening-end');}
 },{passive:true});
}
export function phaseAt(t,marks){return t<marks.scrollStart?'startup':t<marks.scrollEnd?'scroll':'idle';}
// Compatibility entry point: the old implicit-inventory evaluator is retired.
// Historical measured bytes remain in round2/source-snapshot and HARNESS-FREEZE.
export {summarizeRun,stats,evaluateArms} from './performance-probe-v3.mjs';
