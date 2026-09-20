import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  UtensilsCrossed,
} from "lucide-react";
import Seo from "../components/Seo";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";
import restaurantInterior from "../assets/work/restaurant-concept/photos/tropical-dining.webp";
import restaurantDish from "../assets/work/restaurant-concept/photos/grilled-fish.webp";
import restaurantGuests from "../assets/work/restaurant-concept/photos/friends-dining.webp";
import restaurantCoast from "../assets/work/restaurant-concept/photos/beach-cafe.webp";
import { siteConfig } from "../data/site";
import { ANALYTICS_PREFERENCES_OPEN_EVENT, trackContactIntent, trackEvent } from "../lib/analytics";
import "./restaurantConcept.css";

const informationAreas = [
  {
    title: "Current menu",
    body: "Put the current dishes, dietary details and availability notes in one place that is easy to read on a phone.",
    icon: UtensilsCrossed,
  },
  {
    title: "Opening hours",
    body: "Show today's opening hours first, then the rest of the week and any planned closures.",
    icon: Clock3,
  },
  {
    title: "Location and arrival",
    body: "Give people a map button, a useful landmark and arrival details when they need them.",
    icon: MapPin,
  },
  {
    title: "Questions and table requests",
    body: "Use the contact route the restaurant can answer, without pretending every request is instantly confirmed.",
    icon: CalendarDays,
  },
];

const conceptPath = "/showcase/restaurant-website-concept";
const contactPath = "/contact?request=restaurant-concept";

export default function ShowcaseRestaurantConcept() {
  return (
    <div className="restaurant-concept min-h-screen overflow-x-hidden bg-[#090b0c] text-white">
      <Seo
        title="Restaurant Website Study | Horizon Digital"
        description="An original Horizon Digital restaurant website study showing how menus, opening hours, directions and enquiries can work together."
        path={conceptPath}
        robots="noindex,nofollow"
      />

      <header className="restaurant-concept__bar" aria-label="Restaurant website study navigation">
        <Link className="restaurant-concept__brand focus-ring" to="/">
          <span aria-hidden="true">HD</span>
          <span>Horizon Digital</span>
        </Link>
        <div className="restaurant-concept__bar-links">
          <button
            className="restaurant-concept__preferences focus-ring"
            type="button"
            onClick={() => window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_OPEN_EVENT))}
          >
            Privacy & analytics
          </button>
          <Link className="restaurant-concept__back focus-ring" to="/work">
            View our work <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div data-route-content="restaurant-concept">
        <section className="restaurant-concept__hero" aria-labelledby="restaurant-concept-title">
          <div className="restaurant-concept__hero-copy">
            <p className="restaurant-concept__eyebrow">Island Table · original website study</p>
            <h1 id="restaurant-concept-title">The details guests need before they choose where to eat.</h1>
            <p className="restaurant-concept__lead">
              Give guests the menu, today's hours, directions and an easy way to ask a question, wherever they are.
            </p>
            <div className="restaurant-concept__actions">
              <Link
                className="restaurant-concept__primary focus-ring"
                to={contactPath}
                onClick={() => {
                  trackContactIntent({ method: "contact_form", source: "restaurant_concept_hero" });
                  trackEvent("restaurant_concept_contact", { placement: "hero" });
                }}
              >
                Discuss a restaurant website <ArrowRight aria-hidden="true" />
              </Link>
              <a
                className="restaurant-concept__secondary focus-ring"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackContactIntent({ method: "whatsapp", source: "restaurant_concept_hero" })}
              >
                <WhatsAppIcon aria-hidden="true" /> Chat on WhatsApp
              </a>
            </div>

          </div>

          <div className="restaurant-concept__preview" aria-label="Island Table restaurant website study">
            <div className="restaurant-concept__browser" aria-hidden="true">
              <div className="restaurant-concept__browser-bar">
                <span /><span /><span />
                <p>islandtable.sc preview</p>
              </div>
              <div className="restaurant-concept__screen">
                <div className="restaurant-concept__screen-nav">
                  <strong>ISLAND TABLE</strong>
                  <div><span>Menu</span><span>Visit</span><span>Contact</span></div>
                </div>
                <div className="restaurant-concept__screen-hero">
                  <div>
                    <p>GOOD FOOD · EASY TO FIND</p>
                    <strong>Dinner plans should feel simple.</strong>
                    <span>See the menu, check today's hours and ask a question before you leave home.</span>
                  </div>
                  <div className="restaurant-concept__screen-photo">
                    <img src={restaurantDish} alt="" />
                    <span>From the kitchen</span>
                  </div>
                </div>
                <div className="restaurant-concept__screen-actions">
                  <span><Clock3 /> Today's hours</span>
                  <span><UtensilsCrossed /> View menu</span>
                  <span><MessageCircle /> Ask a question</span>
                </div>
              </div>
            </div>
            <div className="restaurant-concept__phone" aria-hidden="true">
              <div className="restaurant-concept__phone-top"><span /></div>
              <img className="restaurant-concept__phone-photo" src={restaurantInterior} alt="" />
              <strong>Menu</strong>
              <p>Current dishes and useful details, written for a small screen.</p>
              <div className="restaurant-concept__menu-line"><span /><i /></div>
              <div className="restaurant-concept__menu-line"><span /><i /></div>
              <button type="button" tabIndex={-1}>Enquire</button>
            </div>
          </div>
        </section>

        <section className="restaurant-concept__information" aria-labelledby="restaurant-information-title">
          <div className="restaurant-concept__section-intro">
            <p className="restaurant-concept__eyebrow">What the website can organise</p>
            <h2 id="restaurant-information-title">The details guests usually hunt for.</h2>
            <p>A restaurant website gives social posts and directory listings one reliable place to send people.</p>
          </div>
          <div className="restaurant-concept__information-grid">
            {informationAreas.map(({ title, body, icon: Icon }) => (
              <article className="restaurant-concept__info" key={title}>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="restaurant-concept__gallery" aria-labelledby="restaurant-gallery-title">
          <div className="restaurant-concept__section-intro">
            <p className="restaurant-concept__eyebrow">Food, place and people</p>
            <h2 id="restaurant-gallery-title">Let someone picture the visit before they arrive.</h2>
            <p>For a commissioned restaurant website, these illustrative photographs would be replaced by the restaurant's own food, team and setting.</p>
          </div>
          <div className="restaurant-concept__gallery-grid">
            <figure className="restaurant-concept__gallery-item restaurant-concept__gallery-item--lead">
              <img src={restaurantInterior} alt="Illustrative tropical restaurant dining space" />
              <figcaption>The space</figcaption>
            </figure>
            <figure className="restaurant-concept__gallery-item">
              <img src={restaurantDish} alt="Illustrative grilled fish dish" />
              <figcaption>The food</figcaption>
            </figure>
            <figure className="restaurant-concept__gallery-item">
              <img src={restaurantGuests} alt="Illustrative group sharing a restaurant meal" />
              <figcaption>The people</figcaption>
            </figure>
            <figure className="restaurant-concept__gallery-item">
              <img src={restaurantCoast} alt="Illustrative waterfront restaurant setting" />
              <figcaption>The setting</figcaption>
            </figure>
          </div>
        </section>

        <section className="restaurant-concept__scope" aria-labelledby="restaurant-scope-title">
          <div>
            <p className="restaurant-concept__eyebrow">Built around how the restaurant runs</p>
            <h2 id="restaurant-scope-title">Find the best starting point after we understand how the restaurant works.</h2>
          </div>
          <div className="restaurant-concept__scope-copy">
            <p>
              A focused website may be enough for a smaller restaurant. Large menus, regular updates, events, several locations or booking integrations may need more.
            </p>
            <p>
              The first conversation helps us choose a sensible starting point. The written proposal then confirms the pages, responsibilities, integrations and tailored quote.
            </p>
            <Link className="restaurant-concept__text-link focus-ring" to="/pricing">
              Compare website options <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="restaurant-concept__final" aria-labelledby="restaurant-final-title">
          <p className="restaurant-concept__eyebrow">Start with what guests ask every day</p>
          <h2 id="restaurant-final-title">Put the menu, visit details and a clear way to get in touch on one website.</h2>
          <p>We shape the website around the restaurant, its team and the questions customers actually ask.</p>
          <div className="restaurant-concept__actions restaurant-concept__actions--center">
            <Link
              className="restaurant-concept__primary focus-ring"
              to={contactPath}
              onClick={() => {
                trackContactIntent({ method: "contact_form", source: "restaurant_concept_final" });
                trackEvent("restaurant_concept_contact", { placement: "final" });
              }}
            >
              Arrange a free first call <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="restaurant-concept__secondary focus-ring" to="/work">
              View client work
            </Link>
          </div>
          <p className="restaurant-concept__classification">Original restaurant website study · not commissioned client work</p>
        </section>
      </div>
    </div>
  );
}
