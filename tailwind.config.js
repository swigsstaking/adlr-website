/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette ADLR Cosmetic Auto - Light Theme
        // Main accent is beige/sand, text is black, backgrounds are white/cream
        primary: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#ebe7e0',
          300: '#D8D2C6',
          400: '#c4baa8',
          500: '#a89d8a',
          600: '#8c806c',
          700: '#706654',
          800: '#544c3f',
          900: '#38332a',
        },
        sand: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#ebe7e0',
          300: '#D8D2C6',
          400: '#c4baa8',
          500: '#a89d8a',
          600: '#8c806c',
          700: '#706654',
          800: '#544c3f',
          900: '#38332a',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#FAFAF8',
          300: '#F5F5F3',
          400: '#EEEEEC',
          500: '#E5E5E3',
        },
        dark: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#bdbdbd',
          300: '#9e9e9e',
          400: '#757575',
          500: '#616161',
          600: '#424242',
          700: '#303030',
          800: '#1a1a1a',
          900: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
