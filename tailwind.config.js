/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        greenColor: "#4fc961",
        blueColor: "#3b82f6",
        redColor: "#fb7185",
        orangeColor: "#FFAC1C",
        "background-color": "rgb(var(--background-color) / <alpha-value>)",
        "blocks-color": "rgb(var(--blocks-color) / <alpha-value>)",
        "primary-text": "rgb(var(--primary-text) / <alpha-value>)",
        "secondary-text": "rgb(var(--secondary-text) / <alpha-value>)",
        "light-text": "rgb(var(--light-text-rgb) /<alpha-value>)",
        "error-text": "rgb(var(--error-text) / <alpha-value>)",
        "interactive-text": "rgb(var(--interactive-text) / <alpha-value>)",
        "disabled-text": "rgb(var(--disabled-text) / <alpha-value>)",
        mainBorder: "rgb(var(--border-color) / <alpha-value>)",
        blueColorAlpha: "rgb(var(--second-color-rgb) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

