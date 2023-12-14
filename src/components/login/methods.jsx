import { useState, useEffect} from 'react';
//import { useAuth } from '../../contexts/AuthContext';

const useLoginLogic = (apiEndpoint) => { 
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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

    const redirectToDashboard = (url) => {
      // Redirect to the specified URL
      window.location.href = url;
    };

   // const { login } = useAuth();
  
    const useHandleLogin = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Referer": "https://realestate.api.sites.name.ng/",
            "X-CSRFToken": "VdU9qyALJzBsZb0oH9RuMdLbkowgWCKi"
          },
          body: JSON.stringify(userInput)
        });

        const responseData = await response.json();
        
        if (!response.ok) {
          // Handle non-successful response (HTTP status code other than 200)
            setError(responseData.message);
            console.error(responseData.message)

            for (const field in responseData.extra.fields) {
            // Check if the field has a truthy value
                if (responseData.extra.fields[field]) {
                  // Output the value contained in the field
                  setError(`${responseData.extra.fields[field]}`)
                  console.log(`${field}: ${responseData.extra.fields[field]}`);
                }
            }
        }

        //login successful
        console.log('Login successful', responseData);

        const { object, id } = responseData;

        // Call the login function with user details
        //console.log(login({ id, object, first_name }));


        switch (object) {
          case 'customer':
            redirectToDashboard(`/dashboard/${id}`);
            break;
          case 'agent':
            redirectToDashboard(`/dashboard/${id}`);
            break;
          case 'agency':
            redirectToDashboard(`/dashboard/${id}`);
            break;
          default:
            console.error('Unknown role:', object);
            setError('Unknown role');
        }
      } catch (error) {
        // Handle errors, e.g., display an error message to the user
        console.error('Login failed', error);
        setError('Login failed', error)
      }
    };
  
    return{   
      userInput,
      error,
      isModalOpen,
      handleChange,
      closeModal,
      password_show_hide,
      redirectToDashboard,
      useHandleLogin,
    }
  }

export default useLoginLogic;