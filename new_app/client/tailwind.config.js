/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_color: '#6b705c',
        btn_color: '#cb997e',
        primary_light: '#a5a58d',
        btn_light: '#ddbea9',
        shop_color: '#4e006e',
        hover_color: "#5b5e4f",
        shop_white: '#fff',
        shop_black: '#000'
      }
    },
  },
  plugins: [],
}

