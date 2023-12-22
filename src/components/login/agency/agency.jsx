import React from 'react';
import '../login.scss';
import LoginButtons from '../loginButtons';
import useLoginLogic from '../methods';
import { Link } from 'react-router-dom';

// Icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Agency = () => {
  const{
    userInput,
    error,
    isPopupOpen,
    closePopup,
    handleChange,
    password_show_hide,
    useHandleLogin,
  } = useLoginLogic('https://realestate.api.sites.name.ng/auth/agencies/login/');

  return (
    <div className="main--container">
        <div className="main--container-login">
          <LoginButtons />

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
          
          <div className="right">
            {/* Social signin */}
            <div className="right--social-signin">
              <p>Sign in with</p>
              <div className='right--social-signin-icons'>
                <button><FacebookRoundedIcon /></button>
                <button><TwitterIcon /></button>
                <button><GoogleIcon/></button>
              </div>
            </div>

            <h4>OR</h4>
            
            <form onSubmit={useHandleLogin}>
              <input type="email" id="login-email" name='email' onChange={handleChange} value={userInput.email} placeholder='Email' required/>

              {/* password functionality */}
              <div className="password-field">
                <input type="password" className='password' id="password" name='password' onChange={handleChange} value={userInput.password} placeholder='Password' required/>
                <div className="input-group-append">
                  <span className="input-group-text" onClick={password_show_hide}>
                    <VisibilityIcon id="show_eye"/>
                    <VisibilityOffIcon id="hide_eye" style={{display: 'none'}}/>
                  </span>
                </div>
              </div>

              <div className="login--confirm">
                <div className="login--confirm-checkbox">
                  <input type="checkbox" id="login-remember"/>
                  <label htmlFor="login-remember"> Remember me.</label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              <button type="submit">Login</button>

              <p>
                Don't have an account?  
                <Link to="/register/customer">
                  <span>Register</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
    </div>
  );
}

export default Agency