import { Suspense, lazy, type ReactElement } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import AnalyticsListener from "./components/AnalyticsListener";
import { STATIC_ROUTES, REDIRECTS, DYNAMIC_ROUTES } from "./config/routes";
import { clientRouteLoaders } from "./config/clientRouteLoaders";
import RouteLoadErrorBoundary from "./components/RouteLoadErrorBoundary";

// React.lazy keeps every production page in its own route chunk. The same
// loader functions are used by main.tsx to warm only the initial route chunk.
const componentByPath = Object.fromEntries(
  Object.entries(clientRouteLoaders.static).map(([path, loader]) => {
    const Component = lazy(loader);
    return [path, <Component />];
  }),
) as Record<string, ReactElement>;
const InsightArticle = lazy(clientRouteLoaders.insightArticle);
const NotFound = lazy(clientRouteLoaders.notFound);

// Dev-only headline reveal comparison harness. Never linked from navigation,
// never part of STATIC_ROUTES/sitemap. import.meta.env.DEV is statically
// false in production builds, so this route never resolves outside `npm run
// dev` -- see src/pages/dev/HeroHeadlinePreview.tsx for details.
const HeroHeadlinePreview = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/HeroHeadlinePreview"))
  : null;

// Dev-only Phase 2 motion-primitives preview (site-wide redesign plan).
// Same gating as HeroHeadlinePreview above -- never linked, never in
// STATIC_ROUTES, statically false in production builds.
const MotionPrimitivesPreview = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/MotionPrimitivesPreview"))
  : null;

// Dev-only Gate A visual-acceptance route. The static DEV guard keeps this
// acceptance wrapper/route out of production; its approved hero is now shared.
const HeroBuildExtractionPreview = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/HeroBuildExtractionPreview"))
  : null;

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnalyticsListener />
      <RouteLoadErrorBoundary resetKey={location.pathname}>
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
          {MotionPrimitivesPreview ? (
            <Route path="/dev/motion-primitives-preview" element={<MotionPrimitivesPreview />} />
          ) : null}
          {HeroBuildExtractionPreview ? (
            <Route path="/dev/hero-build-extraction" element={<HeroBuildExtractionPreview />} />
          ) : null}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </RouteLoadErrorBoundary>
    </Layout>
  );
}
