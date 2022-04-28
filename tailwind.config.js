const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // antd break points
    screens: {
      xs: "360px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1600px",
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
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
        1: "#232643",
      },
      gray: {
        DEFAULT: "#9295AF",
        1: "#8f95a7",
        2: "#707070",
        3: "#CFCCCC",
        4: "#F6F8FA",
        5: "#E7E9ED",
        6: "#F4F4F8",
        7: "#E5E5E5",
        8: "#DEE2EA",
        9: "#E0EEFD",
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
        1: "#30CEC2",
      },
      red: {
        DEFAULT: "#D53E4F",
      },

    },
    extend: {},
  },
  plugins: [],
};
