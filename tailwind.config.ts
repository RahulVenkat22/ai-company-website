import type { Config } from 'tailwindcss'

/**
 * Design tokens are CSS variables in src/styles/index.css so the palette can
 * switch between the dark (default) and light themes without duplicating
 * utilities. Tailwind maps semantic names onto those vars. Three FIXED
 * colours exist for always-dark media scenes (photo/video backdrops) where
 * theme tokens would flip: `scene` (graphite scrim), `signal` (accent) and
 * `paper` (off-white text).
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--c-surface) / <alpha-value>)',
          2: 'rgb(var(--c-surface-2) / <alpha-value>)',
          3: 'rgb(var(--c-surface-3) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--c-border) / <alpha-value>)',
          strong: 'rgb(var(--c-border-strong) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-text) / <alpha-value>)',
          muted: 'rgb(var(--c-text-muted) / <alpha-value>)',
          subtle: 'rgb(var(--c-text-subtle) / <alpha-value>)',
          inverse: 'rgb(var(--c-text-inverse) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--c-primary) / <alpha-value>)',
          hover: 'rgb(var(--c-primary-hover) / <alpha-value>)',
          soft: 'rgb(var(--c-primary-soft) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          strong: 'rgb(var(--c-accent-strong) / <alpha-value>)',
        },
        violet: {
          acc: 'rgb(var(--c-violet) / <alpha-value>)',
        },
        // Fixed scene colours (identical in both themes)
        scene: '#0B0C0F',
        signal: '#E8632B',
        paper: '#ECEEF2',
      },
      fontFamily: {
        sans: [
          'Geist Variable',
          'Geist',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'Geist Mono Variable',
          'Geist Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      fontSize: {
        // Display scale: one sans family, weight 500, tight negative tracking.
        'display-xl': [
          'clamp(3rem, 1.1rem + 7.6vw, 7.25rem)',
          { lineHeight: '0.94', letterSpacing: '-0.04em', fontWeight: '500' },
        ],
        display: [
          'clamp(2.5rem, 1.25rem + 4.4vw, 5rem)',
          { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '500' },
        ],
        h1: [
          'clamp(2.25rem, 1.5rem + 2.6vw, 3.75rem)',
          { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '500' },
        ],
        h2: [
          'clamp(1.875rem, 1.4rem + 1.7vw, 2.75rem)',
          { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '500' },
        ],
        h3: [
          'clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem)',
          { lineHeight: '1.16', letterSpacing: '-0.02em', fontWeight: '500' },
        ],
        h4: [
          'clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)',
          { lineHeight: '1.35', letterSpacing: '-0.012em', fontWeight: '540' },
        ],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.55' }],
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      },
      maxWidth: {
        content: '84rem', // 1344px content width
      },
      borderRadius: {
        card: '0.625rem', // 10px: panels, photos
        btn: '0.375rem', // 6px: buttons, inputs, chips
      },
      boxShadow: {
        card: 'inset 0 1px 0 rgb(255 255 255 / 0.04), 0 12px 32px -16px rgb(0 0 0 / 0.6)',
        'card-hover':
          'inset 0 1px 0 rgb(255 255 255 / 0.06), 0 20px 48px -20px rgb(0 0 0 / 0.7)',
        glow: '0 0 0 1px rgb(var(--c-primary) / 0.35), 0 0 32px -10px rgb(var(--c-primary) / 0.4)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        36: '9rem',
      },
    },
  },
  plugins: [],
} satisfies Config
