import { Suspense, lazy, type ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AnalyticsListener from "./components/AnalyticsListener";
import { STATIC_ROUTES, REDIRECTS, DYNAMIC_ROUTES } from "./config/routes";

import Home from "./pages/Home";
const WhatYouNeed = lazy(() => import("./pages/WhatYouNeed"));
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Process = lazy(() => import("./pages/Process"));
const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightArticle = lazy(() => import("./pages/InsightArticle"));
const ShowcaseFormaStudio = lazy(() => import("./pages/ShowcaseFormaStudio"));
const ShowcaseTakamakaHouse = lazy(() => import("./pages/ShowcaseTakamakaHouse"));
const WebDesignSeychelles = lazy(() => import("./pages/WebDesignSeychelles"));
const SeoServicesSeychelles = lazy(() => import("./pages/SeoServicesSeychelles"));
const AnalyticsDigitalPresenceSeychelles = lazy(() => import("./pages/AnalyticsDigitalPresenceSeychelles"));
const ShowcaseDrakeSeaside = lazy(() => import("./pages/ShowcaseDrakeSeaside"));
const TourismWebsiteDesignSeychelles = lazy(() => import("./pages/TourismWebsiteDesignSeychelles"));
const FAndBWebsiteDesignSeychelles = lazy(() => import("./pages/FAndBWebsiteDesignSeychelles"));
const ProfessionalServicesWebsiteDesignSeychelles = lazy(
  () => import("./pages/ProfessionalServicesWebsiteDesignSeychelles"),
);
const NotFound = lazy(() => import("./pages/NotFound"));

// Dev-only headline reveal comparison harness. Never linked from navigation,
// never part of STATIC_ROUTES/sitemap. import.meta.env.DEV is statically
// false in production builds, so this route never resolves outside `npm run
// dev` -- see src/pages/dev/HeroHeadlinePreview.tsx for details.
const HeroHeadlinePreview = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/HeroHeadlinePreview"))
  : null;

// Component references cannot live in the Worker-safe route registry
// (JSX + lazy imports pull in the full client bundle), so path/redirect/SEO
// knowledge stays in src/config/routes.ts and only this lookup of
// path -> element remains local to the client router.
const componentByPath: Record<string, ReactElement> = {
  "/": <Home />,
  "/what-you-need": <WhatYouNeed />,
  "/work": <Work />,
  "/services": <Services />,
  "/pricing": <Pricing />,
  "/process": <Process />,
  "/insights": <Insights />,
  "/about": <About />,
  "/contact": <Contact />,
  "/showcase/forma-studio": <ShowcaseFormaStudio />,
  "/showcase/takamaka-house": <ShowcaseTakamakaHouse />,
  "/showcase/drake-seaside": <ShowcaseDrakeSeaside />,
  "/web-design-seychelles": <WebDesignSeychelles />,
  "/seo-services-seychelles": <SeoServicesSeychelles />,
  "/analytics-and-digital-presence-seychelles": <AnalyticsDigitalPresenceSeychelles />,
  "/tourism-website-design-seychelles": <TourismWebsiteDesignSeychelles />,
  "/f-and-b-website-design-seychelles": <FAndBWebsiteDesignSeychelles />,
  "/professional-services-website-design-seychelles": <ProfessionalServicesWebsiteDesignSeychelles />,
};

export default function App() {
  return (
    <Layout>
      <AnalyticsListener />
      <Suspense
        fallback={
          <div className="min-h-[100dvh] w-full bg-bg flex flex-col gap-8 px-8 py-24 md:px-16">
            <div className="h-6 w-48 rounded-lg bg-white/[0.04] animate-pulse" />
            <div className="h-12 w-3/4 rounded-xl bg-white/[0.05] animate-pulse" />
            <div className="h-4 w-2/3 rounded-lg bg-white/[0.03] animate-pulse" />
            <div className="h-4 w-1/2 rounded-lg bg-white/[0.03] animate-pulse" />
            <div className="mt-4 flex gap-4">
              <div className="h-12 w-40 rounded-full bg-accent/10 animate-pulse" />
              <div className="h-12 w-36 rounded-full bg-white/[0.03] animate-pulse" />
            </div>
          </div>
        }
      >
        <Routes>
          {STATIC_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={componentByPath[route.path]} />
          ))}
          {DYNAMIC_ROUTES.map((route) => (
            <Route
              key={route.basePath}
              path={`${route.basePath}/:${route.paramName}`}
              element={<InsightArticle />}
            />
          ))}
          {REDIRECTS.map((redirect) => (
            <Route key={redirect.path} path={redirect.path} element={<Navigate to={redirect.to} replace />} />
          ))}
          {HeroHeadlinePreview ? (
            <Route path="/dev/headline-preview" element={<HeroHeadlinePreview />} />
          ) : null}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
