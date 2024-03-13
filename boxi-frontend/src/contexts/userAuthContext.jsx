import React, { useState, useContext, createContext } from "react";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  console.log("UserAuthProvider - Start"); // Log when the provider starts

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("UserAuthProvider - End"); // Log when the provider ends

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  console.log("useUserAuth - Start"); // Log when the custom hook starts
  const contextValue = useContext(UserAuthContext);
  console.log("useUserAuth - End"); // Log when the custom hook ends
  return contextValue;
};
