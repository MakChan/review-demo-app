import React from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  username: "",
  setUsername: () => {},
  setAuthenticated: () => {},
  removeAuth: () => {}
});

export default AuthContext;
