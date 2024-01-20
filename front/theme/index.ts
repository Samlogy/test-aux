import { extendTheme } from "@chakra-ui/react";

import { createBreakpoints } from "@chakra-ui/theme-tools";

export const colors = {
  white: "#fff",
  black: "#000",
  // notfications colors
  error: "#e53e3e",
  warning: "#deb055",
  success: "#38a169",
  info: "#3182ce",
  disable: "#718096",
  // color palette
  accent_1: "#22543d", //800
  accent_2: "#276749", // 700
  accent_3: "#2f855a", /// 600
  accent_4: "#38a169", // 500
  accent_5: "#48bb78", // 400
  accent_6: "#68d391", // 300
  // shades of gray
  gray_1: "#1A202C", //800
  gray_2: "#2D3748", // 700
  gray_3: "#4A5568", /// 600
  gray_4: "#718096", // 500
  gray_5: "#A0AEC0", // 400
  gray_6: "#A0AEC0", // 300
  gray_7: "#e2e8f0", // 200
  gray_8: "#edf2f7", // 100
  gray_9: "#f7fafc", // 50
};

export const breakpoints = createBreakpoints({
  // xs: "20em",
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
  "2xl": "90em",
});

export const fonts = {
  body: `'Poppins', sans-serif`,
  heading: `'Poppins', sans-serif`,
};

// import { colors, breakpoints, fonts } from "./utilities";

const theme = extendTheme({
  colors,
  breakpoints,
  fonts,
  components: {},
});

export default theme;
