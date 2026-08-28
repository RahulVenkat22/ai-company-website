/**
 * Central brand/company configuration.
 *
 * IMPORTANT (prompt.md §46 — Brand Placeholders):
 * All company details below are placeholders. Replace every [TBD] value with
 * approved company information before launch. Do not invent company details.
 */

export const site = {
  /** Company name — replace before launch. */
  name: '[TBD] Company',
  /** Short name used in the navbar wordmark. */
  wordmark: 'Company[TBD]',
  legalName: '[TBD — Registered Legal Entity Name]',
  tagline: 'AI. Data. Cloud. Automation. Engineering.',
  description:
    'AI-first technology company engineering AI agents, agentic AI, RAG systems, data platforms, cloud solutions and intelligent applications — from business problem to production.',
  /** Canonical production origin — replace with the real domain before launch. */
  url: 'https://www.example-tbd-domain.com',
  email: 'hello@[yourdomain].com',
  privacyEmail: 'privacy@[yourdomain].com',
  phone: '[TBD — Phone Number]',
  address: '[TBD — Registered Address]',
  social: {
    linkedin: '[TBD — LinkedIn URL]',
    x: '[TBD — X/Twitter URL]',
    github: '[TBD — GitHub URL]',
  },
} as const

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'AI Solutions', to: '/ai-solutions' },
  { label: 'Data & Analytics', to: '/data-analytics' },
  { label: 'Cloud', to: '/cloud' },
  { label: 'Technology', to: '/technology' },
  { label: 'Technology Stories', to: '/technology-stories' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export const footerLinkGroups = [
  {
    title: 'AI & Data',
    links: [
      { label: 'AI Solutions', to: '/ai-solutions' },
      { label: 'RAG & Enterprise AI', to: '/ai-solutions#rag' },
      { label: 'AI Agents & Agentic AI', to: '/ai-solutions#agents' },
      { label: 'AI Solution Architecture', to: '/ai-solutions#architecture' },
      { label: 'Data & Analytics', to: '/data-analytics' },
      { label: 'Data Visualization', to: '/data-analytics#visualization' },
    ],
  },
  {
    title: 'Engineering',
    links: [
      { label: 'Cloud Engineering', to: '/cloud' },
      { label: 'Software Development', to: '/technology#software' },
      { label: 'Testing & QA', to: '/technology#testing' },
      { label: 'Website Management', to: '/technology#website-management' },
      { label: 'Technology Stack', to: '/technology' },
      { label: 'All Services', to: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Technology Stories', to: '/technology-stories' },
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'How We Work', to: '/about#how-we-work' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms-of-service' },
      { label: 'Cookie Policy', to: '/cookie-policy' },
    ],
  },
] as const
