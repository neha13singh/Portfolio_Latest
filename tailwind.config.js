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
        'agent-black': '#020617',
        'agent-dark': '#0a0f1e',
        'agent-card': '#111827',
        'agent-header': '#1f2937',
        'agent-border': '#334155',
        'agent-white': '#ffffff',
        'agent-silver': '#94a3b8',
        'agent-zinc': '#22d3ee',
        'agent-dim': '#0891b2',
        'agent-grid': '#1e293b',
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
