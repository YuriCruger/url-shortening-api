/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        cyan: 'hsl(180, 66%, 49%)',
        dark_violet: 'hsl(257, 27%, 26%)',
        red: 'hsl(0, 87%, 67%)',
        gray: 'hsl(0, 0%, 75%)',
        grayish_violet: 'hsl(257, 7%, 63%)',
        very_dark_blue: 'hsl(255, 11%, 22%)',
        very_dark_violet: 'hsl(260, 8%, 14%)',
        gray_bg: '#F0F1F6',
        blue_hover: '#9BE3E2',
      }
    },
  },
  plugins: [],
}
