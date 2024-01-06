// ProtectedRoute.js

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isContextInitialized, setContextInitialized] = useState(false);

  console.log('Protected route is mounted and working');

  useEffect(() => {
    setContextInitialized(true);
  }, []);

  useEffect(() => {
    console.log('isLoggedIn inside useEffect:', isLoggedIn);

    if (isContextInitialized && !isLoggedIn) {
      navigate('/login/customer');
    }
  }, [isContextInitialized, isLoggedIn, navigate]);

  // Render a loading state or null while the context is being initialized
  if (!isContextInitialized) {
    console.log('loading this state');
    return <LoadingSpinner />;
  }

  if (isLoggedIn) {
    console.log('Rendering children');
    return <>{children}</>;
  } else {
    console.log('The else statement in protected route is executed and the routing is not working correctly!');
    alert('Not logged in');
    return <Navigate to="/login/customer" />;
  }
};

export default ProtectedRoute;
