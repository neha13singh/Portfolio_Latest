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
  'agent-black': '#000000ff',
  'agent-dark': '#363131ff',
  'agent-card': '#000000ff',
  'agent-header': '#090404ff',
  'agent-border': '#1f0f0fff',   // ✅ comma added
  'agent-white': '#430e0eff',
  'agent-silver': '#f9b0b0ff',
  'agent-zinc': '#ecdddfff',
  'agent-dim': '#ffffffff',
  'agent-grid': '#8a5462ff',     // ✅ comma added
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
