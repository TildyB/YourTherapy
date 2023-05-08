import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [clientsub, setClientsub] = useState(null);

  const checkLogin = () => {
    if (localStorage.getItem("token")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setClientsub(localStorage.getItem("clientSub"));
      return true;
    } else {
      return false;
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogin);

  const login = (user, token) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, isLoggedIn, clientsub, setClientsub }}
    >
      {children}
    </UserContext.Provider>
  );
};
