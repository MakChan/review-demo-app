import { createTheme, lightThemePrimitives } from "baseui";

export const LightTheme = createTheme(
  {
    ...lightThemePrimitives,
    primary50: "#EDF3FE",
    primary100: "#D2E0FC",
    primary200: "#9CBCF8",
    primary300: "#548BF4",
    primary400: "#276EF1",
    primary500: "#174EB6",
    primary600: "#123D90",
    primary700: "#0C2960"
    // primaryFontFamily: '"Comic Sans MS", cursive, sans-serif'
  },
  {
    animation: {
      timing100: "0.50s"
    }
  },
  // {
  //   Spinner: {
  //     style: ({ $theme }) => ({ color: $theme.colors.primary700 })
  //   }
  // }
);
