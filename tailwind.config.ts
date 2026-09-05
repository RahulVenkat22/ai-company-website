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
        // Editorial serif display scale — the family is attached to these
        // classes in index.css (@layer components), so text-h4 and smaller
        // stay sans. Serif carries weight 400 and near-zero tracking.
        'display-xl': [
          'clamp(3.25rem, 1.2rem + 9vw, 8.5rem)',
          { lineHeight: '0.96', letterSpacing: '-0.01em', fontWeight: '400' },
        ],
        display: [
          'clamp(3rem, 1.6rem + 5.8vw, 6.5rem)',
          { lineHeight: '0.98', letterSpacing: '-0.01em', fontWeight: '400' },
        ],
        h1: [
          'clamp(2.5rem, 1.7rem + 3.4vw, 4.5rem)',
          { lineHeight: '1.03', letterSpacing: '-0.01em', fontWeight: '400' },
        ],
        h2: [
          'clamp(2rem, 1.5rem + 2.1vw, 3.25rem)',
          { lineHeight: '1.08', letterSpacing: '-0.005em', fontWeight: '400' },
        ],
        h3: [
          'clamp(1.5rem, 1.3rem + 1vw, 2.125rem)',
          { lineHeight: '1.15', letterSpacing: '0em', fontWeight: '400' },
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
        card: '1rem',
        btn: '0.625rem',
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
