import React from "react";

const AuthContext = React.createContext({
  loaded: false,
  user: {},
  setAuth: () => {},
  removeAuth: () => {}
});

export default AuthContext;
