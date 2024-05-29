/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 4px 0px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}