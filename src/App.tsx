import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

/* Route-level code splitting keeps the home bundle inside the JS budget. */
const Home = lazy(() => import('@/pages/Home'))
const Services = lazy(() => import('@/pages/Services'))
const AISolutions = lazy(() => import('@/pages/AISolutions'))
const DataAnalytics = lazy(() => import('@/pages/DataAnalytics'))
const Cloud = lazy(() => import('@/pages/Cloud'))
const Technology = lazy(() => import('@/pages/Technology'))
const TechnologyStories = lazy(() => import('@/pages/TechnologyStories'))
const CaseStudies = lazy(() => import('@/pages/CaseStudies'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const PrivacyPolicy = lazy(() => import('@/pages/legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('@/pages/legal/TermsOfService'))
const CookiePolicy = lazy(() => import('@/pages/legal/CookiePolicy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ai-solutions" element={<AISolutions />} />
        <Route path="/data-analytics" element={<DataAnalytics />} />
        <Route path="/cloud" element={<Cloud />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/technology-stories" element={<TechnologyStories />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
