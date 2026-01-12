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
        // 'agent-black': '#130101ff',
        // 'agent-dark': '#fde6e6ff',
        // 'agent-card': '#210508ff',
        // 'agent-header': '#0e0101ff',
        // 'agent-border': '#553333ff',
        // 'agent-white': '#430e0eff',
        // 'agent-silver': '#f9b0b0ff',
        // 'agent-zinc': '#f6d2d6ff',
        // 'agent-dim': '#fed5d5ff',
        // 'agent-grid': '#2e020dff',

        //new 
        // 'agent-black': '#000000ff',
        // 'agent-dark': '#363131ff',
        // 'agent-card': '#000000ff',
        // 'agent-header': '#090404ff',
        // // 'agent-border': '#261414ff',
        // 'agent-border': '#1f0f0fff'
        // 'agent-white': '#430e0eff',
        // 'agent-silver': '#f9b0b0ff',
        // 'agent-zinc': '#ecdddfff',
        // 'agent-dim': '#ffffffff',
        // 'agent-grid': '#8a5462ff',

        //new
        'agent-black':  '#000000ff',   // pure black – base background

  'agent-dark':   '#1c1816ff',   // dark brown-black (main background)

  'agent-card':   '#141110ff',   // slightly lifted from black (cards)

  'agent-header': '#0d0a09ff',   // near-black brown (header/nav)

  'agent-border': '#2a1f1bff',   // modern soft brown border (not harsh)

  'agent-white':  '#e8e1dcff',   // warm off-white (text, not pure white)

  'agent-silver': '#b7a8a1ff',   // muted brown-grey (secondary text)

  'agent-zinc':   '#3a2e29ff',   // dark brown-grey (inputs / dividers)

  'agent-dim':    '#ffffffcc',   // slightly transparent white (muted text)

  'agent-grid':   '#4a3a34ff'    // subtle brown grid / separators

        
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
