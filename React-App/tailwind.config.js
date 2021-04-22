const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightblue: colors.lightBlue,
        orange: colors.orange,
        lime: colors.lime,
        teal: colors.teal,
        fuchsia: colors.fuchsia,
        rose: colors.rose
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
