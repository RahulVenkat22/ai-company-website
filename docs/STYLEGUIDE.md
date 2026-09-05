# Implementation Style Guide (read before writing any component)

This is the binding contract for everyone contributing components to this
website. The product requirements live in `prompt.md` at the repo root.

## Stack & hard rules

- React 18 + TypeScript (strict) + Vite + Tailwind CSS 3.4. Path alias `@/` maps to `src/`.
- Icons: **lucide-react only**. Always `aria-hidden="true"` on decorative icons.
- Motion system (2026-09-05): two libraries with a strict split.
  - **GSAP + ScrollTrigger** for everything tied to scroll: the scrubbed
    video backdrop, pinning, parallax, count-ups, scroll-tracked counters.
    Import only via `src/lib/gsap.ts`; every effect runs inside
    `gsap.context()` scoped to its component and is reverted on unmount.
    Native scrolling only. No smooth-scroll libraries (Lenis was tried and
    removed; do not reintroduce scroll hijacking).
  - **Framer Motion** (`framer-motion`) for component-level state
    transitions: button hover/press, menu open/close (`AnimatePresence`),
    accordion expand, testimonial crossfade, consent card enter/exit, hover
    photo reveals. Always read `useReducedMotion()` and collapse to static.
  - **Never drive the same DOM node with both.** GSAP animates wrappers and
    scroll containers; Framer animates the interactive leaf.
  - Simple entrance reveals stay on the CSS `.reveal` system.
- Photography lives in `public/images/` (Unsplash). No third-party products
  or trademarks in photos. Abstract tiles (`public/images/expertise/system-*.jpg`)
  are stills from the generated brand footage.
- Backdrop footage: `public/videos/backdrop-1280.mp4` / `backdrop-854.mp4` +
  `backdrop-poster.jpg`. Current footage is a two-clip sequence (the headline's
  "intelligence, then production"): (1) Pexels "Abstract Neural Network
  Connections Animation" by Nicola Narracci, pexels.com/video/29184317, Pexels
  License (free commercial use, no attribution), `--grade neural`; crossfading
  into (2) Mixkit "High tech circuit board with processor",
  mixkit.co/free-stock-video/high-tech-circuit-board-with-processor-47051/,
  Mixkit Stock Video Free License, `--grade muted --sat 0.6`. Produce the files
  ONLY through `tools/video/encode.mjs`
  (any source clip, with optional graphite/orange grade and trim) or
  `tools/video/render.mjs` (the generator in `tools/video/scene.html`). Both
  write all-intra H.264 (every frame a keyframe), which is what keeps scroll
  scrubbing smooth. Never drop in a normally encoded export.
- Respect `prefers-reduced-motion`: global CSS disables transitions and
  reveals; JS-driven motion checks `prefersReducedMotion()` (GSAP) or
  `useReducedMotion()` (Framer).
- Credibility (prompt.md 45): never invent clients, metrics, certifications,
  partnerships or numbers. Label invented examples "Illustrative" and use
  `[TBD]` for unknown company facts.
- Copy: no em-dashes or en-dashes anywhere in visible text (use a comma,
  colon, period or parentheses). No middle-dot separators. Sentence case for
  headings, labels and CTAs. One label per intent: the contact action is
  always "Start a project".
- Every file must pass `tsc` strict + eslint with zero errors/warnings.

## Theme & color

Design language (2026-09-05 "graphite + signal"): dark-first cool graphite
ground, off-white ink, ONE desaturated signal-orange accent, precise sans
display type, cinematic media scenes. Semantic Tailwind colours only:

- Backgrounds: `bg-bg` (page), `bg-surface`, `bg-surface-2`, `bg-surface-3`
- Borders: `border-line`, `border-line-strong`
- Text: `text-ink`, `text-ink-muted`, `text-ink-subtle`, `text-ink-inverse`
  (ink-inverse is the text colour ON the accent: dark in the dark theme,
  white in the light theme)
- Brand: `primary` is the signal orange (`#E8632B` dark, `#C24A17` light);
  `accent` and `violet-acc` are aliases of it. One accent, whole site.
- Fixed scene colours for always-dark media (photo/video backdrops, footer):
  `scene` (#0B0C0F scrims), `paper` (#ECEEF2 text), `signal` (#E8632B).
  Never hardcode hex in components; use these three names.
- **Dark is the default theme**; light ("cool paper") via
  `:root[data-theme='light']`. `dark:` variants work (selector-based).
  System preference is not auto-applied; the toggle stores an explicit choice.
- Contrast: 4.5:1 minimum everywhere (axe-core color-contrast scan of all
  routes in both themes is clean; keep it that way). Over dark scenes use
  `text-paper/70` or stronger for body, `/60` minimum for 11px labels.
- Surfaces: flat, hairline-bordered panels. `.glass` for translucent panels
  over media (blur + inner highlight, solid fallback under
  `prefers-reduced-transparency`). `.grain` is the single fixed film-grain layer.

## Typography

One family: **Geist Variable** (weights via `font-medium` 500 for all display
sizes, 400 body). **Geist Mono Variable** for micro-labels, tags, tabular
numerals (`.tnum`). Display scale (config `fontSize`, weight 500, tight
negative tracking): `text-display-xl` (home hero only), `text-display`,
`text-h1`, `text-h2`, `text-h3`, `text-h4`; body: `text-body-lg`,
`text-body`, `text-small`, `text-caption`. Emphasis inside a headline is
colour only (`.accent-word`, or `text-signal` over dark scenes), same family.

Micro-labels: `font-mono text-[11px] uppercase tracking-[0.14em]`. They are
RATIONED: at most one label above a section heading per three sections on a
page (the `.eyebrow` class / `SectionHeading eyebrow` prop exist but are
mostly unused). No section numbering in labels, no scroll cues, no
decoration text strips.

## Layout

- `Section` = standard wrapper (`.section-pad` rhythm + 1344px `Container`).
  Variants: `default`, `alt` (surface band), `deep`.
- Spacing: 8px grid (Tailwind steps plus 18/22/30/36). Sections breathe:
  `py-20 md:py-28 lg:py-36`.
- Radii (shape lock): `rounded-card` 10px for panels and photos,
  `rounded-btn` 6px for buttons, inputs, chips and icon tiles. No pills.
  Small dots stay round only when they carry meaning (chart legends).
- Layout families are not repeated on one page. Homepage set: window hero
  (bottom-left copy) > single marquee strip > statement > stacked photo
  panels (`StackedCards`) > stat row > pinned slideshow (`PinnedShowcase`) >
  three-cell bento (`ServicesOverview`) > horizontal scroll-snap row
  (`CaseStudiesSection`) > sticky rail over fixed photo (`WhyChooseUs`) >
  hairline three-cell grid (`ProcessTeaser`) > quote + portrait
  (`Testimonials`) > window CTA (`FinalCTA`). Max one marquee per page.
- No three-equal-card feature rows; asymmetric grids, bento, hairline grids
  or scroll-snap rows instead. Grids have exactly as many cells as items.
- Mobile-first. No horizontal page scroll at 320px. Grids collapse to one column.

## Shared primitives (import; do not re-create)

```tsx
import { Section } from '@/components/ui/Section'          // id?, variant?, bleed?, ariaLabel?
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading' // eyebrow? (rationed), title, lead?, align?, as?
import { PageHeader } from '@/components/ui/PageHeader'    // interior h1 over a photo: title, lead?, image?, kicker?, children?
import { Button } from '@/components/ui/Button'            // variant: primary|secondary|ghost|inverse (inverse = paper outline for dark scenes); size sm|md|lg; to|href; eventName?, eventParams?, iconLeft/iconRight. Framer hover/press built in.
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'                // interactive?, variant: default|outline, as
import { Reveal } from '@/components/ui/Reveal'            // CSS scroll reveal: as?, delay? (ms), variant: up|fade
import { ParallaxBand } from '@/components/ui/ParallaxBand' // fixed-window photo band; omit image for a window onto the video
import { TextInput, SelectInput, TextArea } from '@/components/ui/Field'
import { Alert } from '@/components/ui/Alert'
import { Seo } from '@/lib/seo'
import { trackEvent } from '@/lib/analytics'
import { site } from '@/config/site'
```

Business CTAs fire analytics: `eventName` (`cta_click`, `consultation_cta_click`,
`nav_cta_click`) with `eventParams={{ cta: '<slug>', location: '<section>' }}`.

## Scroll-video backdrop (homepage)

`ScrollVideoStory` renders one fixed full-viewport video behind the page.
Page progress (top until the footer enters) maps linearly onto the video's
timeline; a `gsap.ticker` loop chases forward scroll with real playback at a
proportional rate and seeks on rewinds. The Hero and FinalCTA are open
windows (`data-video-window`); other stretches sit in `.story-glass`
wrappers (graphite scrim, translucent panels). A poster image sits under the
video and is the only thing rendered under reduced motion.

To change the footage: edit `tools/video/scene.html`, run
`npm i playwright ffmpeg-static --no-save`, then
`node tools/video/render.mjs preview` (contact sheet) and
`node tools/video/render.mjs full` (encodes + poster), then `npm prune`.

## Animation utilities (CSS)

- Scroll reveal: `<Reveal delay={80 * i}>` for staggered entrances.
- SVG flow lines: `animate-flow` / `animate-flow-slow`; node pulse
  `animate-node-glow`; soft pulse `animate-pulse-soft`; card hover `card-lift`.
- Marquee: `animate-marquee` (one per page).
- Easing: `ease-premium` (cubic-bezier(0.22, 1, 0.36, 1)); durations 200 to 700ms.
- `.grid-backdrop` = subtle technical grid layer; `.scrollbar-none` hides
  scrollbars on scroll-snap rows.

## Diagram/SVG conventions

Architecture diagrams are inline SVG or CSS grid node layouts: nodes are
`rounded-card border border-line bg-surface-2` boxes with a lucide icon tile
and label; connectors use `stroke="currentColor"` or the `animate-flow`
dashed style. Every diagram has an accessible description (`role="img"` +
`aria-label`, or a visible step list). Diagrams stack vertically below `md:`.

## Tone of copy

Confident, technical, concrete, outcome-focused. No hype words, no fake
numbers, no exclamation marks, no em-dashes. Short sentences. CTAs are
invitations, not pressure.
