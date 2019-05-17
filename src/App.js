import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

import { Spinner } from "baseui/spinner";

import AuthContext from "./utils/authContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Review from "./pages/Review";
import AddReview from "./pages/AddReview";

import Header from "./components/Header";

import useAuth from "./utils/useAuth";

import "./App.css";

const App = () => {
  const [user, loaded, setAuth, removeAuth] = useAuth();

  if (!loaded) return <Spinner />;

  return (
    <AuthContext.Provider
      value={{
        user,
        loaded,
        setAuth,
        removeAuth
      }}
    >
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <MainRoute path="/" component={Home} exact />
        <MainRoute path="/admin" component={AdminHome} exact />
        <MainRoute path="/review/add" component={AddReview} exact />
        <MainRoute path="/review/:id" component={Review} exact />
      </Switch>
    </AuthContext.Provider>
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
            <>
              <Header />
              <main>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} user={user} />
                </Suspense>
              </main>
            </>
          )
        }
      </AuthContext.Consumer>
    )}
  />
);

export default withRouter(App);
