import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const WhatYouNeed = lazy(() => import("./pages/WhatYouNeed"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="mx-auto w-full max-w-7xl px-8 py-24 text-sm text-text-muted">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-you-need" element={<WhatYouNeed />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services-pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
