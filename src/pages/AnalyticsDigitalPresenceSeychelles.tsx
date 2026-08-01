import { ANALYTICS_PRESENCE_SEO } from "../config/routes";
import { servicePages } from "../data/site";
import ServicePillarPage from "./ServicePillarPage";

export default function AnalyticsDigitalPresenceSeychelles() {
  return (
    <ServicePillarPage
      page={servicePages.analytics}
      path="/analytics-and-digital-presence-seychelles"
      seo={ANALYTICS_PRESENCE_SEO}
      breadcrumb="Analytics and digital presence"
      visual="analytics"
    />
  );
}
