import React from "react";

const AuthContext = React.createContext({
  theme: "light",
  toggleTheme: () => {}
});

export default AuthContext;
