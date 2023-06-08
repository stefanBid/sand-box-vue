/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    /* My Screen dimension */
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1200px'},
      'md': {'max': '991px'},
      'sm': {'max': '768px'},
    },
    extend: {
      fontFamily:{
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'percent-sm': '60%',
        'percent-base': '70%',
      }
    },
  },
  plugins: [],
}

