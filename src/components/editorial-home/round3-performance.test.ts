import {describe,it,expect} from 'vitest';import {readFileSync} from 'node:fs';import {execFileSync} from 'node:child_process';
const css=(p:string)=>readFileSync(new URL(p,import.meta.url),'utf8');
describe('Round3 stationary ambient contract',()=>{
 it('removes autonomous ambient assignments without disabling content motion',()=>{
 const global=css('../../index.css'),home=css('./editorial-home.css'),hero=css('../ui/heroBuildExtraction.css');
 expect(global).not.toMatch(/animation:\s*horizon-drift|animation:\s*home-continuous-atmosphere/);expect(home).not.toMatch(/animation:\s*home-continuous-atmosphere/);expect(hero).not.toMatch(/animation:\s*elegant-dark-pattern-drift/);
 expect(home).toContain('animation: op-pan 9s');expect(home).toContain('var(--home-pointer-x) var(--home-pointer-y)');
 });
 it('executes v3 production evaluator and CLI controls',()=>{expect(()=>execFileSync(process.execPath,['--test','scripts/performance-probe-v3.contract.mjs','scripts/performance-probe-v3-cli.contract.mjs'],{cwd:process.cwd(),encoding:'utf8'})).not.toThrow();});
});
