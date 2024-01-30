import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';



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
    navigate(`/${role}/listings/show-property/${propertyId}`) 
  }

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };
    

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
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [apiEndpoint]);



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
    openModal,
    closeModal,
    UsehandleClick,
    UsehandleDropdown,
    showProperty,
  }
}

export default UsePropertyLogic;