import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import CustomCursor from '@/components/layout/CustomCursor'
import ChatbotWidget from '@/components/layout/ChatbotWidget'
import FloatingWA from '@/components/layout/FloatingWA'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import RouteChangeTop from '@/components/layout/RouteChangeTop'
import ScrollProgressBar from '@/components/layout/ScrollProgressBar'
import AboutPage from '@/pages/site/AboutPage'
import ContactPage from '@/pages/site/ContactPage'
import DigitalInsightsPage from '@/pages/site/DigitalInsightsPage'
import HomePage from '@/pages/site/HomePage'
import WorkPage from '@/pages/site/WorkPage'
import ServicesPricingPage from '@/pages/site/ServicesPricingPage'
import WhatYouNeedPage from '@/pages/site/WhatYouNeedPage'

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollProgressBar />
      <RouteChangeTop />
      <CustomCursor />
      <FloatingWA />
      <ChatbotWidget />

      <header>
        <Navbar />
      </header>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/services-pricing" element={<PageWrapper><ServicesPricingPage /></PageWrapper>} />
          <Route path="/work" element={<PageWrapper><WorkPage /></PageWrapper>} />
          <Route path="/what-you-need" element={<PageWrapper><WhatYouNeedPage /></PageWrapper>} />
          <Route path="/ai-digital-tools" element={<PageWrapper><DigitalInsightsPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/services" element={<Navigate to="/services-pricing" replace />} />
          <Route path="/pricing" element={<Navigate to="/services-pricing" replace />} />
          <Route path="/process" element={<Navigate to="/services-pricing" replace />} />
          <Route path="/faq" element={<Navigate to="/services-pricing" replace />} />
          <Route path="/hosting" element={<Navigate to="/services-pricing" replace />} />
          <Route path="/insights" element={<Navigate to="/ai-digital-tools" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  )
}
