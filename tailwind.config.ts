import type { Config } from 'tailwindcss'

/**
 * Design tokens are defined as CSS variables in src/styles/index.css so the
 * palette can switch between the dark (default) and light themes without
 * duplicating utility classes. Tailwind maps semantic names onto those vars.
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
      },
      fontFamily: {
        sans: [
          'Instrument Sans Variable',
          'Instrument Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: ['Instrument Serif', 'Georgia', 'Times New Roman', 'serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      fontSize: {
        // Typography scale (see prompt.md §41)
        display: [
          'clamp(2.75rem, 1.4rem + 5.4vw, 5.75rem)',
          { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '590' },
        ],
        h1: [
          'clamp(2.25rem, 1.45rem + 3vw, 3.5rem)',
          { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '590' },
        ],
        h2: [
          'clamp(1.875rem, 1.35rem + 1.9vw, 2.75rem)',
          { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '580' },
        ],
        h3: [
          'clamp(1.375rem, 1.15rem + 0.9vw, 1.875rem)',
          { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '560' },
        ],
        h4: [
          'clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)',
          { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '560' },
        ],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.55' }],
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      maxWidth: {
        content: '80rem', // 1280px content width
      },
      borderRadius: {
        card: '0.5rem',
        btn: '0.375rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.05), 0 10px 30px -18px rgb(0 0 0 / 0.35)',
        'card-hover':
          '0 2px 6px 0 rgb(0 0 0 / 0.06), 0 18px 40px -20px rgb(0 0 0 / 0.45)',
        glow: '0 0 0 1px rgb(var(--c-primary) / 0.3), 0 0 28px -10px rgb(var(--c-primary) / 0.35)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
