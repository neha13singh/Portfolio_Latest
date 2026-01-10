/** @type {import('tailwindcss').Config} */
// Force rebuild for Vercel sync - 2026-01-10T17:44
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agent-black': '#000000',
        'agent-dark': '#0a0a0a',
        'agent-card': '#111111',
        'agent-header': '#1a1a1a',
        'agent-border': '#262626',
        'agent-white': '#ffffff',
        'agent-silver': '#e5e5e5',
        'agent-zinc': '#404040',
        'agent-dim': '#737373',
        'agent-grid': '#1a1a1a',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
