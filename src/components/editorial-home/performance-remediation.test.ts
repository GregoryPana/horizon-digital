import {readFileSync} from 'node:fs';
import {describe,it,expect} from 'vitest';
import {editorialHomeHtml} from './content';
const read=(file:string)=>readFileSync(new URL(file,import.meta.url),'utf8');
describe('bounded performance remediation contracts',()=>{
 it('reserves root gutter before lazy home CSS is discovered',()=>{
  expect(read('../../index.css')).toMatch(/html\s*\{[^}]*scrollbar-gutter:\s*stable/);
  expect(read('./editorial-home.css')).not.toContain('html:has(.editorial-home){scrollbar-gutter:stable');
 });
 it('offers same-capture responsive Forma screens and posters without deleting originals',()=>{
  const doc=editorialHomeHtml;
  for(const type of ['scroll','poster']){
   expect(doc).toContain(`work-forma-${type}-320.webp 320w`);
   expect(doc).toContain(`work-forma-${type}-640.webp 640w`);
   expect(doc).toContain(`work-forma-${type}.webp 1440w`);
  }
  expect(doc).toContain('sizes="');
 });
 it('never hides the poster until scroll-image decode and owned timeline are ready',()=>{
  const scenes=read('./original-scenes.ts');
  expect(scenes).toContain('m.ready&&m.tl');
  expect(scenes).toContain('image.decode()');
 });
 it('keeps compact short landscape choice in reserved flow space, not over hero ink',()=>{
  expect(read('../../styles/analytics-consent.css')).toContain('max-height: 500px');
  expect(read('../../styles/analytics-consent.css')).toContain('body:has(.analytics-consent-panel--compact:not([hidden]))');
 });
});
