import React from "react";

const AuthContext = React.createContext({
  user: {},
  setAuth: () => {},
  removeAuth: () => {}
});

export default AuthContext;
