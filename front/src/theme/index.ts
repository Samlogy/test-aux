import { extendTheme } from "@chakra-ui/react";

const colors = {
  accent: {
    1: "#7B341E",
    2: "#652B19",
  },
};

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
  "2xl": "90em",
};

const fonts = {
  body: `'Poppins', sans-serif`,
  heading: `'Poppins', sans-serif`,
};

const theme = extendTheme({
  colors,
  breakpoints,
  fonts,
  components: {},
});

export default theme;
