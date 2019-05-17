import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import AuthContext from "./utils/authContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";

import Header from "./components/Header";

import useAuth from "./utils/useAuth";

import "./App.css";

const App = () => {
  const [user, setAuth, removeAuth] = useAuth();

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user,
          setAuth,
          removeAuth
        }}
      >
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <MainRoute path="/" component={Home} exact />
          <MainRoute path="/admin" component={AdminHome} exact />
        </Switch>
      </AuthContext.Provider>
    </Router>
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
            <main className="col-md-10 ml-auto p-4">
              <Header user={user} />
              <Suspense fallback={"Loading"}>
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
