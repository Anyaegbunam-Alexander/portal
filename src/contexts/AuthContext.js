import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = (userData) => {
    console.log("About to login");
    const { token, last_name } = userData;

    if (token) {
      localStorage.setItem('name', last_name);
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  useEffect(() => {
    console.log("isLoggedIn after state update:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
