import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let userData = localStorage.getItem("userData");
    if (userData && userData != "undefined") {
      userData = JSON.parse(localStorage.userData);
      setUser(userData);
    } else {
      console.log(userData);
      setUser({ loggedIn: false });
    }
    setLoaded(true);
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

  return [user,loaded, setAuth, removeAuth];
}
