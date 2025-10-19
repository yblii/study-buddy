/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
        colors: {
            'primary': '#4dbcb8ff',
            'secondary': '#faeb6dff',
            'textp': '#383535ff',
            'textsec': '#514949ff',
            'primaryShadow': '#48b2aeff',
            'bcolor': '#ecca6cff',
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

