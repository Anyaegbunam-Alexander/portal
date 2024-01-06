import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

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

//   if (isLoggedIn) {
//     console.log('Rendering children');
//     return <>{children}</>;
//   } else {
//     console.log('The else statement in protected route is executed and the routing is not working correctly!');
//     alert('Not logged in');
//     return <Navigate to="/login/customer" />;
//   }

  console.log('Rendering children. isLoggedIn:', isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login/customer" />;
};

export default ProtectedRoute;
