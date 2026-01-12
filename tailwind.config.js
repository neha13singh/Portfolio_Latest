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
      
  'agent-black':  '#000000ff',   // true black (base)

  'agent-dark':   '#0e0c0bff',   // main background (very dark brown-black)

  'agent-card':   '#151211ff',   // cards (slightly lifted)

  'agent-header': '#0b0908ff',   // header / top bar (near black)

  'agent-border': '#2a211dff',   // soft brown border (less visible)

  'agent-white':  '#e6dfd9ff',   // warm off-white (text)

  'agent-silver': '#b5aaa3ff',   // muted secondary text

  'agent-zinc':   '#3a302cff',   // dividers / inputs

  'agent-dim':    '#ffffffcc',   // dim text (unchanged)

  'agent-grid':   '#4a3f39ff'    // subtle grid / separators



        
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
