import { NavLink } from 'react-router-dom';
import facts from '../data/businessFacts.json';
import EditorialContactLinks from './EditorialContactLinks';


const site = facts.site;
export default function EditorialFooter() {
 return <footer id="editorial-site-footer" className="editorial-footer editorial-footer-compact">
  <div className="editorial-footer-top">
   <div className="editorial-footer-identity"><NavLink to="/" className="editorial-footer-wordmark">horizon digital<span aria-hidden="true">.</span></NavLink><p>{site.location}</p></div>
   <NavLink className="editorial-button" to={site.contactPath}>{site.primaryCtaLabel}<span aria-hidden="true">↗</span></NavLink>
  </div>
  <div className="editorial-footer-middle">
   <div className="editorial-footer-navigation">

    <nav aria-label="Footer site navigation" className="editorial-footer-links">{[['Work','/work'],['Pricing','/pricing'],['Our process','/process'],['About','/about'],['Contact',site.contactPath]].map(([label,path])=><NavLink key={path} to={path}>{label}</NavLink>)}</nav>
   </div>
   <EditorialContactLinks source="footer"/>
  </div>
  <div className="editorial-footer-base"><p>© {new Date().getFullYear()} {site.name}</p><div id="editorial-analytics-preferences" /><p>Built in Seychelles</p></div>
 </footer>;
}
