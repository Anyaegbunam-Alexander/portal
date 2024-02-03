import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

// Icons
import { GrLocation } from 'react-icons/gr';


const UsePropertyLogic = (apiEndpoint) => {
    
  const { currentColor } = useStateContext();
  const [properties, setProperties] = useState([]);
  const [property, setproperty] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Add current page state
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllAgencies, setgetAllAgencies] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);   
    
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const accessToken = localStorage.getItem('token');
    
    
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

  // Fetch properties from your API here
  const fetchProperties = async (apiEndpoint) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
  

      // gets all properties
      setProperties(data.results);

      // gets single property
      setproperty(data);

      // pagination links
      setPaginationLinks({
        previous: data.links.previous,
        next: data.links.next,
      });

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
      alert("An Error Occured: Unable to fetch properties");
    } finally {
      setIsLoading(false); // Set loading to false when the fetch operation completes
    }
  };
  
  useEffect(() => {
    fetchProperties(apiEndpoint);
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


  /* 
    The block of code below contains the code for agencies
    - This gets all the agencies on the platform
    - Shows the agencies to the agencies tab in the customer's dashboard
    - Contains data for agencies page.
  */
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
        
        console.log(data.results)
        setgetAllAgencies(data.results);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } 
    }

    getAllAgencies();
  }, [apiEndpoint]);

  const gridAgenciesProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.EmployeeImage}
        alt="Agencies"
      />
      <p>{props.Name}</p>
    </div>
  );

  const gridAgenciesCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
      <GrLocation />
      <span>{props.Country}</span>
    </div>
  );

  const gridAgenciesProfileLink = (props) => (
    <div className="flex items-center justify-center gap-2">
      <a href={`${props.Profile}`} className=' underline text-blue-800'>Link to Profile</a>
    </div>
  );
  
  const agenciesGrid = [
    { headerText: 'Agencies',
      width: '150',
      template: gridAgenciesProfile,
      textAlign: 'Center' 
    },
    { field: 'Name',
      headerText: '',
      width: '0',
      textAlign: 'Center',
    },
    { field: 'Email',
      headerText: 'Emaail',
      width: '120',
      textAlign: 'Center',
    },
    { field: 'Address',
      headerText: 'Address',
      width: '170',
      textAlign: 'Center',
    },
    { 
      field: 'State',
      headerText: 'State',
      width: '120',
      textAlign: 'Center', 
    },
    { headerText: 'Country',
      width: '120',
      textAlign: 'Center',
      template: gridAgenciesCountry 
    },    
    { 
      headerText: 'Profile',
      width: '125',
      textAlign: 'Center',
      template: gridAgenciesProfileLink
    },
  ];


  // Pagination logic below
  useEffect(() => {
    setCurrentPage(1);
  }, [properties]);

  // Pagination handler
  const handlePagination = () => {
    if (!isLoading && paginationLinks) {
      fetchProperties(
        currentPage === 1 ? paginationLinks.next : paginationLinks.previous
      );
      setCurrentPage(
        currentPage === 1 ? currentPage + 1 : currentPage - 1
      );
    }
  };


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
    agenciesGrid,
    isLoading,
    navigate,
    openModal,
    navOptions,
    closeModal,
    UsehandleClick,
    UsehandleDropdown,
    showProperty,
    propertyPurchaseNav,
    handlePagination,
  }
}

export default UsePropertyLogic;