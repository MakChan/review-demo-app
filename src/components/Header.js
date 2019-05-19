import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
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
import { Avatar } from "baseui/avatar";

import AuthContext from "../utils/authContext";

const ITEMS = [{ label: "Log out" }];

const Header = ({ history }) => {
  const auth = useContext(AuthContext);

  return (
    <HeaderNavigation>
      <NavigationList align={ALIGN.left}>
        <NavigationItem>
          <Link to="/">
            <Avatar name="Review App" size="scale900" src="" />
          </Link>
        </NavigationItem>
      </NavigationList>
      <NavigationList align={ALIGN.center} />
      <NavigationList align={ALIGN.right} style={{ paddingRight: "24px" }}>
        {auth.user.loggedIn ? (
          <>
            {auth.user.role == "ADMIN" ? (
              <NavigationItem>
                <Button
                  onClick={() => {
                    history.push("/admin");
                  }}
                >
                  Dashboard
                </Button>
              </NavigationItem>
            ) : (
              <NavigationItem>
                <Button
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                >
                  Dashboard
                </Button>
              </NavigationItem>
            )}
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
                  startEnhancer={() => (
                    <Avatar name={auth.user.username} size="scale800" src="" />
                  )}
                  endEnhancer={() => <TriangleDown size={24} />}
                >
                  {auth.user.username}
                </Button>
              </StatefulPopover>
            </NavigationItem>
          </>
        ) : (
          <>
            <NavigationItem>
              <Button
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>
            </NavigationItem>
            <NavigationItem>
              <Button
                kind={KIND.secondary}
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Sign up
              </Button>
            </NavigationItem>
          </>
        )}
      </NavigationList>
    </HeaderNavigation>
  );
};
export default withRouter(Header);
