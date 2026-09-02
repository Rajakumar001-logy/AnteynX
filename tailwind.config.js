/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rf: {
          dark: "#FFFFFF",      // Main background: pure crisp white
          navy: "#F8FAFC",      // Card/section background: slate-50 off-white
          card: "#FFFFFF",      // Card surface
          border: "#E2E8F0",    // Light slate border
          borderDark: "#CBD5E1", // Slightly darker border for focus
          cyan: "#0284C7",      // Crisp electric blue accent (cyan-600)
          blue: "#2563EB",      // Primary cobalt blue (blue-600)
          lightCyan: "#E0F2FE", // Soft blue badge background
          slate: "#475569"       // Slate body text
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-flow': 'wave 10s linear infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    },
  },
  plugins: [],
}
