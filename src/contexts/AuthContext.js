import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  console.log("AuthContext is mounted and working");

  useEffect(() => {
    console.log("isLoggedIn after state update:", isLoggedIn);
  }, [isLoggedIn]);

  const login = (userData) => {
    console.log("About to login");
    const { token, last_name } = userData;

    if (token) {
      localStorage.setItem('name', last_name);
      localStorage.setItem('token', token);
      setLoggedIn(prevState => !prevState);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    console.log("Login successful. isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    console.log("isLoggedIn after logout:", isLoggedIn); // Log the state after update
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // return useContext(AuthContext);
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
