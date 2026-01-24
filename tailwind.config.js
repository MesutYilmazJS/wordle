/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wordle-correct': '#10b981', // Emerald 500
        'wordle-present': '#f59e0b', // Amber 500
        'wordle-absent': '#334155',  // Slate 700
        'wordle-gray': '#475569',    // Slate 600
        'dark-bg': '#0f172a',        // Slate 900
        'dark-surface': '#1e293b',   // Slate 800
      },
      animation: {
        'pop': 'pop 0.1s ease-in-out forwards',
        'flip-in': 'flip-in 0.6s ease-in-out forwards',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '40%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'flip-in': {
          '0%': { transform: 'rotateX(0deg)', borderColor: 'gray' },
          '45%': { transform: 'rotateX(90deg)', borderColor: 'gray' },
          '55%': { transform: 'rotateX(90deg)', borderColor: 'transparent' }, // color change happens in JS delay usually, but visual flip is good
          '100%': { transform: 'rotateX(0deg)' },
        }
      }
    },
  },
  plugins: [],
}
