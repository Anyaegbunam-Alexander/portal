import { useState, useEffect}  from 'react';

const useRegistrationMethod = (apiEndpoint) => {
    /*
      code to select state and City from a third party API which I got from this link
      https://bensonarafat.medium.com/using-the-nigeria-state-town-and-local-government-api-d73451696c54
    */
    const [data, setData] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const [isCityDropdownOpen, setisCityDropdownOpen] = useState(false)
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    // New function to set errors
    const setErrors = (newError) => {
      setError(newError);
    };

  
    //Fetches the API for state and city dynamically
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://nigeria-states-towns-lga.onrender.com/api/all');
          const result = await response.json();
          setData(result);
          
          console.log(result[20]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    //Hadle form data i.e user input
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      street_address: '',
      country: 'Nigeria',
      state: '',
      city: '',
      email: '',
      phone_number: '',
      password: '',
      confirm_password: '',
      cac_document: null,
      identification: null,
      link: '',
      name: '', //name of agency
      agreement: true,
    });
    
  
  
    //Handle change in the values of user's input
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));

      // Clear the error for the current field when the user types
      setErrors({ ...error, [e.target.name]: '' });
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0]
      setFormData((prevFormData) => ({
        ...prevFormData,
        cac_document: file,
        identification: file
      }));
    };

    const toggleStateDropdown = () => {
      setisCityDropdownOpen(false)
      setIsStateDropdownOpen(!isStateDropdownOpen);
    };

    const toggleCityDropdown = () => {
      setisCityDropdownOpen(!isCityDropdownOpen);
      setIsStateDropdownOpen(false);
    };
  
    // Handle state selection
    const handleStateClick = (state) => {
      try {
        setSelectedState(state);
        setSelectedCity(null); // Reset city when state changes
        setErrors(null); // Clear any previous errors
  
        //Sets the specific state name to be assigned to the form data
        setFormData({
          ...formData,
          state: state.name,
        });

        return state.name === '' ? setIsStateDropdownOpen(true) : setIsStateDropdownOpen(false);
        
      } catch (error) {
        console.error(error)
        setErrors('An error occurred while selecting the state');
        openPopup(); // Open the popup
      }
    };
  
    // Handle city selection
    const handleCityClick = (city) => {
      try {
        setSelectedCity(city);
        setErrors(null); // Clear any previous errors
        setFormData({
          ...formData,
          city: city,
        });
        
        return city === '' ? setisCityDropdownOpen(true) : setisCityDropdownOpen(false);

      } catch (error) {
        setErrors('An error occurred while selecting the city. Please check internet connection.');
        openPopup(); // Open the popup
      }
    };
  
    // Handles the popup errors for users
    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };

    // Functionality to show or hide the password
    const password_show_hide = () => {
      var x = document.getElementById("password");
      var show_eye = document.getElementById("show_eye");
      var hide_eye = document.getElementById("hide_eye");
      if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
      } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";
      }
    }

    const confirmPassword_show_hide = () => {
      var x = document.getElementById("confirm_password");
      var show_eye = document.getElementById("CP_show_eye");
      var hide_eye = document.getElementById("CP_hide_eye");
      if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
      } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";
      }
    }
  
  
  
    //handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
  
      if (!formData.state) {
        // Handle the case where the selected state is empty
        console.error('State is empty');
        setErrors('State cannot be empty');
        openPopup(); // Open the popup
        return;
      } else if (!formData.city){
        console.log('City is empty');
        setErrors('City cannot be empty');
        openPopup(); // Open the popup
        return;
      };
  
      //checks phone number length
      if (formData.phone_number.length > 11 || formData.phone_number.length < 11) {
        console.log("Phone number error");
        setErrors('Phone number cannot be less or greater than 11 digits e.g 08123456789');
        openPopup(); // Open the popup
        return;
      }
  
      // Checks password length
      if (formData.password.length && formData.confirm_password.length < 8) {
        console.error('Password cannot be less than 8 characters.');
        setErrors("Password cannot be less than 8 characters.")
        openPopup(); // Open the popup
        return;
      }
  
      // Check if passwords match
      if (formData.password !== formData.confirm_password) {
        console.error('Passwords do not match');
        setErrors("Password does not match");
        openPopup(); // Open the popup
        return;
      }

      
      try {
        const formDataObj = new FormData();

        for (const key in formData) {
          // Append all form data except the file directly
          if (key !== 'cac_document' || 'identification') {
            formDataObj.append(key, formData[key]);
          }
        }

        // Append the file separately
        formDataObj.append('cac_document', formData.cac_document);
        formDataObj.append('identification', formData.identification);

        // Log the FormData content before sending
        for (const pair of formDataObj.entries()) {
          console.log(pair[0], pair[1]);
        }

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            "Referer": "https://realestate.api.sites.name.ng/",
            "X-CSRFToken": "VdU9qyALJzBsZb0oH9RuMdLbkowgWCKi"
          },
          body: formDataObj,
        });
  
        if (response.ok) {
          // Handle successful registration, e.g., redirect to a success page
          alert('Registration Successful, please kindly proceed to login');
          window.location.href = `/login/customer`;
          setErrors(null);
        } else {
          const errorResponse = await response.json();
          console.log(errorResponse);
          for (const field in errorResponse.extra.fields) {
            // Check if the field has a truthy value
            if (errorResponse.extra.fields[field]) {
              // Output the value contained in the field
              setErrors(`${errorResponse.extra.fields[field]}`)
              openPopup(); // Open the popup
              console.log(`${field}: ${errorResponse.extra.fields[field]}`);
            }
          }
        }   
      } catch (error) {
        // Catches all other types of errors
        console.error('Error during registration:', error);
        setErrors('An error occurred during registration. Please try again.');
        openPopup(); // Open the popup
      }
    };
  
    
  
    return {
      data,
      formData,
      selectedState,
      selectedCity,
      isStateDropdownOpen,
      isCityDropdownOpen,
      error,
      isPopupOpen, 
      setErrors,
      setIsPopupOpen,
      toggleStateDropdown,
      toggleCityDropdown,
      handleStateClick,
      handleCityClick,
      handleChange,
      handleFileChange,
      password_show_hide,
      confirmPassword_show_hide,
      handleSubmit,
      closePopup,
    };
}
  

export default useRegistrationMethod;