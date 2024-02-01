import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';



const UsePropertyLogic = (apiEndpoint) => {
    
  const { currentColor } = useStateContext();
  const [properties, setProperties] = useState([]);
  const [property, setproperty] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1); // Add current page state
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllAgencies, setgetAllAgencies] = useState([])    
    
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
    
    
  const UsehandleClick = () => {
      return navigate(`/${role}/add-property`);
  }
  
  const UsehandleDropdown = (event) => {
      const rect = event.target.getBoundingClientRect();
      setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
      });
      setShowDropdown(!showDropdown);
  };

  const showProperty = (propertyId) => {
    navigate(`/${role}/listings/show-property/${propertyId}`);
  }

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const navOptions = () => {
    if (role === 'agency') return `/${role}/listings/`
    else return `/${role}/properties/`
  }

  
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    // Fetch properties from your API here
    const fetchProperties = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        
        setProperties(data.results);
        setproperty(data);

        if (!response.ok) {
          const errorResponse = await response.json();
  
          for (const field in errorResponse.extra.fields) {
            if (errorResponse.extra.fields[field]) {
              // Output the value contained in the field
              alert(`${field}: ${errorResponse.extra.fields[field]}`)
              console.log(`${field}: ${errorResponse.extra.fields[field]}`);
              return
            }
          }
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert("An Error Occured");
      }
    };

    fetchProperties();
  }, [apiEndpoint]);


  const propertyPurchaseNav = () => {
    if (role === 'agency') return alert("Agencies are not allowed to purchase property")
    else return navigate(`/${role}/purchases/properties/`)
  }

  // useEffect(() => {
  //   const PurchaseProperty = async () => {
  //     const accessToken = localStorage.getItem('token');
  //     try {
  //       const response = await fetch(apiEndpoint, {
  //         method: 'POST',
  //         headers: {
  //           "Referer": "https://realestate.api.sites.name.ng/",
  //           'Authorization': `Bearer ${accessToken}`,
  //         },
  //         //body: formData,
  //       });
  
        
  //       if (!response.ok) {
  //         const errorResponse = await response.json();
  
  //         for (const field in errorResponse.extra.fields) {
  //           if (errorResponse.extra.fields[field]) {
  //             // Output the value contained in the field
  //             alert(`${field}: ${errorResponse.extra.fields[field]}`)
  //             // openPopup(); // Open the popup
  //             console.log(`${field}: ${errorResponse.extra.fields[field]}`);
  //             return
  //           }
  //         }
  //       }
    
  //       // Display success message or redirect to confirmation page
  //       //navigate(`/${role}/listings`);
  //       //alert('Property added successfully!');
  //       //console.log(response.body);
  //     } catch (error) {
  //       // Handle errors (display an error message to the user, log the error, etc.)
  //       console.error('Error Occured', error.message);
  //       alert("An error occured")
  //     }
  //   }

  //   PurchaseProperty();
  // }, [apiEndpoint])


  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const getAllAgencies = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        
        setgetAllAgencies(data.results);
        console.log(data.results)
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }
  }, [apiEndpoint])
  
  


  return {
    role,
    property,
    properties,
    dropdownPosition,
    paginationLinks,
    showDropdown,
    currentColor,
    selectedImage,
    isModalOpen,
    getAllAgencies,
    navigate,
    openModal,
    navOptions,
    closeModal,
    UsehandleClick,
    UsehandleDropdown,
    showProperty,
    propertyPurchaseNav,
  }
}

export default UsePropertyLogic;