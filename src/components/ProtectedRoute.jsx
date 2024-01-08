import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './loader/LoadingSpinner';


const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [isContextInitialized, setContextInitialized] = useState(false);

  console.log('Protected route is mounted and working');

  useEffect(() => {
    setContextInitialized(true);
  }, []);

  // Render a loading state or null while the context is being initialized
  if (!isContextInitialized) {
    console.log('loading this state');
    return <LoadingSpinner />;
  }

  console.log('Rendering children. isLoggedIn:', isLoggedIn);
  return isLoggedIn || localStorage.getItem('token') ? <>{children}</> : <Navigate to="/login/customer" />;
};

export default ProtectedRoute;
