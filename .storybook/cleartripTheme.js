import { create } from "@storybook/theming";

import { ReactComponent as Logo } from "./PWALibrary.svg";

const theme = create({
  // Is this a 'light' or 'dark' theme?
  base: "dark",

  // Color palette
  colorPrimary: "black", // primary color
  colorSecondary: "#F66826", // secondary color

  // // UI
  // appBg: "black",
  // appContentBg: "grey",
  // appBorderColor: "rgba(0,0,0,.1)",
  // appBorderRadius: 4,

  // Fonts
  fontBase: "sans-serif",
  fontCode: "Monaco, monospace"

  // // Text colors
  // textColor: "#FFFFFF",
  // textInverseColor: "#333333",

  // // Toolbar default and active colors
  // barTextColor: "#999999",
  // barSelectedColor: "blue",
  // barBg: "white",

  // // Form colors
  // inputBg: "white",
  // inputBorder: "rgba(0,0,0,.1)",
  // inputTextColor: "#333333",
  // inputBorderRadius: 4,
});

export default theme;
