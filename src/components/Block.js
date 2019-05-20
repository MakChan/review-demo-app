import { styled } from "baseui";

const StyledBlock = styled("div", ({ $theme }) => {
  const styleOverride = {};

  if ($theme.name.startsWith("dark")) {
    styleOverride.background = $theme.colors.background;
  }
  return {
    ...styleOverride,
    minHeight: "100vh"
  };
});

export default StyledBlock;
