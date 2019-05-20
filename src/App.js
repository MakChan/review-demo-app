import React, { Suspense, lazy } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import AuthContext from "./utils/authContext";
import ThemeContext from "./utils/themeContext";

import Home from "./pages/Home";
import Review from "./pages/Review";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Block from "./components/Block";

import useAuth from "./utils/useAuth";
import useTheme from "./utils/useTheme";

import { BaseProvider } from "baseui";
import { LightTheme, DarkTheme } from "./utils/theme";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ReviewerDashboard = lazy(() => import("./pages/ReviewerDashboard"));
const AddReview = lazy(() => import("./pages/AddReview"));

const App = () => {
  const [user, loaded, setAuth, removeAuth] = useAuth();
  const [theme, toggleTheme] = useTheme();

  if (!loaded) return <Loader />;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BaseProvider theme={theme === "light" ? LightTheme : DarkTheme}>
        <Block>
          <AuthContext.Provider
            value={{
              user,
              loaded,
              setAuth,
              removeAuth
            }}
          >
            <BrowserRouter>
              <Header />
              <Switch>
                <Route path="/login" component={Login} exact />
                <Route path="/signup" component={Signup} exact />
                <Route path="/" component={Home} exact />
                <MainRoute path="/admin" component={AdminDashboard} exact />
                <MainRoute
                  path="/dashboard"
                  component={ReviewerDashboard}
                  exact
                />
                <MainRoute path="/review/add" component={AddReview} exact />
                <MainRoute path="/review/:id" component={Review} exact />
              </Switch>
            </BrowserRouter>
          </AuthContext.Provider>
        </Block>
      </BaseProvider>
    </ThemeContext.Provider>
  );
};

const MainRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <AuthContext.Consumer>
        {({ user }) =>
          !user.loggedIn ? (
            <Redirect to={{ pathname: "/login" }} />
          ) : (
            <main>
              <Suspense fallback={<Loader />}>
                <Component {...props} user={user} />
              </Suspense>
            </main>
          )
        }
      </AuthContext.Consumer>
    )}
  />
);

export default App;
