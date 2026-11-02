import facts from '../data/businessFacts.json';
import { trackContactIntent } from '../lib/analytics';
import WhatsAppIcon from './ui/WhatsAppIcon';

/** One recognisable, coloured contact row for the footer and navigation dock. */
export default function EditorialContactLinks({ source }: { source: 'footer' | 'navbar' }) {
 const site = facts.site;
 return <div className="editorial-contact-icons" aria-label="Contact and social links">
  <a data-contact-kind="facebook" href={site.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Horizon Digital on Facebook" title="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/></svg></a>
  <a data-contact-kind="instagram" href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Horizon Digital on Instagram" title="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg></a>
  <a data-contact-kind="email" href={`mailto:${site.email}`} aria-label="Email Horizon Digital" title={site.email} onClick={()=>trackContactIntent({method:'email',source})}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg></a>
  <a data-contact-kind="phone" href={`tel:${site.phone.replace(/\s/g,'')}`} aria-label="Call Horizon Digital" title={site.phone} onClick={()=>trackContactIntent({method:'phone',source})}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-2l-5-2-2 2a16 16 0 0 1-8-8l2-2-2-5Z"/></svg></a>
  <a data-contact-kind="whatsapp" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="WhatsApp" onClick={()=>trackContactIntent({method:'whatsapp',source})}><WhatsAppIcon/><span className="sr-only">Chat on WhatsApp</span></a>
 </div>;
}
