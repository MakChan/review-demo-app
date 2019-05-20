import { styled } from "baseui";
import { Link } from "react-router-dom";
import { customColors } from "../utils/theme";

const StyledLink = styled(Link, ({ $theme }) => {
  const { colors, animation } = $theme;
  const commonStyles = {
    textDecoration: "underline",
    transitionProperty: "color",
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve
  };

  if ($theme.name.startsWith("dark")) {
    return {
      ...commonStyles,
      color: customColors.primary300,
      ":visited": {
        color: customColors.primary300
      },
      ":hover": {
        color: customColors.primary400
      },
      ":active": {
        color: customColors.primary400
      }
    };
  }

  return {
    ...commonStyles,
    color: colors.linkText,
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
