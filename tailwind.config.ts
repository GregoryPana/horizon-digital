import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        black: '#0A0A09',
        dark: '#111110',
        card: '#161614',
        surface: '#1C1C1A',
        white: '#FAFAF8',
        cream: '#F5F0E8',
        muted: {
          DEFAULT: '#8A8278',
          2: '#5A5550',
        },
        teal: {
          DEFAULT: '#00C9A7',
          bg: 'rgba(0,201,167,0.09)',
          border: 'rgba(0,201,167,0.25)',
          glow: 'rgba(0,201,167,0.055)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          strong: 'rgba(255,255,255,0.13)',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-cinematic': ['clamp(64px, 8vw, 120px)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-hero': ['clamp(48px, 6vw, 92px)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-xl': ['clamp(36px, 4.5vw, 64px)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg': ['clamp(30px, 3.8vw, 52px)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display-md': ['clamp(24px, 2.8vw, 40px)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'ui-eyebrow': ['12px', { lineHeight: '1', letterSpacing: '0.2em' }],
        'ui-nav': ['13px', { lineHeight: '1.4', letterSpacing: '0.04em' }],
        'ui-label': ['12px', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'ui-btn': ['14px', { lineHeight: '1', letterSpacing: '0.02em' }],
        'body-lg': ['17px', { lineHeight: '1.7' }],
        'body-base': ['15px', { lineHeight: '1.75' }],
        'body-sm': ['14px', { lineHeight: '1.75' }],
      },
      spacing: {
        'cinematic': 'clamp(120px, 15vh, 200px)',
        sec: 'clamp(100px, 12vw, 160px)',
        'sec-sm': 'clamp(64px, 8vw, 100px)',
        gutter: 'clamp(24px, 5vw, 64px)',
        'bento-gap': 'clamp(12px, 2vw, 24px)',
      },
      borderRadius: {
        'bento': '24px',
        'btn': '12px',
        'pill': '100px',
      },
      maxWidth: {
        site: '1180px',
        copy: '600px',
        'hero-body': '680px',
        'cta-body': '480px',
        'copy-sm': '560px',
        'work-desc': '520px',
        'process-desc': '580px',
        'footer-brand': '240px',
        'hero-title': '760px',
        'content-lg': '760px',
      },
      zIndex: {
        base: '0',
        above: '10',
        hero: '3',
        heroOv: '1',
        sticky: '50',
        nav: '500',
        mob: '499',
        waFloat: '400',
        progressBar: '600',
        cursor: '9999',
        ring: '9998',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'scroll-pulse': 'scroll-pulse 2.2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'scroll-pulse': {
          '0%,100%': { opacity: '0.38' },
          '50%': { opacity: '0.12' },
        },
      },
      backgroundImage: {
        'noise': "url('/images/noise.png')",
        'mesh-gradient': 'radial-gradient(at 0% 0%, hsla(170,100%,39%,0.15) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(200,100%,45%,0.15) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(30,100%,60%,0.1) 0, transparent 50%)',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.9, 0, 0.1, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
