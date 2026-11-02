// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('../lib/analytics',()=>({trackContactIntent:vi.fn(),trackEvent:vi.fn()}));
import EditorialNavbar from './EditorialNavbar';
function Change() {const navigate=useNavigate();return <button onClick={()=>navigate('/contact')}>Route change</button>;}
beforeEach(()=>{
  vi.stubGlobal('matchMedia',()=>Object.assign(new EventTarget(),{matches:true}));
  vi.stubGlobal('ResizeObserver',class {observe(){} disconnect(){}});
  document.body.removeAttribute('data-ambient-paused');
});
afterEach(()=>{cleanup();document.body.removeAttribute('data-ambient-paused');vi.unstubAllGlobals();});
describe('review F3: user background playback control',()=>{
  it('uses a real named button, retains manual pause across menu/route changes and resumes explicitly',()=>{
    render(<MemoryRouter><EditorialNavbar/><Change/></MemoryRouter>);
    const pause=screen.getByRole('button',{name:'Pause background animation'});
    expect(pause.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(pause);
    const play=screen.getByRole('button',{name:'Play background animation'});
    expect(play.getAttribute('aria-pressed')).toBe('true');
    expect(document.body.hasAttribute('data-ambient-paused')).toBe(true);
    fireEvent.click(screen.getByRole('button',{name:'Open the menu'}));
    fireEvent.keyDown(document,{key:'Escape'});
    expect(document.body.hasAttribute('data-menu-open')).toBe(false);
    expect(document.body.hasAttribute('data-ambient-paused')).toBe(true);
    fireEvent.click(screen.getByRole('button',{name:'Route change'}));
    expect(play.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(play);
    expect(document.body.hasAttribute('data-ambient-paused')).toBe(false);
    expect(screen.getByRole('button',{name:'Pause background animation'}).getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(screen.getByRole('button',{name:'Open the menu'}));
    fireEvent.keyDown(document,{key:'Escape'});
    expect(document.body.hasAttribute('data-ambient-paused')).toBe(false);
  });
});
