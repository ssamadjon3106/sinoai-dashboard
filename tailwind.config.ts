import type { Config } from 'tailwindcss'

/**
 * Single source of truth for design tokens. Risk-band colors are clinically
 * fixed (see brief §2) and must never be overridden per-component.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F9F8',
        surface: '#FFFFFF',
        'surface-muted': '#EEF2F1',
        'surface-sunken': '#F1F5F4',
        border: {
          DEFAULT: '#E1E8E6',
          strong: '#CBD6D3',
        },
        ink: {
          900: '#10231F',
          700: '#2A3B37',
          500: '#5B6D68',
          400: '#8A9B96',
          300: '#B7C2BF',
        },
        brand: {
          50: '#EAF6F2',
          100: '#D2ECE3',
          200: '#A6D9C8',
          300: '#72BFA8',
          500: '#17977E',
          600: '#128069',
          700: '#0F6E5C',
          900: '#0A4438',
        },
        risk: {
          low: '#2E7D32',
          'low-bg': '#E8F5E9',
          'low-border': '#C6E4C8',
          moderate: '#F57C00',
          'moderate-bg': '#FFF3E0',
          'moderate-border': '#F6D9AD',
          high: '#C62828',
          'high-bg': '#FDECEA',
          'high-border': '#F3C3BE',
        },
        domain: {
          diabetes: '#B98900',
          'diabetes-bg': '#FBF3DC',
          cvd: '#A6455C',
          'cvd-bg': '#F7E9EC',
          oncology: '#6B5CA5',
          'oncology-bg': '#EFECFA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        control: '12px',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16, 35, 31, 0.04), 0 4px 16px -4px rgba(16, 35, 31, 0.08)',
        'card-hover': '0 4px 8px -2px rgba(16, 35, 31, 0.06), 0 12px 28px -6px rgba(16, 35, 31, 0.14)',
        panel: '-8px 0 32px -12px rgba(16, 35, 31, 0.16)',
      },
      keyframes: {
        'gauge-sweep': {
          from: { strokeDashoffset: 'var(--gauge-offset-from)' },
          to: { strokeDashoffset: 'var(--gauge-offset-to)' },
        },
        'panel-in': {
          from: { opacity: '0', transform: 'translateX(12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'gauge-sweep': 'gauge-sweep 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'panel-in': 'panel-in 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-up': 'fade-up 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
