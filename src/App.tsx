import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AnalyticsListener from "./components/AnalyticsListener";

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
const NotFound = lazy(() => import("./pages/NotFound"));

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
          <Route path="/" element={<Home />} />
          <Route path="/what-you-need" element={<WhatYouNeed />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services-pricing" element={<Pricing />} />
          <Route path="/pricing" element={<Navigate to="/services-pricing" replace />} />
          <Route path="/process" element={<Process />} />
          <Route path="/ai-digital-tools" element={<Navigate to="/insights" replace />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/showcase/forma-studio" element={<ShowcaseFormaStudio />} />
          <Route path="/showcase/takamaka-house" element={<ShowcaseTakamakaHouse />} />
          <Route path="/web-design-seychelles" element={<WebDesignSeychelles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
