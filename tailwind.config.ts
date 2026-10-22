import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: "#361216",
          deep: "#250b0e",
          soft: "#4a1c21",
          mist: "#5b2a30",
        },
        ivory: "#f9f3f0",
        cream: "#eadbd3",
        blush: "#f3e3dd",
        gold: {
          DEFAULT: "#c8a98d",
          deep: "#ab8663",
          light: "#e2d0bd",
        },
        ink: "#2d1d1f",
        muted: "#7d6a6b",
      },
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
      },
      maxWidth: {
        shell: "1240px",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.2s ease both",
        "toast-in": "toast-in 0.35s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
