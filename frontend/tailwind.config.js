/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-x-dark': '#121221',
        'primary-dark': '#242440',
        'primary-trans-dark': 'rgba(1, 4, 33, 0.7)',
        'primary-blue': '#4A6FA5',
        'primary-trans-blue': 'rgba(74, 111, 165, 0.2)',
        'secondary-dore': '#B8A65D',
        'secondary-light-dore': 'rgba(184, 166, 93, 0.4)',
        'secondary-ivory': '#F8F8F2',
        'secondary-argent': '#C5C5C5',
      },
    },
  },
  plugins: [],
}

