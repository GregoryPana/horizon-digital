// V3 admission/retention contract; measured v2 timestamp-only observer unchanged.
export {installPerformanceProbe,phaseAt} from './performance-probe-v2.mjs';
import {phaseAt} from './performance-probe-v2.mjs';
const requireThat=(ok,message)=>{if(!ok)throw Error(message);};
const finite=(n,positive=false)=>Number.isFinite(n)&&(positive?n>0:n>=0);
const sum=values=>{let total=0;for(const v of values){requireThat(finite(v),'invalid summand');total+=v;requireThat(finite(total),'nonfinite aggregate');}return total;};
export function declaredIdentities(inventory){
 requireThat(inventory&&typeof inventory.profile==='string'&&inventory.profile.length>0,'explicit profile required');
 const {arms,runs}=inventory;requireThat(Array.isArray(arms)&&arms.length>=2&&arms.includes('baseline')&&arms.every(x=>typeof x==='string'&&x.length)&&new Set(arms).size===arms.length,'explicit unique baseline and candidate arms required');
 requireThat(Array.isArray(runs)&&runs.length===3&&runs.every(x=>Number.isInteger(x)&&x>0)&&new Set(runs).size===3,'three explicit unique runs required');
 return arms.flatMap(arm=>runs.map(run=>({profile:inventory.profile,arm,run})));
}
const identity=x=>JSON.stringify([x.profile,x.arm,x.run]);
export function validateInventory(rows,inventory){
 const expected=declaredIdentities(inventory).map(identity);requireThat(Array.isArray(rows)&&rows.length===expected.length,'inventory count mismatch');const keys=rows.map(identity);
 requireThat(new Set(keys).size===keys.length&&keys.every(k=>expected.includes(k)),'duplicate/extra/missing identity');
 for(const row of rows)requireThat(Array.isArray(row.errors)&&row.errors.length===0,'missing error status or page errors');return keys;
}
export function validateCompletion(receipt,rows,inventory){
 const keys=validateInventory(rows,inventory).sort();requireThat(receipt?.measurementComplete===true&&receipt.reports===keys.length,'unsuccessful completion receipt');
 requireThat(Array.isArray(receipt.inventory)&&receipt.inventory.length===keys.length,'completion identity inventory required');
 const ids=receipt.inventory.map(identity).sort();requireThat(new Set(ids).size===ids.length&&JSON.stringify(ids)===JSON.stringify(keys),'completion identity mismatch');
}
export function summarizeRun(row){
 const p=row?.perf,m=p?.marks;requireThat(m,'phase marks required');for(const k of ['scrollStart','activeStart','openingEnd','activeEnd','scrollEnd'])requireThat(finite(m[k]),'invalid mark '+k);
 requireThat(m.scrollStart<=m.activeStart&&m.activeStart<m.openingEnd&&m.openingEnd<=m.activeEnd&&m.activeEnd<=m.scrollEnd,'unordered/uncontained marks');
 for(const k of ['tasks','frames','shifts','lcp'])requireThat(Array.isArray(p[k]),'missing array '+k);
 requireThat(p.lcp.length>0&&p.lcp.every((x,i)=>finite(x.t,true)&&x.t<=m.scrollStart&&(!i||x.t>=p.lcp[i-1].t)),'positive pre-input ordered LCP required');
 requireThat(p.frames.length>0,'frames required');
 for(const [i,f] of p.frames.entries()){requireThat(finite(f.t,true)&&finite(f.d,true)&&f.t-f.d>=0,'invalid positive frame');if(i){const prev=p.frames[i-1];requireThat(f.t>prev.t&&Math.abs((f.t-prev.t)-f.d)<=.001,'duplicate/nonmonotonic/incoherent frames');}}
 sum(p.frames.map(f=>f.d));for(const t of p.tasks)requireThat(finite(t.t)&&finite(t.d),'invalid task');sum(p.tasks.map(t=>t.d));
 for(const s of p.shifts)requireThat(finite(s.t)&&finite(s.value)&&typeof s.recent==='boolean','invalid shift');
 const tasks=phase=>p.tasks.filter(t=>phaseAt(t.t,m)===phase).map(t=>t.d);
 const hz=(a,b)=>{const frames=p.frames.filter(f=>f.t>=a&&f.t<b);requireThat(frames.length>0,'positive frame-window coverage required');const mean=sum(frames.map(f=>f.d))/frames.length;const rate=1000/mean;requireThat(finite(mean,true)&&finite(rate,true),'invalid aggregate cadence');return rate;};
 const startup=tasks('startup'),scroll=tasks('scroll');
 return {startupLongtask:sum(startup),scrollLongtask:sum(scroll),startupLongest:Math.max(0,...startup),scrollLongest:Math.max(0,...scroll),openingLongtask:sum(p.tasks.filter(t=>t.t>=m.scrollStart&&t.t<m.openingEnd).map(t=>t.d)),lcp:p.lcp.at(-1).t,cls:sum(p.shifts.filter(s=>!s.recent).map(s=>s.value)),activeHz:hz(m.activeStart,m.activeEnd),openingHz:hz(m.activeStart,m.openingEnd)};
}
export const stats=values=>{requireThat(values.length>0&&values.every(n=>finite(n)),'invalid stats');return {median:[...values].sort((a,b)=>a-b)[Math.floor(values.length/2)],min:Math.min(...values),max:Math.max(...values)};};
export function evaluateArms(rows,inventory){
 validateInventory(rows,inventory);const summary={},verdicts={};for(const arm of inventory.arms){const values=rows.filter(r=>r.arm===arm).map(summarizeRun);summary[arm]={};for(const k of Object.keys(values[0]))summary[arm][k]=stats(values.map(v=>v[k]));}
 for(const arm of inventory.arms.filter(n=>n!=='baseline')){const checks={};for(const k of ['startupLongtask','scrollLongtask','lcp']){const base=summary.baseline[k].median,candidate=summary[arm][k].median;checks[k]=base===0?candidate===0:candidate/base<=1.1;}for(const k of ['activeHz','openingHz'])checks[k]=summary[arm][k].median/summary.baseline[k].median>=.9;verdicts[arm]={checks,pass:Object.values(checks).every(v=>v===true)};}
 return {version:3,inventory,summary,verdicts,pass:Object.values(verdicts).every(v=>v.pass===true)};
}
