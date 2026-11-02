import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getAnalyticsConsent, setAnalyticsConsent, subscribeAnalyticsConsent } from '../lib/analyticsConsent';
import '../styles/analytics-consent.css';

/** Mount once after the footer, including routes with independent showcase shells. */
export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(getAnalyticsConsent);
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(() => typeof document !== 'undefined' && document.body.hasAttribute('data-menu-open'));
  const [error, setError] = useState(false);
  const [preferenceTarget, setPreferenceTarget] = useState<HTMLElement | null>(null);
  const preferencesRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const visible = choice === 'unknown' || expanded;
  const compact = choice === 'unknown' && !expanded && !error;

  useEffect(() => subscribeAnalyticsConsent(() => setChoice(getAnalyticsConsent())), []);
  useEffect(() => {
    const sync = () => {
      const target = document.getElementById('editorial-analytics-preferences');
      setPreferenceTarget(current => current === target ? current : target);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new MutationObserver(() => setMenuOpen(document.body.hasAttribute('data-menu-open')));
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-menu-open'] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (expanded && !menuOpen) headingRef.current?.focus({ preventScroll: true });
  }, [expanded, menuOpen]);

  const close = () => {
    setExpanded(false);
    preferencesRef.current?.focus({ preventScroll: true });
  };
  const choose = (next: 'granted' | 'denied') => {
    const saved = setAnalyticsConsent(next);
    setChoice(getAnalyticsConsent());
    setError(!saved);
    if (saved) close();
    else setExpanded(true);
  };

  const preferences = <div className="analytics-preferences-strip" hidden={menuOpen}>
      <button ref={preferencesRef} type="button" className="analytics-preferences-button"
        aria-expanded={visible} aria-controls="analytics-consent-panel"
        onClick={() => { setError(false); setExpanded(true); }}>
        Analytics preferences
      </button>
    </div>;
  return <>
    {preferenceTarget ? createPortal(preferences, preferenceTarget) : preferences}
    {typeof document !== 'undefined' && createPortal(
      <section id="analytics-consent-panel" className={`analytics-consent-panel${compact ? ' analytics-consent-panel--compact' : ''}`} data-lenis-prevent hidden={!visible || menuOpen}
        aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description"
        onKeyDown={(event) => { if (event.key === 'Escape' && expanded) { event.preventDefault(); close(); } }}>
        <div className="analytics-consent-heading-row">
          <h2 id="analytics-consent-title" tabIndex={-1} ref={headingRef}>Your analytics choice</h2>
          {expanded && choice !== 'unknown' && <button type="button" className="analytics-consent-close" onClick={close}>Close</button>}
        </div>
        <p id="analytics-consent-description">{compact
          ? 'Optional Google Analytics measures visits and contact clicks. Off unless you allow it.'
          : 'With your permission, Google Analytics helps us understand page visits and contact-button use. It is off until you allow it. Your choice does not affect contacting us.'}</p>
        {choice === 'granted' && <p>Choosing No thanks turns analytics off and reloads this page.</p>}
        <div className="analytics-consent-actions">
          <button type="button" onClick={() => choose('granted')}>Allow analytics</button>
          <button type="button" onClick={() => choose('denied')}>No thanks</button>
        </div>
        {!compact && <p className="analytics-consent-note">Change your choice anytime using Analytics preferences at the bottom of every page.</p>}
        {error && <p role="status">Your browser could not save this choice. Analytics is off on this page. Please try again to save your preference before leaving.</p>}
      </section>, document.body)}
  </>;
}
