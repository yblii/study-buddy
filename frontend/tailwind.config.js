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
            'text-primary': '#383535ff',
        },
        fontFamily: {
            'sans': ['Helvetica', 'Arial', 'sans-serif'],
        },
        backgroundImage: {
            'bg': "url('/src/assets/background.png')",
        },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

