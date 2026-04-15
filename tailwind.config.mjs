import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ── Core Paper Tones ──────────────────────────────────
        paper:    '#FDFCF0', // warm off-white — the canvas
        parchment:'#F5F0DC', // slightly deeper cream — card surfaces
        vellum:   '#EDE8D0', // aged paper — borders, dividers
        fog:      '#D8D2B8', // muted warm grey — placeholder areas

        // ── Ink & Text ────────────────────────────────────────
        ink:      '#1C1A14', // near-black with warmth — body text
        charcoal: '#2E2B22', // dark brown-grey — headings
        sepia:    '#5C5240', // mid-tone — subheadings, captions
        dust:     '#8C8270', // muted — metadata, stamps

        // ── Accent / Postmark ─────────────────────────────────
        postmark: '#7A3B2E', // deep rust-red — category stamps
        wax:      '#B85C38', // warm terracotta — hover accents
        sage:     '#4A5C45', // muted green — The Conservatory tag
        navy:     '#2C3E50', // deep ink blue — The Archive tag
        ochre:    '#8B6914', // golden brown — The Library tag
        sienna:   '#7A3B2E', // burnt sienna — The Gallery tag
      },

      fontFamily: {
        // Elegant serif for body & long reads
        serif:  ['"EB Garamond"', 'Georgia', 'serif'],
        // Clean sans for nav, labels, UI elements
        sans:   ['"DM Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        // Monospaced for dates/stamps — gives a "postmark" feel
        mono:   ['"DM Mono"', '"Courier New"', 'monospace'],
      },

      fontSize: {
        // Typographic scale — tuned for readability at Garamond's optical size
        'xs':   ['0.75rem',  { lineHeight: '1.5' }],
        'sm':   ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1.0625rem',{ lineHeight: '1.75' }],  // 17px — Garamond reads better slightly larger
        'lg':   ['1.1875rem',{ lineHeight: '1.7' }],
        'xl':   ['1.375rem', { lineHeight: '1.5' }],
        '2xl':  ['1.625rem', { lineHeight: '1.4' }],
        '3xl':  ['2rem',     { lineHeight: '1.3' }],
        '4xl':  ['2.5rem',   { lineHeight: '1.2' }],
        '5xl':  ['3.25rem',  { lineHeight: '1.1' }],
      },

      letterSpacing: {
        stamp:  '0.18em',  // wide tracking for category stamps
        title:  '-0.01em', // slight negative for large serif headings
        wide:   '0.06em',
      },

      borderRadius: {
        'postcard': '3px',  // almost-sharp corners — physical card feel
      },

      boxShadow: {
        'card':      '2px 3px 12px rgba(28,26,20,0.08), 0 1px 3px rgba(28,26,20,0.06)',
        'card-hover':'3px 6px 24px rgba(28,26,20,0.14), 0 2px 6px rgba(28,26,20,0.08)',
        'stamp':     'inset 0 0 0 2px currentColor',
      },

      backgroundImage: {
        // Subtle paper grain via SVG noise — keeps it from feeling digital-sterile
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E\")",
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      maxWidth: {
        'reading': '68ch',  // optimal prose line length
        'museum':  '1160px',
      },

      transitionTimingFunction: {
        'museum': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
