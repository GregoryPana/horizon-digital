import { SEO_SERVICES_SEO } from "../config/routes";
import { servicePages } from "../data/site";
import ServicePillarPage from "./ServicePillarPage";

export default function SeoServicesSeychelles() {
  return (
    <ServicePillarPage
      page={servicePages.seo}
      path="/seo-services-seychelles"
      seo={SEO_SERVICES_SEO}
      breadcrumb="SEO review and implementation"
      visual="seo"
    />
  );
}
