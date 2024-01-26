import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = (userData) => {
    const { token, last_name, first_name, email, name } = userData;

    if (token) {
      localStorage.setItem('firstname', first_name);
      localStorage.setItem('lastname', last_name);
      localStorage.setItem('email', email);
      localStorage.setItem('agencyName', name);
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const logout = () => {
    const role = localStorage.getItem('role');
    navigate(`/login/${role}`);
    
    localStorage.clear();
    setLoggedIn(false);
  };

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
