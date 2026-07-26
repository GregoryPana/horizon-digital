import { Suspense, lazy, type ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AnalyticsListener from "./components/AnalyticsListener";
import { STATIC_ROUTES, REDIRECTS, DYNAMIC_ROUTES } from "./config/routes";

import Home from "./pages/Home";
const WhatYouNeed = lazy(() => import("./pages/WhatYouNeed"));
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
const ShowcaseDrakeSeaside = lazy(() => import("./pages/ShowcaseDrakeSeaside"));
const TourismWebsiteDesignSeychelles = lazy(() => import("./pages/TourismWebsiteDesignSeychelles"));
const FAndBWebsiteDesignSeychelles = lazy(() => import("./pages/FAndBWebsiteDesignSeychelles"));
const ProfessionalServicesWebsiteDesignSeychelles = lazy(
  () => import("./pages/ProfessionalServicesWebsiteDesignSeychelles"),
);
const NotFound = lazy(() => import("./pages/NotFound"));

// Component references cannot live in the Worker-safe route registry
// (JSX + lazy imports pull in the full client bundle), so path/redirect/SEO
// knowledge stays in src/config/routes.ts and only this lookup of
// path -> element remains local to the client router.
const componentByPath: Record<string, ReactElement> = {
  "/": <Home />,
  "/what-you-need": <WhatYouNeed />,
  "/work": <Work />,
  "/pricing": <Pricing />,
  "/process": <Process />,
  "/insights": <Insights />,
  "/about": <About />,
  "/contact": <Contact />,
  "/showcase/forma-studio": <ShowcaseFormaStudio />,
  "/showcase/takamaka-house": <ShowcaseTakamakaHouse />,
  "/showcase/drake-seaside": <ShowcaseDrakeSeaside />,
  "/web-design-seychelles": <WebDesignSeychelles />,
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
