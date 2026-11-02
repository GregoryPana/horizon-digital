import { useEffect, useRef, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackContactIntent, trackEvent } from '../../lib/analytics';
import { editorialHomeHtml } from './content';
import { mountEditorialHome } from './runtime';
import './editorial-home.css';
import './quote-packages.css';

/** Deterministic licensed template body. Layout owns main/header/footer/menu. */
export default function EditorialHome() {
  const root = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!root.current) return;
    return mountEditorialHome(root.current);
  }, []);
  const followLink = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!anchor || !event.currentTarget.contains(anchor)) return;
    const href = anchor.getAttribute('href')!;
    if (href.startsWith('https://wa.me/')) trackContactIntent({ method: 'whatsapp', source: 'editorial_home' });
    else if (href.startsWith('mailto:')) trackContactIntent({ method: 'email', source: 'editorial_home' });
    else if (href.startsWith('tel:')) trackContactIntent({ method: 'phone', source: 'editorial_home' });
    else trackEvent('cta_click', { cta_name: `editorial_${anchor.textContent?.trim().replace(/\s+/g, '_').toLowerCase()}`, page_path: '/' });
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
    // React Router owns internal destinations; native external/contact links keep
    // their real behaviour. Layout's hash effect handles landing and focus.
    if ((href.startsWith('/') && !href.startsWith('//')) || href.startsWith('#')) {
      event.preventDefault();
      if (href.startsWith('#') && location.hash === href) {
        const target = document.getElementById(decodeURIComponent(href.slice(1)));
        target?.scrollIntoView({ block: 'start', behavior: 'auto' });
        target?.setAttribute('tabindex', '-1');
        target?.focus({ preventScroll: true });
      } else navigate(href.startsWith('#') ? `/${href}` : href);
    }
  };
  return <div ref={root} className="editorial-home" data-editorial-version="v13b" onClick={followLink} dangerouslySetInnerHTML={{ __html: editorialHomeHtml }} />;
}
