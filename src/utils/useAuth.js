import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let userData = localStorage.getItem("userData");
    if (userData && userData != "undefined") {
      userData = JSON.parse(localStorage.userData);
      setUser(userData);
    } else setUser({ loggedIn: false });
  }, []);

  const setAuth = (username, role) => {
    localStorage.setItem(
      "userData",
      JSON.stringify({ loggedIn: true, username, role })
    );

    setUser({ loggedIn: true, username, role });
  };
  const removeAuth = () => {
    localStorage.removeItem("userData");
    setUser({ loggedIn: false });
  };

  return [user, setAuth, removeAuth];
}
