// AppContext.js
import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      {children}
    </AppContext.Provider>
  );
};
