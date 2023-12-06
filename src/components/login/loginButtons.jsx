import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// image
import loginArt from "../../assets/login-art.png";

const LoginButtons = () => {
  const [selectedType, setSelectedType] = useState('');

  const location = useLocation();

  useEffect(() => {
    // This effect runs whenever the location changes (i.e., a link is clicked)
    // Set the selected type based on the current location
    if (location.pathname.startsWith('/login/')) {
      const type = location.pathname.substring('/login/'.length);
      setSelectedType(type.charAt(0).toUpperCase() + type.slice(1)); // Capitalize the first letter
    }
  }, [location.pathname]);

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  

  return (
    <div className="left">
        <img src={loginArt} alt="Company Logo" />

        <p>{selectedType && `${selectedType} Login Selected`}</p>
        <h5>Login as:</h5>

        <div className='buttons'>
            <Link to="/login/customer" onClick={() => handleTypeClick('Customer')}>
            <button>Customer</button>
            </Link>
            <Link to="/login/agent" onClick={() => handleTypeClick('Agent')}>
            <button>Agent(Sales Rep.)</button>
            </Link>
            <Link to="/login/agency" onClick={() => handleTypeClick('Agency')}>
            <button>Agency</button>
            </Link>
        </div>
    </div>
  )
}

export default LoginButtons;