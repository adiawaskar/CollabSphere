import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    } else {
      localStorage.removeItem("userEmail");
    }
  }, [userEmail]);

  const logout = () => {
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ email: userEmail, setEmail: setUserEmail, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};