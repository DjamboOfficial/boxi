import React, { createContext, useContext, useState } from "react";

const ArtisanAuthContext = createContext();

export const ArtisanAuthProvider = ({ children }) => {
  const [artisan, setArtisan] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [artisanIsLoggedIn, setArtisanIsLoggedIn] = useState(false);

  return (
    <ArtisanAuthContext.Provider
      value={{
        artisan,
        setArtisan,
        username,
        setUsername, // Include setUsername in the context's value
        password,
        setPassword,
        email,
        setEmail,
        artisanIsLoggedIn,
        setArtisanIsLoggedIn,
      }}
    >
      {children}
    </ArtisanAuthContext.Provider>
  );
};

export const useArtisanAuth = () => {
  const artisanContextValue = useContext(ArtisanAuthContext);
  return artisanContextValue;
};
