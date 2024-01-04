import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../../pages/Dashboards/userDashboard/UserDashboard';
//import { useAuth } from '../../contexts/AuthContext';

const useLoginLogic = (apiEndpoint) => { 
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    // New function to set errors
    const setErrors = (newError) => {
      setError(newError);
    };

    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };
    
    //Hadle form data i.e user input
    const [userInput, setUserInput] = useState({
      email: '',
      password: '',
    });
  
    //Handle change in the values of user's input
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserInput(
        (prevData) => (
          { ...prevData, [name]: value }
        )
      );
    };


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

    const navigate = useNavigate();

    const userLoggedIn = (value) => {
      return value
    }

    // Function to get a specific cookie value by name
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    
    const useHandleLogin = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch(apiEndpoint, {
          //credentials: "include",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Referer": "https://realestate.api.sites.name.ng/",
            "X-CSRFToken": "VdU9qyALJzBsZb0oH9RuMdLbkowgWCKi",
          },
          body: JSON.stringify(userInput)
        });

        const responseData = await response.json();

        // Check if the session ID is present in cookies
        const sessionId = getCookie('sessionid');
        console.log(sessionId);
        
        if (!response.ok) {
          // Handle non-successful response (HTTP status code other than 200)
            setErrors(responseData.message);
            openPopup(); // Open the popup

            for (const field in responseData.extra.fields) {
            // Check if the field has a truthy value
                if (responseData.extra.fields[field]) {
                  // Output the value contained in the field
                  setErrors(`${responseData.extra.fields[field]}`)
                  openPopup(); // Open the popup
                  console.log(`${field}: ${responseData.extra.fields[field]}`);
                }
            }
            return;
        }

        //login successful
        userLoggedIn(true)
        navigate('/')
        //window.location.href = '/';
        console.log('Navigating to /'); // Add this line
        console.log('Login successful', responseData);
        


        //const { object } = responseData;

        // switch (object) {
        //   case 'customer':
        //     redirectToDashboard(`/overview`);
        //     break;
        //   case 'agent':
        //     redirectToDashboard(`/overview`);
        //     break;
        //   case 'agency':
        //     redirectToDashboard(`/overview`);
        //     break;
        //   default:
        //     console.error('Unknown role:', object);
        //     setErrors('An error occured');
        //     openPopup(); // Open the popup
        // }
      } catch (error) {
        // Handle errors, e.g., display an error message to the user
        console.error('Login failed', error);
        setErrors('Login failed', error);
        openPopup(); // Open the popup
      }
    };
  
    return{   
      userInput,
      error,
      isPopupOpen, 
      setIsPopupOpen,
      openPopup,
      closePopup,
      handleChange,
      password_show_hide,
      //redirectToDashboard,
      useHandleLogin,
    }
  }

export default useLoginLogic;