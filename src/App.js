import React, { useState, Suspense } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// import auth from "./utils/auth";
import AuthContext from "./utils/authContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";

import "./App.css";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState();
  const removeAuth = () => {
    localStorage.removeItem("loginStatus");
    setAuthenticated(false);
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          username,
          setUsername,
          isAuthenticated,
          setAuthenticated,
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
        {({ isAuthenticated }) =>
          !isAuthenticated ? (
            <Redirect to={{ pathname: "/login" }} />
          ) : (
            <main className="col-md-10 ml-auto p-4">
              <Suspense fallback={"Loading"}>
                <Component {...props} />
              </Suspense>
            </main>
          )
        }
      </AuthContext.Consumer>
    )}
  />
);

export default App;
