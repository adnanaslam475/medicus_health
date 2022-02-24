const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./src/**/*.{js, jsx, tsx}",
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
        1: "#8f95a7",
        2: "#707070",
        3: "#CFCCCC",
        4: "#F6F8FA",
        5: "#E7E9ED",
      },      
      lightBlue: {
        DEFAULT: "#ebf3ff",
        1: "#272B4C",
      },
      yellow: {
        DEFAULT: "#FFAF02",
      },
      cyan: {
        DEFAULT: "#30cec2",
      },
      red: {
        DEFAULT: "#D53E4F",
      },      

    },
    extend: {},
  },
  plugins: [],
};
