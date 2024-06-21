/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this as needed
  ],
  theme: {
    extend: {
      colors: {
        primary: "#97ECCD",
        secondary: "#3CDC9E",
        accent: "#FEDC00",
      },
    },
  },
  plugins: [],
};
