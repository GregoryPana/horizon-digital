// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const mail = vi.hoisted(() => vi.fn((_email: string, _subject: string, _body: string) => '#prepared-email'));
vi.mock('../lib/utils', async original => ({ ...await original<typeof import('../lib/utils')>(), buildMailtoLink: mail }));
vi.mock('../lib/analytics', () => ({ trackContactIntent: vi.fn(), trackEvent: vi.fn() }));
vi.mock('../components/Seo', () => ({ default: () => null }));
vi.mock('../components/editorial-home/runtime', () => ({ mountEditorialHome: () => () => {} }));
import EditorialHome from '../components/editorial-home/EditorialHome';
import Contact from './Contact';
function Change() { const navigate=useNavigate(); return <><button onClick={()=>navigate('/contact?package=starter')}>Change package</button><button onClick={()=>navigate('/contact?package=growth&noise=1')}>Equivalent prefill</button></>; }
function App({initial='/'}:{initial?:string}) { return <MemoryRouter initialEntries={[initial]}><Change/><Routes><Route path="/" element={<EditorialHome/>}/><Route path="/contact" element={<Contact/>}/></Routes></MemoryRouter>; }
beforeEach(()=>vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }));
afterEach(()=>{cleanup();mail.mockClear();vi.unstubAllGlobals();});
describe('review F2: real package conversion contract',()=>{
  it.each(['Foundation','Starter','Growth'])('retains %s from homepage through form and prepared email without inventing a budget', (name)=>{
    render(<App/>);
    fireEvent.click(screen.getByRole('link',{name:`Request a free quote for ${name}`}));
    expect((screen.getByRole('combobox',{name:'Project budget range'}) as HTMLSelectElement).value).toBe('');
    expect((screen.getByRole('textbox',{name:'Message'}) as HTMLTextAreaElement).value).toContain(`${name} website package`);
    fireEvent.change(screen.getByRole('textbox',{name:'Business name'}),{target:{value:'Synthetic QA business'}});
    fireEvent.change(screen.getByRole('textbox',{name:'Email'}),{target:{value:'qa@example.invalid'}});
    fireEvent.change(screen.getByRole('textbox',{name:'Message'}),{target:{value:'Edited project goal'}});
    fireEvent.submit(screen.getByRole('button',{name:'Prepare email'}).closest('form')!);
    expect(mail.mock.calls[mail.mock.calls.length - 1]?.[2]).toContain(`Website package: ${name}`);
    expect(mail.mock.calls[mail.mock.calls.length - 1]?.[2]).toContain('Edited project goal');
    expect((screen.getByRole('textbox',{name:'Message'}) as HTMLTextAreaElement).value).toBe('Edited project goal');
  });
  it('rejects unknown package/budget and decodes the existing request contract only once',()=>{
    render(<App initial='/contact?package=%3Cscript%3E&budget=bogus&request=100%2525%20Concept'/>);
    expect((screen.getByRole('combobox',{name:'Project budget range'}) as HTMLSelectElement).value).toBe('');
    expect((screen.getByRole('textbox',{name:'Message'}) as HTMLTextAreaElement).value).toContain('100%25 Concept');
    fireEvent.submit(screen.getByRole('button',{name:'Prepare email'}).closest('form')!);
    expect(mail.mock.calls[mail.mock.calls.length - 1]?.[2]).not.toContain('Website package:');
    expect(mail.mock.calls[mail.mock.calls.length - 1]?.[2]).not.toContain('<script>');
  });
  it('resets on changed semantic prefill but retains edits for irrelevant query changes',()=>{
    render(<App initial='/contact?package=growth'/>);
    const message=screen.getByRole('textbox',{name:'Message'});
    fireEvent.change(message,{target:{value:'In-progress draft'}});
    fireEvent.click(screen.getByRole('button',{name:'Equivalent prefill'}));
    expect(screen.getByRole('textbox',{name:'Message'})).toBe(message);
    expect((message as HTMLTextAreaElement).value).toBe('In-progress draft');
    fireEvent.click(screen.getByRole('button',{name:'Change package'}));
    expect(screen.getByRole('textbox',{name:'Message'})).not.toBe(message);
    expect((screen.getByRole('textbox',{name:'Message'}) as HTMLTextAreaElement).value).toContain('Starter website package');
  });
});
