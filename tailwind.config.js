/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0A192F',
        'primary-text': '#E6F1FF',
        'accent': '#64FFDA',
        'secondary-text': '#8892B0',
      },
    },
  },
  plugins: [],
}
