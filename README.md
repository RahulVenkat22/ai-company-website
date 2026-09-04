# AI-First Technology Company — Public Website

Premium, enterprise-grade marketing website for an AI-first technology company
covering AI Agents, Agentic AI, RAG & Enterprise AI, AI Solution Architecture,
Data Science & Analytics, BI & Data Visualization, Cloud Engineering, Software
Development, Testing and Website Management.

Built to the requirements in [`prompt.md`](./prompt.md).

## Stack

- **React 18 + TypeScript (strict) + Vite**
- **Tailwind CSS** with a CSS-variable theme system (dark-first, light mode toggle,
  system-preference aware, persisted)
- **Framer Motion** — used *only* for the hero network visualization and the
  process timeline (both lazy-loaded); every other animation is CSS
- **lucide-react** — single icon library sitewide
- **react-router-dom** with route-level code splitting
- Self-hosted **Instrument Sans Variable + Instrument Serif** fonts (no external font CDN)

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build
npm run preview    # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc only
```

## Project structure

```
src/
  config/site.ts        # ALL brand placeholders ([TBD]) + nav/footer links
  lib/                  # theme, seo, analytics, scroll-reveal hook
  components/
    ui/                 # design-system primitives (Button, Card, Field, …)
    layout/             # Navbar, Footer, ConsentBanner, Layout shell
    sections/           # one component per homepage/story section
  data/                 # tech stack, stories, case studies, industries
  pages/                # routed pages (+ legal placeholder pages)
docs/STYLEGUIDE.md      # binding design-system & contribution contract
public/                 # robots.txt, sitemap.xml, favicon, og-image
```

## Before launch — replace every placeholder

All placeholders are intentional (see `prompt.md` §45–46: never invent company
facts). Search the repo for `[TBD]` and update:

1. **`src/config/site.ts`** — company name, wordmark, domain/URL, emails,
   phone, address, social links.
2. **Analytics** — `src/lib/analytics.ts`: set real `GTM_ID` / `GA4_ID`.
   Scripts only load after consent *and* only when real IDs are configured.
3. **Legal pages** — `src/pages/legal/*` are clearly-marked placeholders;
   replace with approved legal content.
4. **Domain references** — `public/robots.txt`, `public/sitemap.xml`,
   `index.html` (title/description), `public/og-image.png` (regenerate with
   the real brand), favicon.
5. **Case studies / technology stories** — `src/data/*.ts` content is labeled
   *Illustrative*; replace with approved client work when available.
6. **Contact form endpoint** — `src/components/sections/ContactForm.tsx`
   submits to a stub; wire `submitContactRequest` to a real endpoint with
   server-side spam protection and rate limiting.

## Component architecture (prompt.md §44 mapping)

Every §44 responsibility exists; some carry clearer names in code:
ProblemSolution → `WhatWeSolve`, ServiceCard → cards in `ServicesOverview`,
RAGArchitecture → diagram in `RAGSection`, AgentWorkflow → `AgentsSection`,
DataSection → `MachineLearningSection` + `AnalyticsBISection`,
DashboardPreview → in `DataVizSection`, ArchitectureDiagram →
`AIArchitectureSection`, TechnologyCard → cards in `TechnologyStackSection`,
TechnologyStoryCard / CaseStudyCard / IndustryCard → cards in their sections,
CTA → `FinalCTA`. All share the `ui/` primitives (Button, Card, Badge, …).

## Quality targets (from prompt.md)

- WCAG 2.1 AA: skip link, semantic HTML, keyboard navigable, visible focus,
  labeled forms, reduced-motion support, AA contrast in both themes
- Performance: code-split routes, lazy framer-motion chunks, self-hosted font,
  no third-party scripts before consent, home JS budget < 200–250 KB gzip
- SEO: per-page titles/descriptions/canonicals, Open Graph + Twitter cards,
  `Organization` + `WebSite` JSON-LD, sitemap.xml, robots.txt
