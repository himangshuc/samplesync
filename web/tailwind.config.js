/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fad6a5',
          300: '#f6b96d',
          400: '#f19232',
          500: '#ee760f',
          600: '#df5c09',
          700: '#b9440a',
          800: '#933610',
          900: '#772f10',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e2eae1',
          200: '#c5d5c4',
          300: '#9fb89e',
          400: '#769675',
          500: '#567856',
          600: '#436043',
          700: '#374d37',
          800: '#2e3f2e',
          900: '#273427',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
