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
    selectedState,
    selectedCity,
    isModalOpen,
    error,
    handleStateClick,
    handleCityClick,
    handleChange,
    password_show_hide,
    confirmPassword_show_hide,
    handleSubmit,
    closeModal,
  } = useRegistrationMethod('https://realestate.api.sites.name.ng/auth/agents/signup/');

  return (
    <div className="register--container">    
      <div className="register--container-register">
        <Header/>

        {/* Modal */}
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


        {/* Bottom code */}
        <div className="bottom">
          <h2>Agent Register</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" id="first_name" name='first_name' value={formData.first_name} onChange={handleChange} placeholder='Firstname' required/>
            <input type="text" id="last_name" name='last_name' value={formData.last_name} onChange={handleChange} placeholder='Lastname' required/>
            <input type="text" id="street_address" name='street_address' value={formData.street_address} onChange={handleChange} placeholder='Street address' required/>              
            {/* State */}
            <div className="btn-group" >
              <button 
                className="btn btn-sm btn-dark dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="true"
              >
                {selectedState ? selectedState.name : 'Select State'}
              </button>

              <ul className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
                {data.map(state => (

                  <li 
                    key={state.state_code} 
                    className='dropdown-item' 
                    onClick={() => handleStateClick(state)}
                  >
                    {state.name}

                    {console.log(formData.state)}
                  </li>                    
                ))}
              </ul>
            </div>

            {/* City */}
            {selectedState && selectedState.towns && (
              <div className="btn-group"  aria-required="true">
                <button
                  className="btn btn-sm btn-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  {selectedCity ? selectedCity : 'Select City'}
                </button>

                <ul className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
                  {selectedState.towns.map((town) => (
                    <li 
                      key={town.name} 
                      className="dropdown-item" 
                      onClick={() => handleCityClick(town.name)}
                    >
                      {town.name}
                      {/* {console.log(town.name)} */}
                    </li>
                  ))}
                </ul>
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