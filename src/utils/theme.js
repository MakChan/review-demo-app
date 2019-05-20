import { createTheme, lightThemePrimitives } from "baseui";
import { primitives as darkThemePrimitives } from "baseui/themes/dark-theme-primitives";
import colors from "baseui/themes/dark-theme-colors.js";

const customColors = {
  primary: "#f7f1ff",
  primary50: "#e6d6ff",
  primary100: "#d0b0ff",
  primary200: "#bb8eff",
  primary300: "#a66efa",
  primary400: "#8a3ffc",
  primary500: "#4f2196",
  primary600: "#38146b",
  primary700: "#1e1033"
};

export const LightTheme = createTheme(
  {
    ...lightThemePrimitives,
    ...customColors
  },
  {
    name: "light-theme"
  }
);

export const DarkTheme = createTheme(
  {
    ...darkThemePrimitives,
    ...customColors
  },
  {
    name: "dark-theme",
    ...colors,
    ...customColors
  }
);
