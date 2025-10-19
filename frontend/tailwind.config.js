/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
        colors: {
            'primary': '#4dbcb8ff',
            'secondary': '#f7e37fff',
            'textp': '#383535ff',
            'bcolor': '#f7e37fff',
        },
        fontFamily: {
            'sans': ['Helvetica', 'Arial', 'sans-serif'],
        },
        backgroundImage: {
            'bg': "url('/src/assets/background2.png')",
        },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

