import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from '/home/gpanagary/projects/horizon-digital-release-candidate/qa/node_modules/playwright/index.mjs';
import {installPerformanceProbe,evaluateArms} from './performance-probe-v2.mjs';
import {startLocalWorker} from './local-round2-worker.mjs';
const configs=process.env.PERF_CONFIGS?JSON.parse(process.env.PERF_CONFIGS):null;
let owned;
const [baseline,candidate,output]=process.argv.slice(2);if(!output)throw Error('baseline candidate output required');
const arms=process.env.PERF_ARMS?JSON.parse(process.env.PERF_ARMS):{baseline,candidate};
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({args:['--disable-dev-shm-usage']});
const bc=await browser.newBrowserCDPSession();await fs.writeFile(path.join(output,'gpu.json'),JSON.stringify(await bc.send('SystemInfo.getInfo'),null,2));await bc.detach();
const results=[];
try{for(let run=1;run<=3;run++)for(const arm of (run===2?Object.keys(arms).reverse():Object.keys(arms))){
 if(configs)owned=await startLocalWorker(configs[arm],path.join(output,`worker-${run}-${arm}.log`));
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true});await context.addInitScript(installPerformanceProbe);const page=await context.newPage(),cdp=await context.newCDPSession(page);const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 // Default-off consent untouched. Block collectors, never opt in or send leads.
 await context.route(/https:\/\/([^/]*google-analytics\.com|[^/]*analytics\.google\.com|[^/]*googletagmanager\.com)\//,r=>r.abort());
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Tracing.start',{categories:'devtools.timeline,blink.user_timing,disabled-by-default-devtools.timeline',transferMode:'ReturnAsStream'});
 await page.goto(arms[arm],{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.querySelector('.editorial-home')?.dataset.motionReady==='true');await page.waitForTimeout(4500);
 const geometry=await page.evaluate(()=>({height:document.documentElement.scrollHeight,opening:document.querySelector('#opening').getBoundingClientRect().toJSON(),ready:document.fonts.status}));
 await page.mouse.move(8,180);await page.evaluate(()=>{const p=window.__perf;p.phase='scroll';p.marks.scrollStart=performance.now();performance.mark('remediation-scroll-start');});
 for(let i=0;i<32;i++){await page.mouse.wheel(0,600);await page.waitForTimeout(160);}await page.waitForTimeout(800);
 await page.evaluate(()=>{const p=window.__perf;p.marks.scrollEnd=performance.now();performance.mark('remediation-scroll-end');p.phase='idle';});await page.waitForTimeout(150);
 const perf=await page.evaluate(()=>({...window.__perf,endY:scrollY,resources:performance.getEntriesByType('resource').map(e=>({name:e.name,encoded:e.encodedBodySize,transfer:e.transferSize}))}));
 perf.marks.activeEnd=perf.positions.find(p=>p.y>=geometry.height-844-1)?.t??perf.marks.scrollEnd;
 const done=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');const {stream}=await done;let text='';for(;;){const r=await cdp.send('IO.read',{handle:stream});text+=r.data;if(r.eof)break;}await cdp.send('IO.close',{handle:stream});
 const key=`mobile-${run}-${arm}`,row={key,profile:'mobile',run,arm,geometry,errors,perf};results.push(row);await fs.writeFile(path.join(output,key+'.trace.json'),text);await fs.writeFile(path.join(output,key+'.json'),JSON.stringify(row,null,2));console.log(key);await context.close();if(owned){await owned.stop();owned=null;}
}}finally{await browser.close();if(owned)await owned.stop();}
// Measurement status never implies retention. Gate CLI evaluates these separately.
const measurementComplete=results.length===Object.keys(arms).length*3&&results.every(r=>r.errors.length===0);
await fs.writeFile(path.join(output,'measurement-status.json'),JSON.stringify({measurementComplete,reports:results.length},null,2));
await fs.writeFile(path.join(output,'gate.json'),JSON.stringify(evaluateArms(results),null,2));
if(!measurementComplete)process.exitCode=1;
