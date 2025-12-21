/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
