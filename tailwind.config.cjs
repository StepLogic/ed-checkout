/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1920px",
      "3xl": "2300px",
      max: "3500px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#fff",
      gray: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#EBEBEB",
        300: "#E3E3E3",
        400: "#D9D9D9",
        500: "#CFCFCF",
        600: "#A6A6A6",
        700: "#7D7D7D",
        800: "#525252",
        900: "#292929",
      },
      edu: {
        "light-blue": "#D9DAF3",
        100: "#D9DAF3",
        900: "#2D224C",
      },
    },
  },
  plugins: [],
};
