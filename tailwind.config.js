/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0f',
          card: '#12121a',
          elevated: '#1a1a2e',
          border: '#2a2a3e',
        },
        primary: {
          DEFAULT: '#8b5cf6',
          light: '#a855f7',
          dark: '#7c3aed',
        },
        secondary: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
        },
        accent: {
          pink: '#ec4899',
          'pink-light': '#f472b6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
