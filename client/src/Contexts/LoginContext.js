import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const value = { loggedIn, setLoggedIn };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContext;
