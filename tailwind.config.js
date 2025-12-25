/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#f5f0e1",
        brown: "#8b5e3c",
        gold: "#d4af37",
      },
      boxShadow: {
        premium: "0 10px 25px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
