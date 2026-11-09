/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0B0E17', // deep navy-charcoal, never pure black
          surface: '#131826', // panel base, before glass blur
          elevated: '#1A2033', // raised cards, modals
          border: 'rgba(255,255,255,0.08)',
        },
        ink: {
          DEFAULT: '#E7E9F3', // primary text
          muted: '#8B93A7', // secondary text
          faint: '#5B6478', // tertiary / disabled text
        },
        brand: {
          50: '#EEF0FF',
          100: '#E0E3FF',
          300: '#A5ACFB',
          400: '#8188F3',
          500: '#6366F1', // primary — teacher/action accent
          600: '#4F52D6',
          700: '#3F41AD',
        },
        pulse: {
          300: '#7FEAE0',
          400: '#45DBCB',
          500: '#22D3C7', // secondary — "live" real-time accent
          600: '#17A99F',
        },
        amber: {
          400: '#FBBF54',
          500: '#F59E0B', // pending / attention state
          600: '#D8850A',
        },
        danger: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.35)',
        'glass-sm': '0 4px 16px rgba(0,0,0,0.25)',
        glow: '0 0 0 1px rgba(99,102,241,0.4), 0 0 24px rgba(99,102,241,0.25)',
        'glow-pulse': '0 0 0 1px rgba(34,211,199,0.4), 0 0 24px rgba(34,211,199,0.25)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6366F1 0%, #22D3C7 100%)',
        'radial-fade': 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.18), transparent 60%)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        barGrow: {
          from: { width: '0%' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 1.8s cubic-bezier(0.4,0,0.6,1) infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
