# Implementation Style Guide (read before writing any component)

This is the binding contract for everyone contributing components to this
website. The product requirements live in `prompt.md` at the repo root.

## Stack & hard rules

- React 18 + TypeScript (strict) + Vite + Tailwind CSS. Path alias `@/` → `src/`.
- Icons: **lucide-react only**. Always `aria-hidden="true"` on decorative icons.
- Motion system (updated 2026-09-01, framer-motion removed): **GSAP +
  ScrollTrigger** for scroll-scrubbed/pinned/orchestrated effects over NATIVE
  scrolling (Lenis smooth-scroll was tried and removed — the user disliked
  hijacked scrolling; do not reintroduce it). Import gsap/ScrollTrigger only
  via `src/lib/gsap.ts`. Every GSAP effect must run inside `gsap.context()`
  scoped to its component and `ctx.revert()` on unmount. Simple entrance reveals stay on the
  CSS `.reveal` system — do not duplicate them in GSAP.
- Photography lives in `public/images/` (Unsplash); the hero background video
  in `public/videos/hero-network.mp4` (Mixkit free license — muted, looping,
  paused off-screen, photo fallback under reduced motion). No other external
  CDNs — remaining visuals are inline SVG or CSS.
- Respect `prefers-reduced-motion`: the global CSS already disables transitions
  and reveals; for bespoke JS-driven motion, check
  `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- Credibility (prompt.md §45): never invent clients, metrics, certifications,
  partnerships or numbers. Label invented examples **“Illustrative”** and use
  `[TBD]` for unknown company facts. No fake statistics anywhere.
- Every file must pass `tsc` strict + eslint with zero errors/warnings.
  Do not use `any`. Remove unused imports (noUnusedLocals is on).

## Theme & color

Design language (2026-09-05 editorial restyle, Luxterra-inspired): warm
ivory "gallery" ground + espresso ink + ONE signal-orange accent, giant
editorial serif display type, and full-bleed dark photographic/video scenes
between cream content stretches. No gradients as decoration (dark photo
scrims are the only gradients). Semantic Tailwind colors only (never
hardcode hex in components — the only sanctioned literals are the
always-dark scene colors below):

- Backgrounds: `bg-bg` (page), `bg-surface`, `bg-surface-2`, `bg-surface-3`
- Borders: `border-line`, `border-line-strong`
- Text: `text-ink` (primary), `text-ink-muted`, `text-ink-subtle`, `text-ink-inverse`
- Brand: ONE color. `primary` is the signal orange (deep `#C03600` in light,
  `#FF5E1C` in dark); `accent` and `violet-acc` resolve to the SAME orange.
  Usable with alpha: `bg-primary/10`
- Status colors (fixed Tailwind hues) need light+dark: e.g.
  `text-emerald-800 dark:text-emerald-300`
- **Light (ivory) is the default theme**; dark ("espresso carbon") via
  `:root[data-theme='dark']`. `dark:` variant utilities work
  (selector-based). System preference is not auto-applied — ivory is the
  brand default; the toggle stores an explicit choice.
- Over photos/video use explicit `text-white/…` + `#FF5E1C` accents and
  `#130F0D` (espresso) scrims, never theme tokens. Always-dark UI panels
  (footer, question card) use `#191310` with `#F4EEE3` text.
- PageHeader = tall editorial photo hero (min-h 68svh, bottom-aligned
  `text-display` serif h1, optional mono `kicker`).

## Typography

Editorial two-face system: **Instrument Serif (400)** is the display face —
`text-display-xl`, `text-display`, `text-h1`, `text-h2`, `text-h3` all
render serif automatically (family attached in index.css; near-zero
tracking, tight leading). **Instrument Sans** covers `text-h4` and below,
body, UI. `.accent-word` = italic serif emphasis in the primary color
inside headlines (over dark scenes add `!text-[#FF5E1C]`). Micro-labels
(eyebrows, indexes, tags, footer group titles) are `font-mono` uppercase
with wide tracking. Giant serif is also used for: word marquee
(CapabilityStrip), stat numerals (StatsBand), footer watermark, FAQ
questions, Write/Call/Visit contact rows.

Custom text sizes: `text-display-xl` (hero only), `text-display`,
`text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-body-lg`, `text-body`,
`text-small`, `text-caption`. Headings must follow document order (one h1
per page; sections use h2; sub-heads h3/h4).

Copy style: visible headings and CTA labels are sentence case ("Start a
conversation"), never Title Case; `<Seo title>` document titles may stay
Title Case. No Sparkles/magic icons anywhere.

## Layout

- `Section` component = standard section wrapper (adds `.section-pad` rhythm +
  1280px `Container`). Variants: `default`, `alt` (surface band), `deep`.
- `.container-site` class or `Container` for custom wrappers.
- 8px spacing grid: use Tailwind spacing steps (4/6/8/10/12/16…, plus 18/22/30).
- Radii: `rounded-card` (16px, cards/photos), `rounded-btn` (10px, inputs),
  `rounded` (4px, tags/chips). **Buttons are pills** (`rounded-full`, built
  into `Button` with a circular icon chip) — part of the 2026-09-05
  editorial restyle; circular controls (prev/next, FAQ chevrons) are
  `rounded-full` too. Shadows: `shadow-card` (hover states; cards are flat +
  hairline-bordered at rest), `shadow-card-hover`.
- Signature scroll patterns (all reduced-motion safe):
  `PinnedShowcase` (sticky full-screen crossfade slideshow),
  `WhyChooseUs` (fixed-window photo + sticky serif intro + numbered glass
  cards), `StackedCards` (What we solve), `StatsBand` (count-up facts),
  `CapabilityStrip` (giant serif word marquee with inline photos),
  `ScrollVideoStory` (homepage scrubbed video backdrop).
- Mobile-first. No horizontal scroll at 320px. Grids collapse to 1 column.

## Shared primitives (import — do not re-create)

```tsx
import { Section } from '@/components/ui/Section'          // id?, variant?, bleed?, ariaLabel?
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading' // eyebrow?, title, lead?, align?, as?
import { PageHeader } from '@/components/ui/PageHeader'    // page h1 block: eyebrow?, title, lead?, children?
import { Button } from '@/components/ui/Button'            // variant: primary|secondary|ghost|inverse (inverse = explicit white, for always-dark photo/video backdrops); size sm|md|lg; to|href; eventName?, eventParams?, iconLeft/iconRight
import { Badge } from '@/components/ui/Badge'              // tone: neutral|accent|primary|violet
import { Card } from '@/components/ui/Card'                // interactive?, variant: default|outline, as: div|article|li
import { Reveal } from '@/components/ui/Reveal'            // CSS scroll reveal: as?, delay? (ms), variant: up|fade
import { TextInput, SelectInput, TextArea } from '@/components/ui/Field'
import { Alert } from '@/components/ui/Alert'              // tone: success|error|info
import { Seo } from '@/lib/seo'                            // title, description, path, jsonLd?
import { trackEvent } from '@/lib/analytics'
import { site } from '@/config/site'
```

Buttons that are business CTAs must fire analytics: use `eventName`
(`cta_click`, `consultation_cta_click`, `nav_cta_click`) with
`eventParams={{ cta: '<slug>', location: '<section>' }}`.

## Animation utilities (CSS)

- Scroll reveal: wrap in `<Reveal delay={80 * i}>` for staggered entrances.
- SVG flow lines: `className="animate-flow"` (dashed line march) or
  `animate-flow-slow`; node pulse: `animate-node-glow`; soft pulse:
  `animate-pulse-soft`; card hover: `card-lift` (pair with
  `hover:border-line-strong hover:shadow-card-hover`).
- Marquee strip: `animate-marquee` (duplicate content 2× inside a
  `overflow-hidden` wrapper; pause is not required but keep it subtle).
- Easing: `ease-premium` (cubic-bezier(0.22, 1, 0.36, 1)); durations 200–700ms.
- `.grid-backdrop` = subtle technical grid background layer (absolute inset-0,
  `aria-hidden="true"`).

## Diagram/SVG conventions

Architecture diagrams are inline SVG or CSS grid “node” layouts:

- Nodes: `rounded-card border border-line bg-surface-2` boxes with a lucide
  icon tile (`bg-primary/10 text-primary` or accent) + label.
- Connectors: SVG `<line>/<path>` with `stroke="currentColor"` inside a
  `text-line-strong` wrapper, or the `animate-flow` dashed style; arrows via
  small chevron/triangle markers.
- Every diagram needs an accessible description: `role="img"` +
  `aria-label="…"` on the wrapper (and `aria-hidden` on decorative internals),
  or visible step lists next to it.
- Diagrams must simplify on mobile: switch to vertical stacking below `md:`.
  Never cause horizontal overflow.

## Tone of copy

Confident, technical, concrete, outcome-focused; no hype ("revolutionary",
"cutting-edge"), no fake numbers, no exclamation marks. Short sentences.
British/US neutral English. CTAs are invitations, not pressure.
