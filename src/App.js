import React, { Suspense } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import AuthContext from "./utils/authContext";
import ThemeContext from "./utils/themeContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import Review from "./pages/Review";
import AddReview from "./pages/AddReview";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Block from "./components/Block";

import useAuth from "./utils/useAuth";
import useTheme from "./utils/useTheme";

import { BaseProvider } from "baseui";
import { LightTheme, DarkTheme } from "./utils/theme";

import "./App.css";

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
