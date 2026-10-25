/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF6F1',
        cream: '#F5EFE8',
        sand: '#EFE6DA',
        champagne: '#E3D1B8',
        gold: '#A68966',
        goldDeep: '#8C6F4E',
        goldLight: '#C9AE86',
        ink: '#2A2724',
        muted: '#7C736B',
        line: '#E6DCD1',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Vazirmatn', 'Tahoma', 'system-ui', 'sans-serif'],
        latin: ['Jost', 'Vazirmatn', 'sans-serif'],
      },
      maxWidth: {
        site: '1240px',
      },
      letterSpacing: {
        wide2: '0.18em',
        wide3: '0.3em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
