// @vitest-environment jsdom
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, it } from 'vitest';
import EditorialFooter from './EditorialFooter';
import { readFileSync } from 'node:fs';
afterEach(cleanup);
it('uses a compact footer rather than repeating a large sales heading',()=>{
 const {container}=render(<MemoryRouter><EditorialFooter/></MemoryRouter>);
 expect(container.querySelector('footer h2')).toBeNull();
 expect(container.querySelector('nav[aria-label="Footer services"]')).toBeNull();
 expect(container.querySelector('#editorial-analytics-preferences')).not.toBeNull();
 expect(container.querySelectorAll('footer .editorial-contact-icons a')).toHaveLength(5);
 for(const kind of ['facebook','instagram','email','phone','whatsapp']) expect(container.querySelector(`a[data-contact-kind="${kind}"] svg`)).not.toBeNull();
 expect(container.querySelector('a[href="/contact"]')).not.toBeNull();
});
it('shares the same coloured contact treatment with the menu without changing its clock',()=>{
 const source=readFileSync('src/components/EditorialNavbar.tsx','utf8');
 expect(source).toContain('<EditorialContactLinks source="navbar"');
 expect(source).toContain('const DURATION = 560');
});
