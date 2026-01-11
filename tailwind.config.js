/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Refined zinc-based backgrounds
        'base': '#09090b',
        'surface-1': '#18181b',
        'surface-2': '#27272a',
        'surface-3': '#3f3f46',
        
        // Accent colors (sophisticated indigo/violet)
        primary: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
        },
        
        // Semantic colors (muted & elegant)
        success: {
          DEFAULT: '#22c55e',
          bg: '#166534',
        },
        warning: {
          DEFAULT: '#f59e0b',
          bg: '#78350f',
        },
        error: {
          DEFAULT: '#ef4444',
          bg: '#7f1d1d',
        },
        info: {
          DEFAULT: '#3b82f6',
          bg: '#1e3a8a',
        },
        
        // Text hierarchy
        'text-primary': '#fafafa',
        'text-secondary': '#a1a1aa',
        'text-muted': '#71717a',
        'text-disabled': '#52525b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(99, 102, 241, 0.1)',
        'glow-secondary': '0 0 20px rgba(139, 92, 246, 0.1)',
        'subtle': '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
      transitionDuration: {
        'smooth': '150ms',
      },
    },
  },
  plugins: [],
}
