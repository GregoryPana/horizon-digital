import {it,expect} from 'vitest';import {spawnSync} from 'node:child_process';
it('executes the preserved v2 observer and versioned v3 admission contract',()=>{const r=spawnSync(process.execPath,['--test','scripts/performance-probe-v2.contract.mjs'],{encoding:'utf8'});expect(r.status,r.stdout+r.stderr).toBe(0);});
