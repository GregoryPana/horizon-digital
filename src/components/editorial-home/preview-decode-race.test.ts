import {readFileSync} from 'node:fs';
import {describe,it,expect,vi} from 'vitest';
// Execute the production lexical closure, not a copy or a string-presence oracle.
const source=readFileSync(new URL('./original-scenes.ts',import.meta.url),'utf8');
const closure=source.slice(source.indexOf('  const init='),source.indexOf("new ResizeObserver(measure).observe(el);"));
const deferred=()=>{let resolve!:()=>void,reject!:(e:Error)=>void;const promise=new Promise<void>((a,b)=>{resolve=a;reject=b});return {promise,resolve,reject};};
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
function fixture(){
 const gates:ReturnType<typeof deferred>[]=[];let mounted=true,load!:()=>void;
 const image={complete:true,naturalWidth:320,currentSrc:'first.webp',src:'first.webp',decode:vi.fn(()=>{const gate=deferred();gates.push(gate);return gate.promise;})};
 const m={pending:false,tl:null as unknown};const build=vi.fn(()=>{m.tl={};});const runOwned=vi.fn((fn:()=>void)=>{if(mounted)fn();});
 new Function('image','m','alive','runOwned','build','listen',closure)(image,m,()=>mounted,runOwned,build,(_image:unknown,_event:string,fn:()=>void)=>{load=fn;});
 return {image,m,gates,build,runOwned,load:()=>load(),unmount:()=>{mounted=false;}};
}
describe('production decoded preview load closure',()=>{
 it('retries a valid latest load lost during an older rejected decode',async()=>{const f=fixture();f.image.currentSrc='latest.webp';f.load();f.gates[0].reject(Error('old source'));await flush();expect(f.image.decode).toHaveBeenCalledTimes(2);expect(f.build).not.toHaveBeenCalled();f.gates[1].resolve();await flush();expect(f.build).toHaveBeenCalledOnce();expect(f.m.pending).toBe(false);});
 it('never installs an old successful decode for a newer source',async()=>{const f=fixture();f.image.currentSrc='latest.webp';f.load();f.gates[0].resolve();await flush();expect(f.build).not.toHaveBeenCalled();expect(f.gates).toHaveLength(2);f.gates[1].resolve();await flush();expect(f.build).toHaveBeenCalledOnce();});
 it('coalesces queued loads and does not endlessly retry persistent failure',async()=>{const f=fixture();f.load();f.load();f.load();f.gates[0].reject(Error('old'));await flush();expect(f.gates).toHaveLength(2);f.gates[1].reject(Error('persistent'));await flush();expect(f.gates).toHaveLength(2);expect(f.m.pending).toBe(false);expect(f.build).not.toHaveBeenCalled();});
 it('creates the timeline through owned context after native success',async()=>{const f=fixture();f.gates[0].resolve();await flush();expect(f.runOwned).toHaveBeenCalledOnce();expect(f.build).toHaveBeenCalledOnce();f.load();expect(f.gates).toHaveLength(1);});
 it.each(['resolve','reject'] as const)('unmount refuses stale %s and queued retry',async(mode)=>{const f=fixture();f.load();f.unmount();if(mode==='resolve')f.gates[0].resolve();else f.gates[0].reject(Error('old'));await flush();expect(f.build).not.toHaveBeenCalled();expect(f.runOwned).not.toHaveBeenCalled();expect(f.gates).toHaveLength(1);});
});
