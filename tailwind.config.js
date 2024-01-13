/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {

        'dark': {
          50: '#EEEEEE',
          100: '#B4B4B4',
          200: '#7B7B7B',
          300: '#6E6E6E',
          400: '#3A3A3A',
          500: '#313131',
          600: '#2A2A2A',
          700: '#222222',
          800: '#191919',
          900: '#111111',
        },

        'primary': '#94D6C6',
        'secondary': '#267D67',
        'accent': '#44D5B0',

        'basePrimary': '#000000',
        'basePrimaryHover': '#181818',
        'baseSecondary': '#16181C',
        'baseSecondaryHover': '#1D1F23',

        'textPrimary': '#E7E9EA',
        'textSecondary': '#71767B'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      screens: {
        'sm': '550px',
        'md': '800px',
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],  
}
