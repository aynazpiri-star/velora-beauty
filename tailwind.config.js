/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F8EEEC',
        softpink: '#EBCFCB',
        cream: '#FFF9F5',
        ink: '#242024',
        burgundy: '#9B4560',
        rose: '#B86D7E',
        sand: '#F3E7E1',
        mist: '#FBEEF0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      transitionDuration: {
        400: '400ms',
      },
      boxShadow: {
        soft: '0 18px 45px -28px rgba(36, 32, 36, 0.35)',
        card: '0 24px 60px -40px rgba(36, 32, 36, 0.5)',
        lift: '0 32px 70px -40px rgba(155, 69, 96, 0.45)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.86)' },
          '60%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        pop: 'pop 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
