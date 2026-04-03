import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AnalyticsListener from "./components/AnalyticsListener";

import Home from "./pages/Home";
const WhatYouNeed = lazy(() => import("./pages/WhatYouNeed"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const AIDigitalTools = lazy(() => import("./pages/AIDigitalTools"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightArticle = lazy(() => import("./pages/InsightArticle"));
const ShowcaseFormaStudio = lazy(() => import("./pages/ShowcaseFormaStudio"));
const ShowcaseTakamakaHouse = lazy(() => import("./pages/ShowcaseTakamakaHouse"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Layout>
      <AnalyticsListener />
      <Suspense
        fallback={
          <div className="mx-auto flex min-h-[70svh] w-full max-w-7xl items-start px-8 py-24 text-sm text-text-muted">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-you-need" element={<WhatYouNeed />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services-pricing" element={<Pricing />} />
          <Route path="/ai-digital-tools" element={<AIDigitalTools />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/showcase/forma-studio" element={<ShowcaseFormaStudio />} />
          <Route path="/showcase/takamaka-house" element={<ShowcaseTakamakaHouse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
