import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = (userData) => {
    console.log("About to login");
    const { token, last_name, first_name } = userData;

    if (token) {
      localStorage.setItem('firstname', first_name);
      localStorage.setItem('lastname', last_name);
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/login/customer');
  };

  useEffect(() => {
    console.log("isLoggedIn after state update:", isLoggedIn);
  }, [isLoggedIn]);

  // Make sure to return an object instead of directly updating the state
  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
