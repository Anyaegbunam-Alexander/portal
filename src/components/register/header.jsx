import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
  return (
    <div className="top">
      <h2>Company X</h2>
      <p>Real estate at it's best</p>
      <span>Register as an:</span>

      <div className='buttons'>
        <Link to="/register/customer">
          <button>Customer</button>
        </Link>
        <Link to="/register/agent">
          <button>Agent(Sales Rep.)</button>
        </Link>
        <Link to="/register/agency">
          <button>Agency</button>
        </Link>
      </div>
    </div>
  )
}

export default header