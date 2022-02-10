const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    // antd break points
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1600px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      primary: {
        DEFAULT: "#1A82FE",
      },
      secondary: {
        DEFAULT: "#272B4C",
      },
      gray: {
        DEFAULT: "#9295AF",
      },
      "sky-blue": {
        DEFAULT: "#272B4C",
      },
      yellow: {
        DEFAULT: "#FFAF02",
      },
      red: {
        DEFAULT: "#D53E4F",
      },
      "dove-gray": {
        DEFAULT: "#707070",
      },
      "light-gray": {
        DEFAULT: "#CFCCCC",
      },
    },
    fontFamily: {
      sans: ["Rubik", "system-ui"],
    },
    extend: {},
  },
  plugins: [],
};
