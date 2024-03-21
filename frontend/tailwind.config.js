/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    light: {
      colors: {
        primary: "#007bff",
        secondary: "#ffc107",
        gray: "#333", // Adjust as needed for light theme
        text: "#000", // Adjust as needed for light theme
        // ...other colors
      },
    },
    dark: {
      colors: {
        primary: "#007bff",
        secondary: "#ffc107",
        gray: "#fff", // Adjust as needed for dark theme
        text: "#333", // Adjust as needed for dark theme
        // ...other colors
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
