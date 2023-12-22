// ExampleComponent.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const redirectToDashboard = (url) => {
    // Redirect to the specified URL
    window.location.href = url;
};

const Logout = () => {
  const { isLoggedIn, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    // Call the logout function from the context
    logout();
    // Redirect to the specified URL using React Router
    history.push('/login/customer');
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Logout;
