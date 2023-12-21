import React from 'react';
import '../register.scss';
import { Link } from 'react-router-dom';
import useRegistrationMethod from '../methods';
import Header from '../header';
//import Popup from '../Popup';


//Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const CustomerRegistration = () => {
  const {
    data,
    formData,
    isStateDropdownOpen,
    isCityDropdownOpen,
    selectedState,
    selectedCity,
    isModalOpen,
    //errors,
    error,
    toggleStateDropdown,
    toggleCityDropdown,
    handleStateClick,
    handleCityClick,
    handleChange,
    password_show_hide,
    confirmPassword_show_hide,
    handleSubmit,
    closeModal,
  } = useRegistrationMethod('https://realestate.api.sites.name.ng/auth/customers/signup/');



  return (  

    <div className="register--container">    
      <div className="register--container-register">
        <Header/>

        {/* <Popup/> */}

        {/* Error Modal */}
        {isModalOpen && (
          <div>
            <div className='modal' tabIndex="-1" role="dialog" style={{display: 'block'}}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Error</h5>
                    <button type="button" className="btn-close" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body">
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </div>
        )}


        {/* Bottom code */}
        <div className="bottom">
          <h2>Customer Register</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" id="first_name" name='first_name' value={formData.first_name} onChange={handleChange} placeholder='Firstname' required/>
            {error.first_name && <p className="error-message">{error.first_name}</p>}
            <input type="text" id="last_name" name='last_name' value={formData.last_name} onChange={handleChange} placeholder='Lastname' required/>
            <input type="text" id="street_address" name='street_address' value={formData.street_address} onChange={handleChange} placeholder='Street address' required/>


            {/* Select State */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={toggleStateDropdown}
                id="options-menu"
                aria-expanded={isStateDropdownOpen}
              >
                {selectedState ? selectedState.name : 'Select State'}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className={`origin-top-left relative -mt-3 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                  isStateDropdownOpen ? '' : 'hidden'
                }`}
                id="dropdown-menu"
              >
                <ul className="py-2 scrollable-menu" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {data.map(state => (

                        <li 
                            key={state.state_code} 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => handleStateClick(state)}
                        >
                            {state.name}

                            {console.log(formData.state)}
                        </li>
                                           
                    ))}
                </ul>
              </div>
            </div>


            {/* City */}
            {selectedState && selectedState.towns && (
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm -mt-56 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  onClick={toggleCityDropdown}
                  id="options-menu"
                  aria-expanded={isCityDropdownOpen}
                >
                  {selectedCity ? selectedCity : 'Select City'}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  className={`origin-top-left relative -mt-3 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                    isCityDropdownOpen ? '' : 'hidden'
                  }`}
                  id="dropdown-menu"
                >
                  <ul className="py-1 scrollable-menu" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {selectedState.towns.map((town) => (
                      <li 
                        key={town.name} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => handleCityClick(town.name)}
                      >
                        {town.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}


            <input type="email" id="login-email" name='email' value={formData.email} onChange={handleChange} placeholder='Email' required/>
            {error.email && <p className="error-message">{error.email}</p>}
            <input type="tel" id="phone-number" name='phone_number' value={formData.phone_number} onChange={handleChange} placeholder='Phone number' required/>
            {/* password functionality */}
            <div className="password-field">
              <input type="password" className='password' id="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password' required/>
              <div className="input-group-append">
                <span className="input-group-text" onClick={password_show_hide}>
                  <VisibilityIcon id="show_eye"/>
                  <VisibilityOffIcon id="hide_eye" style={{display: 'none'}}/>
                </span>
              </div>
            </div>
            {/* confirm password functionality */}
            <div className="password-field">
            <input type="password" className='password' id="confirm_password" name='confirm_password' value={formData.confirm_password} onChange={handleChange} placeholder='Confirm Password' required/>
              <div className="input-group-append">
                <span className="input-group-text" onClick={confirmPassword_show_hide}>
                  <VisibilityIcon id="CP_show_eye"/>
                  <VisibilityOffIcon id="CP_hide_eye" style={{display: 'none'}}/>
                </span>
              </div>
            </div>

            <div className="register-checkbox" value={formData.agreement} onChange={handleChange}>
              <input type="checkbox" id="register-remember" required value={formData.agreement}/>
              <label htmlFor="register-remember">
                I agree to the Terms and Conditions.
              </label>
            </div>

            <button type="submit">Register</button>

            <p>
              Already a user?
              <Link to="/login/customer">
                <span>Sign in</span>
              </Link>  
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegistration;