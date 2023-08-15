/** @type {import('tailwindcss/defaultConfig')} */
module.exports = {
  content: [
    "./src/**/*.{js,vue,ts}",
    "./src/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        cyanCust: {
          100: "#76B1BD",
          200: "#2c3e50"
        }
      }
    },
  },
  plugins: [],
}