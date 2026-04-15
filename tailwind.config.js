/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ─── Tokens de Diseño ───────────────────────────────────────────────
      colors: {
        bg: {
          primary:    '#080812',
          secondary:  '#0f0f1a',
          card:       '#13131e',
          'card-alt': '#1a1a2a',
        },
        accent: {
          cyan:   '#00d4ff',
          violet: '#8b5cf6',
        },
        text: {
          primary:   '#e2e8f0',
          secondary: '#94a3b8',
          muted:     '#475569',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        'orb-pulse': {
          '0%, 100%': { transform: 'scale(1)',    opacity: '0.3' },
          '50%':      { transform: 'scale(1.15)', opacity: '0.6' },
        },
      },
      animation: {
        float:       'float 5.5s ease-in-out infinite',
        'orb-pulse': 'orb-pulse 4s ease-in-out infinite',
      },
      boxShadow: {
        'glow-cyan':   '0 0 32px rgba(0,212,255,0.18)',
        'glow-violet': '0 0 32px rgba(139,92,246,0.18)',
        card:          '0 4px 24px rgba(0,0,0,0.45)',
        'card-hover':  '0 10px 48px rgba(0,0,0,0.65)',
      },
    },
  },
  plugins: [],
}
