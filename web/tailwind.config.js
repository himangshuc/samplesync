/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2B4B',
          50:  '#eef1f8',
          100: '#d5dce8',
          200: '#aab9d2',
          300: '#7f96bb',
          400: '#5473a5',
          500: '#29508e',
          600: '#213e70',
          700: '#1B2B4B',
          800: '#131f38',
          900: '#0d1526',
        },
        lime: {
          DEFAULT: '#7EE87E',
          400: '#a7f3a7',
          500: '#7EE87E',
          600: '#5cd65c',
        },
      },
      fontFamily: {
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'marquee-left': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'marquee-left':       'marquee-left 30s linear infinite',
        'marquee-left-slow':  'marquee-left 50s linear infinite',
        'marquee-right':      'marquee-right 30s linear infinite',
        'marquee-right-slow': 'marquee-right 50s linear infinite',
      },
    },
  },
  plugins: [],
};
