/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        "light-bg": "#F9F9F9",
        "light-primary": "#5C9AFF",
        "light-text": "#333333",
        "light-secondary-text": "#666666",
        "light-completed": "#A0A0A0",
        "light-button": "#FFBC42",
        "light-border": "#E0E0E0",
        "light-hover": "#2A2A2A",

        // Dark theme colors
        "dark-bg": "#1E1E1E",
        "dark-primary": "#D1E6FF",
        "dark-text": "#E0E0E0",
        "dark-secondary-text": "#B0B0B0",
        "dark-completed": "#555555",
        "dark-button": "#FFA500",
        "dark-border": "#333333",
        "dark-hover": "#2A2A2A",
      },
    },
  },
  plugins: [],
};
