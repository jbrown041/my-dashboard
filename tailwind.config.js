/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ─── Typography (Design Doc §3.1) ────────────────────────────────
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'page-title':    ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'section-header':['20px', { lineHeight: '28px', fontWeight: '600' }],
        'card-title':    ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'card-value':    ['32px', { lineHeight: '40px', fontWeight: '700' }],
        body:            ['14px', { lineHeight: '22px', fontWeight: '400' }],
        label:           ['12px', { lineHeight: '16px', fontWeight: '600' }],
        caption:         ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },

      // ─── Brand + Functional Palette (Design Doc §3.2.1 & §3.2.2) ────
      colors: {
        brand: {
          teal:       '#0095a9',
          'teal-dark':'#006072',
          navy:       '#011e41',
          coral:      '#ea6852',
        },
        status: {
          success: '#2e7d5e',
          warning: '#d4860b',
          neutral: '#6b7280',
        },
        surface: {
          light: '#f5f7fa',
          dark:  '#0d1b2e',
          white: '#ffffff',
          'card-dark': '#112240',
        },
      },

      // ─── Spacing (Design Doc §3.3) ───────────────────────────────────
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '24px',
        6: '32px',
        7: '48px',
      },

      // ─── Border Radius (Design Doc §3.4) ─────────────────────────────
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },

      // ─── Elevation / Shadows (Design Doc §3.5) ───────────────────────
      boxShadow: {
        flat:     'none',
        raised:   '0 2px 8px rgba(1,30,65,0.08)',
        floating: '0 8px 24px rgba(1,30,65,0.12)',
      },

      // ─── Layout constants ─────────────────────────────────────────────
      width: {
        nav:     '240px',
        drawer:  '480px',
        notifications: '380px',
      },
      height: {
        topbar: '64px',
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
}

