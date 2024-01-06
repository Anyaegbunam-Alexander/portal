// LoadingSpinner.js

import React from 'react';
import './LoadingSpinner.css'; // Import your CSS file for styling

// const YourComponent = () => {
//   // Your logic to determine if loading state should be shown
//   const isLoading = true; // Change this based on your actual loading condition

//   // Return a loading state or loader component
//   return isLoading ? <LoadingSpinner /> : <YourContentComponent />;
// };


const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
