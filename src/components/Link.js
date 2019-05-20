import { styled } from "baseui";
import { Link } from "react-router-dom";

const StyledLink = styled(Link, ({ $theme }) => {
  const { colors, animation } = $theme;
  return {
    color: colors.linkText,
    textDecoration: "underline",
    transitionProperty: "color",
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    ":visited": {
      color: colors.linkVisited
    },
    ":hover": {
      color: colors.linkHover
    },
    ":active": {
      color: colors.linkActive
    }
  };
});

export default StyledLink;
