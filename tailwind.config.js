/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#171A1B',
          soft: '#202223',
          line: '#2E3132',
        },
        ivory: {
          DEFAULT: '#F6F1E9',
          light: '#FCF9F4',
        },
        gold: {
          DEFAULT: '#C5A16B',
          muted: '#A98A59',
        },
        charcoal: {
          DEFAULT: '#252525',
          muted: '#77736D',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn Variable', 'Vazirmatn', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      maxWidth: {
        shell: '1280px',
      },
      boxShadow: {
        soft: '0 24px 60px -32px rgba(23, 26, 27, 0.45)',
        lift: '0 34px 70px -30px rgba(23, 26, 27, 0.55)',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatIn: 'floatIn 0.7s ease-out both',
      },
    },
  },
  plugins: [],
}
