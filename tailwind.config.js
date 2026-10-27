/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Sleek Gunmetal & Titanium Grey palette
        charcoal: {
          950: '#080A0E',
          900: '#0F1217',
          850: '#141822',
          800: '#1C222E',
          750: '#252D3C',
          700: '#2F394A',
          600: '#434F66',
          500: '#5E6D8A',
          400: '#8A99B4',
          300: '#B5C1D5',
          200: '#D9E1ED',
        },
        grey: {
          950: '#080A0E',
          900: '#0F1217',
          850: '#141822',
          800: '#1C222E',
          750: '#252D3C',
          700: '#2F394A',
          600: '#434F66',
          500: '#5E6D8A',
          400: '#8A99B4',
          300: '#B5C1D5',
          200: '#D9E1ED',
          100: '#F1F5F9',
        },
        // Cyber Neon Yellow & Amber Accents
        yellow: {
          neon: '#FFE600',
          electric: '#FFD600',
          glow: '#FFF01F',
          amber: '#F59E0B',
          gold: '#EAB308',
          light: '#FEF08A',
        },
        neon: {
          yellow: '#FFE600',
          electric: '#FFD600',
          amber: '#F59E0B',
          glow: '#FFF01F',
          green: '#FFE600', // mapped to yellow for seamless compatibility
          cyan: '#FFD600',
          lime: '#FFE600',
        },
        emerald: {
          accent: '#FFE600', // Mapped to Cyber Electric Yellow
          electric: '#FFD600',
          glow: '#D97706',
        },
        cyan: {
          accent: '#FFE600',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      boxShadow: {
        'glow-yellow': '0 0 25px rgba(255, 230, 0, 0.45)',
        'glow-yellow-lg': '0 0 50px rgba(255, 230, 0, 0.55), 0 0 100px rgba(245, 158, 11, 0.25)',
        'glow-emerald': '0 0 25px rgba(255, 230, 0, 0.45)',
        'glow-emerald-lg': '0 0 50px rgba(255, 230, 0, 0.55), 0 0 100px rgba(245, 158, 11, 0.25)',
        'neon-yellow': '0 0 20px rgba(255, 230, 0, 0.5), inset 0 0 10px rgba(255, 230, 0, 0.2)',
        'neon-green': '0 0 20px rgba(255, 230, 0, 0.5), inset 0 0 10px rgba(255, 230, 0, 0.2)',
        'neon-cyan': '0 0 25px rgba(255, 214, 0, 0.5), inset 0 0 10px rgba(255, 214, 0, 0.2)',
        'neon-card': '0 8px 32px 0 rgba(0, 0, 0, 0.7), 0 0 18px -2px rgba(255, 230, 0, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'neon-flicker': 'neonFlicker 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 8px rgba(255, 230, 0, 0.8))'
          },
          '20%, 24%, 55%': {
            opacity: '0.7',
            filter: 'none'
          }
        }
      }
    },
  },
  plugins: [],
}
