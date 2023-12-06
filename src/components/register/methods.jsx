import { useState, useEffect}  from 'react';

const useRegistrationMethod = (apiEndpoint) => {
    /*
      code to select state and City from a third party API which I got from this link
      https://bensonarafat.medium.com/using-the-nigeria-state-town-and-local-government-api-d73451696c54
    */
    const [data, setData] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
  
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
      link: '',
      name: '', //name of agency
      agreement: true,
    });
  
  
    //Handle change in the values of user's input
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
      const fileName = e.target.files[0]?.name || null;
      setFormData((prevFormData) => ({
        ...prevFormData,
        cac_document: fileName,
      }));
    };
  
    // Handle state selection
    const handleStateClick = (state) => {
      try {
        setSelectedState(state);
        setSelectedCity(null); // Reset city when state changes
        setError(null); // Clear any previous errors
  
        //Sets the specific state name to be assigned to the form data
        setFormData({
          ...formData,
          state: state.name,
        });
  
        
      } catch (error) {
        console.error(error)
        setError('An error occurred while selecting the state');
      }
    };
  
    // Handle city selection
    const handleCityClick = (city) => {
      try {
        setSelectedCity(city);
        setFormData({
          ...formData,
          city: city,
        });
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('An error occurred while selecting the city. Please check internet connection.');
      }
    };
  
    // closes the error pop up
    const closeModal = () => {
      setIsModalOpen(false);
      setError(null)
    };
  
    useEffect(() => {
      if (error) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    }, [error]);

    const password_show_hide = () => {
      var x = document.getElementById("password");
      var show_eye = document.getElementById("show_eye");
      var hide_eye = document.getElementById("hide_eye");
      hide_eye.classList.remove("d-none");
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
      hide_eye.classList.remove("d-none");
      if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "grid";
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
        setError('State cannot be empty');
        return;
      } else if (!formData.city){
        console.log('City is empty');
        setError('City cannot be empty');
        return;
      };
  
      //checks phone number length
      if (formData.phone_number.length > 11 || formData.phone_number.length < 11) {
        console.log("Phone number error");
        setError('Phone number cannot be less or greater than 11 digits e.g 08123456789');
        return;
      }
  
      // Checks password length
      if (formData.password.length && formData.confirm_password.length < 8) {
        console.error('Password cannot be less than 8 characters.');
        setError("Password cannot be less than 8 characters.")
        return;
      }
  
      // Check if passwords match
      if (formData.password !== formData.confirm_password) {
        console.error('Passwords do not match');
        setError("Password does not match")
        return;
      }
  
  
      try {
        const formDataObj = new FormData();

        for (const key in formData) {
          // Append all form data except the file directly
          if (key !== 'cac_document') {
            formDataObj.append(key, formData[key]);
          }
        }

        // Append the file separately
        formDataObj.append('cac_document', formData.cac_document);

        // Log the FormData content before sending
        for (const pair of formDataObj.entries()) {
          console.log(pair[0], pair[1]);
        }

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Referer": "https://realestate.api.sites.name.ng/",
            "X-CSRFToken": "VdU9qyALJzBsZb0oH9RuMdLbkowgWCKi"
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          // Handle successful registration, e.g., redirect to a success page
          console.log('Registration successful');
          console.log(formData);
          setError(null);
        } else {
          const errorResponse = await response.json();
          for (const field in errorResponse.extra.fields) {
            // Check if the field has a truthy value
            if (errorResponse.extra.fields[field]) {
              // Output the value contained in the field
              setError(`${errorResponse.extra.fields[field]}`)
              console.log(`${field}: ${errorResponse.extra.fields[field]}`);
            }
          }
        }   
      } catch (error) {
        // Catches all other types of errors
        console.error('Error during registration:', error);
        setError('An error occurred during registration. Please try again.');
      }
    };
  
    
  
    return {
      data,
      formData,
      selectedState,
      selectedCity,
      isModalOpen,
      error,
      handleStateClick,
      handleCityClick,
      handleChange,
      handleFileChange,
      password_show_hide,
      confirmPassword_show_hide,
      handleSubmit,
      closeModal,
    };
}
  

export default useRegistrationMethod;