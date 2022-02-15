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
      darkGray: {
        DEFAULT: "#8f95a7",
      },
      skyBlue: {
        DEFAULT: "#272B4C",
      },
      lightBlue: {
        DEFAULT: "#ebf3ff",
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
      doveGray: {
        DEFAULT: "#707070",
      },
      lightGray: {
        DEFAULT: "#CFCCCC",
      },

    },
    // fontFamily: {
    //   sans: ['Circular Std', "system-ui"],
    // },

    extend: {},
  },
  plugins: [],
};
