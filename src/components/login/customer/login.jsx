// src/Login.js
import React from 'react';
import '../login.scss';
import { Link } from 'react-router-dom';
import useLoginLogic from '../methods';
import LoginButtons from '../loginButtons';

// Icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Login = () => {
  const{
    userInput,
    error,
    isModalOpen,
    handleChange,
    closeModal,
    password_show_hide,
    useHandleLogin,
  } = useLoginLogic('https://realestate.api.sites.name.ng/auth/customers/login/');


  return (
    <div className="main--container">
        <div className="main--container-login">
          <LoginButtons />

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
              {/* <div className={`modal-backdrop ${isModalOpen ? 'fade show' : ''}`}></div> */}
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
};

export default Login;
