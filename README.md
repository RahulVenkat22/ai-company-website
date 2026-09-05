# AI-First Technology Company: Public Website

Premium, enterprise-grade marketing website for an AI-first technology company
covering AI Agents, Agentic AI, RAG & Enterprise AI, AI Solution Architecture,
Data Science & Analytics, BI & Data Visualization, Cloud Engineering, Software
Development, Testing and Website Management.

Built to the requirements in [`prompt.md`](./prompt.md).

## Stack

- **React 18 + TypeScript (strict) + Vite**
- **Tailwind CSS 3.4** with a CSS-variable theme system (dark-first "graphite +
  signal" palette, light "cool paper" theme via toggle, persisted)
- **GSAP + ScrollTrigger** for all scroll-driven motion (scrubbed video
  backdrop, pinning, parallax, count-ups) over native scrolling
- **Framer Motion** for component-level transitions (button press/hover, menu
  and consent presence, accordion). The two libraries
  never drive the same element.
- **lucide-react**, single icon library sitewide
- **react-router-dom** with route-level code splitting
- Self-hosted **Geist Variable + Geist Mono Variable** (no external font CDN)
- Scroll-scrubbed backdrop as a canvas frame sequence
  (`public/videos/frames/`, manifest in `src/config/backdrop.json`): two
  free-license stock clips (Pexels neural-network animation, Mixkit circuit
  board) graded and crossfaded by `tools/video/encode.mjs`, which writes the
  WebP frames and poster; any clips can be swapped in with that script. A generative alternative lives in
  `tools/video/scene.html` + `render.mjs`. See `docs/STYLEGUIDE.md`.

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
  data/                 # tech stack, case studies, industries, testimonials
  pages/                # routed pages (+ legal placeholder pages)
docs/STYLEGUIDE.md      # binding design-system & contribution contract
public/                 # robots.txt, sitemap.xml, favicon, og-image
```

## Before launch: replace every placeholder

All placeholders are intentional (see `prompt.md` §45–46: never invent company
facts). Search the repo for `[TBD]` and update:

1. **`src/config/site.ts`**: company name, wordmark, domain/URL, emails,
   phone, address, social links.
2. **Analytics**: `src/lib/analytics.ts`: set real `GTM_ID` / `GA4_ID`.
   Scripts only load after consent *and* only when real IDs are configured.
3. **Legal pages**: `src/pages/legal/*` are clearly-marked placeholders;
   replace with approved legal content.
4. **Domain references**: `public/robots.txt`, `public/sitemap.xml`,
   `index.html` (title/description), `public/og-image.png` (regenerate with
   the real brand), favicon.
5. **Case studies**: `src/data/caseStudies.ts` content is labeled
   *Illustrative*; replace with approved client work when available.
6. **Testimonials**: `src/data/testimonials.ts` quotes and people are
   illustrative placeholders; replace with real, permitted quotes.
7. **Contact form endpoint**: `src/components/sections/ContactForm.tsx`
   submits to a stub; wire `submitContactRequest` to a real endpoint with
   server-side spam protection and rate limiting.

## Component architecture (prompt.md §44 mapping)

Every §44 responsibility exists; some carry clearer names in code:
ProblemSolution → `WhatWeSolve`, ServiceCard → cards in `ServicesOverview`,
RAGArchitecture → diagram in `RAGSection`, AgentWorkflow → `AgentsSection`,
DataSection → `MachineLearningSection` + `AnalyticsBISection`,
DashboardPreview → in `DataVizSection`, ArchitectureDiagram →
`AIArchitectureSection`, TechnologyCard → cards in `TechnologyStackSection`,
CaseStudyCard / IndustryCard → cards in their sections,
CTA → `FinalCTA`. All share the `ui/` primitives (Button, Card, Badge, …).

## Quality targets (from prompt.md)

- WCAG 2.1 AA: skip link, semantic HTML, keyboard navigable, visible focus,
  labeled forms, reduced-motion support, AA contrast in both themes
- Performance: code-split routes, vendor chunks (react, gsap), self-hosted fonts,
  no third-party scripts before consent, home JS budget under 250 KB gzip
- SEO: per-page titles/descriptions/canonicals, Open Graph + Twitter cards,
  `Organization` + `WebSite` JSON-LD, sitemap.xml, robots.txt
