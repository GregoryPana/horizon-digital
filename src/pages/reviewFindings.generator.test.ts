import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import facts from '../data/businessFacts.json';
const generator=resolve('scripts/migrate-editorial-home.mjs');
describe('review F1: deterministic governed telephone generation',()=>{
  it('replaces a masked prototype action from facts and follows later fact changes',()=>{
    const temp=mkdtempSync(join(process.env.TMPDIR!, 'review-generator-'));
    try {
      mkdirSync(join(temp,'reference/assets'),{recursive:true});
      mkdirSync(join(temp,'src/data'),{recursive:true});
      writeFileSync(join(temp,'reference/index.html'),'<main><a href="tel:+248****4525">Telephone</a></main>');
      for(const name of ['horizon.css','service-demos.js','rich-motion.js','process-scenes.js','LICENSE','CREDITS.md','assets/lenis.min.js']) writeFileSync(join(temp,'reference',name),'');
      for(const phone of [facts.site.phone, '+123 45678901']) {
        // Each probe is a fresh one-time import, not a reset of an integrated page.
        rmSync(join(temp,'src/components/editorial-home/content.ts'),{force:true});
        writeFileSync(join(temp,'src/data/businessFacts.json'),JSON.stringify({site:{phone}}));
        execFileSync(process.execPath,[generator,join(temp,'reference')],{cwd:temp});
        const result=readFileSync(join(temp,'src/components/editorial-home/content.ts'),'utf8');
        expect(result).toContain(`tel:${phone.replace(/\s+/g,'')}`);
        expect(result).not.toContain('****');
      }
      const integrated = readFileSync(join(temp,'src/components/editorial-home/content.ts'),'utf8');
      expect(()=>execFileSync(process.execPath,[generator,join(temp,'reference')],{cwd:temp,stdio:'pipe'})).toThrow(/already integrated/);
      expect(readFileSync(join(temp,'src/components/editorial-home/content.ts'),'utf8')).toBe(integrated);
      rmSync(join(temp,'src/components/editorial-home/content.ts'));
      writeFileSync(join(temp,'src/data/businessFacts.json'),JSON.stringify({site:{phone:'+248****4525'}}));
      expect(()=>execFileSync(process.execPath,[generator,join(temp,'reference')],{cwd:temp,stdio:'pipe'})).toThrow();
    } finally { rmSync(temp,{recursive:true,force:true}); }
  });
});
