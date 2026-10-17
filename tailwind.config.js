/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: '#063B55',
          deep: '#04283A',
          soft: '#0A5573',
          ink: '#021E2C',
        },
        turquoise: {
          DEFAULT: '#12A8C4',
          light: '#63CBDD',
          dark: '#0B7C93',
        },
        ink: {
          DEFAULT: '#111111',
          soft: '#2A2A2A',
          muted: '#5A5A5A',
        },
        ivory: {
          DEFAULT: '#F8F3EC',
          deep: '#F1E9DD',
          line: '#E0D8D0',
        },
        champagne: {
          DEFAULT: '#D8C2A2',
          deep: '#BFA57F',
          pale: '#EFE4D2',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
      },
      letterSpacing: {
        brand: '0.42em',
        wide2: '0.18em',
      },
      boxShadow: {
        soft: '0 20px 60px -30px rgba(6, 59, 85, 0.45)',
        card: '0 30px 70px -45px rgba(17, 17, 17, 0.45)',
        glow: '0 0 90px -20px rgba(18, 168, 196, 0.55)',
      },
      backgroundImage: {
        'ocean-veil':
          'linear-gradient(180deg, rgba(4,40,58,0.86) 0%, rgba(4,40,58,0.34) 42%, rgba(4,40,58,0.72) 100%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scrollHint: {
          '0%': { transform: 'translateY(-40%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(110%)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        scrollHint: 'scrollHint 2.2s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        rise: 'rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
