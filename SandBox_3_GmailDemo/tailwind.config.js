/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gmail-red": "#c71610",
        "gmail-blue": "#3e65cf",
        "gmail-blue-dark": "#3b60c4",
        "gmail-yellow": "#f2a60c",
        "gmail-green": "#08851b",

      },
      fontFamily: {
        "gmail": ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}

