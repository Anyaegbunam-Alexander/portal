import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';



const UsePropertyLogic = (apiEndpoint) => {
    
  const { currentColor } = useStateContext();
  const [properties, setProperties] = useState([]);
  const [property, setproperty] = useState([])
  const [paginationLinks, setPaginationLinks] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1); // Add current page state
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    
    
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
    console.log("showProperty function called with propertyId:", propertyId);
    navigate(`/${role}/listings/show-property/${propertyId}`) 
    console.log("Navigation Working!!")
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
        
        console.log('API response:', data); // Log the response
        setproperty(data);
        setProperties(data.results);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [apiEndpoint]);

  return {
    property,
    properties,
    dropdownPosition,
    paginationLinks,
    showDropdown,
    currentColor,
    UsehandleClick,
    UsehandleDropdown,
    showProperty,
  }
}

export default UsePropertyLogic;