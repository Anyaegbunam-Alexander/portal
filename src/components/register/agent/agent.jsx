import React from 'react';
import '../register.scss';
import { Link } from 'react-router-dom';
import useRegistrationMethod from '../methods';
import Header from '../header';

//Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Agent = () => {

  const {
    data,
    formData,
    isStateDropdownOpen,
    isCityDropdownOpen,
    selectedState,
    selectedCity,
    error,
    isPopupOpen, 
    toggleStateDropdown,
    toggleCityDropdown,
    handleStateClick,
    handleCityClick,
    handleChange,
    password_show_hide,
    confirmPassword_show_hide,
    handleSubmit,
    closePopup,
  } = useRegistrationMethod('https://realestate.api.sites.name.ng/auth/agents/signup/');

  return (
    <div className="register--container">    
      <div className="register--container-register">
        <Header/>

        {/* Error Popup */}
        {isPopupOpen && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* Heroicon name: outline/exclamation */}
                      <svg
                        className="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6-6h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V11a2 2 0 012-2z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Error</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Bottom code */}
        <div className="bottom">
          <h2>Agent Register</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" id="first_name" name='first_name' value={formData.first_name} onChange={handleChange} placeholder='Firstname' required/>
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
  )
}

export default Agent;