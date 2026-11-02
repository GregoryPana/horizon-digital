import {spawn} from 'node:child_process';import fs from 'node:fs';
export async function startLocalWorker(config,log){
 const fd=fs.openSync(log,'a');const child=spawn(process.execPath,['/home/gpanagary/projects/horizon-digital-release-candidate/qa/node_modules/wrangler/bin/wrangler.js','dev','--config',config,'--port','4320','--inspector-port','9450','--persist-to',process.env.TMPDIR+'/horizon-round2-worker','--local'],{detached:true,stdio:['ignore',fd,fd],env:{...process.env,WRANGLER_SEND_METRICS:'false'}});fs.closeSync(fd);
 const stop=async()=>{try{process.kill(-child.pid,'SIGTERM');}catch{}await Promise.race([new Promise(r=>child.once('exit',r)),new Promise(r=>setTimeout(r,1500))]);};
 try{for(let i=0;i<120;i++){if(child.exitCode!==null)throw Error('owned local Worker exited '+child.exitCode);try{const r=await fetch('http://127.0.0.1:4320/');if(r.ok){const html=await r.text();if(html.includes('/assets/index-'))return {stop,html,pid:child.pid};}}catch{}await new Promise(r=>setTimeout(r,250));}throw Error('Worker readiness failed');}catch(e){await stop();throw e;}
}
