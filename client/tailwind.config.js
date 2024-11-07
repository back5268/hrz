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
        sidebar: 'calc(100vh - 14rem)',
        bodyModal: 'calc(100vh - 16rem)',
      },
      colors: {
        primary: 'rgb(0, 98, 158)',
        onPrimary: 'rgb(255, 255, 255)',
        primaryContainer: 'rgb(207, 229, 255)',
        onPrimaryContainer: 'rgb(0, 29, 52)',
        secondary: 'rgb(82, 96, 112)',
        onSecondary: 'rgb(255, 255, 255)',
        secondaryContainer: 'rgb(213, 228, 247)',
        onSecondaryContainer: 'rgb(15, 29, 42)',
        tertiary: 'rgb(105, 87, 121)',
        onTertiary: 'rgb(255, 255, 255)',
        tertiaryContainer: 'rgb(240, 219, 255)',
        onTertiaryContainer: 'rgb(36, 21, 50)',
        error: 'rgb(186, 26, 26)',
        onError: 'rgb(255, 255, 255)',
        errorContainer: 'rgb(255, 218, 214)',
        onErrorContainer: 'rgb(65, 0, 2)',
        background: 'rgb(252, 252, 255)',
        onBackground: 'rgb(26, 28, 30)',
        surface: 'rgb(252, 252, 255)',
        onSurface: 'rgb(26, 28, 30)',
        surfaceVariant: 'rgb(222, 227, 235)',
        onSurfaceVariant: 'rgb(66, 71, 78)',
        outline: 'rgb(115, 119, 127)',
        outlineVariant: 'rgb(194, 199, 207)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(47, 48, 51)',
        inverseOnSurface: 'rgb(241, 240, 244)',
        inversePrimary: 'rgb(154, 203, 255)',
        elevation: {
          level0: 'transparent',
          level1: 'rgb(239, 244, 250)',
          level2: 'rgb(232, 240, 247)',
          level3: 'rgb(224, 235, 244)',
          level4: 'rgb(222, 234, 243)',
          level5: 'rgb(217, 230, 241)'
        },
        surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
        onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
        backdrop: 'rgba(44, 49, 55, 0.4)',
        border: 'rgba(0, 0, 0, 0.4)'
      },
      boxShadow: {
        custom: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
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
