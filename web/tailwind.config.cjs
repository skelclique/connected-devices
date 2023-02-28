/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F2F3F5',
        secondary: '#121214',
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")(),
  ],
  darkMode: 'class',
}
