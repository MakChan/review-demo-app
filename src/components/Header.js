import React, { useContext } from "react";
import { Link } from "react-router-dom";

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList
} from "baseui/header-navigation";
import { Button, KIND } from "baseui/button";

import TriangleDown from "baseui/icon/triangle-down";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";

import AuthContext from "../utils/authContext";

const ITEMS = [{ label: "Log out" }];

export default Header => {
  const auth = useContext(AuthContext);

  return (
    <HeaderNavigation>
      <NavigationList align={ALIGN.left}>
        <NavigationItem>
          <Link to="/">Review App</Link>
        </NavigationItem>
      </NavigationList>
      <NavigationList align={ALIGN.center} />
      {/* <NavigationList align={ALIGN.right}>
      <NavigationItem>
        <Link href="#">Tab Link One</Link>
      </NavigationItem>
    </NavigationList> */}
      <NavigationList align={ALIGN.right}>
        <NavigationItem>
          <StatefulPopover
            placement={PLACEMENT.bottomLeft}
            content={({ close }) => (
              <StatefulMenu
                items={ITEMS}
                onItemSelect={auth.removeAuth}
                overrides={{
                  List: { style: { width: "150px" } }
                }}
              />
            )}
          >
            <Button
              kind={KIND.secondary}
              endEnhancer={() => <TriangleDown size={24} />}
            >
              {auth.user.username}
            </Button>
          </StatefulPopover>
        </NavigationItem>
      </NavigationList>
    </HeaderNavigation>
  );
};
