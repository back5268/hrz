/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      height: {
        sidebar: 'calc(100vh - 14rem)'
      },
      colors: {
        primary: '#673AB7',
        border: 'rgba(0, 0, 0, 0.38)',
      },
      boxShadow: {
        custom: 'rgba(0, 0, 0, 0.2) 0px 5px 15px'
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-20%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        progress: 'progress 0.6s ease-in-out forwards'
      }
    }
  },
  plugins: []
};
