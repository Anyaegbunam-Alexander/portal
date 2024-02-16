import {useCallback, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

// Icons
import { GrLocation } from 'react-icons/gr';


const UsePropertyLogic = (apiEndpoint) => {
    
  const { currentColor } = useStateContext();
  const [properties, setProperties] = useState([]);
  const [property, setproperty] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllAgencies, setgetAllAgencies] = useState([]); 
  const [getAllPropertyPurchases, setgetAllPropertyPurchases] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [profile, setProfile] = useState([])
  const [propertyPurchaseFormData, setpropertyPurchaseFormData] = useState({
    property: '',
    proof_of_payment: '',
    referral_code: '',
    customer_notes: '',
  });

  const { currentPage, setCurrentPage } = useStateContext();

  
  // variables
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const accessToken = localStorage.getItem('token');
  const { setSelectedPropertyData } = useStateContext();
    
  const UsehandleClick = () => {
      return navigate(`/${role}/add-property`);
  }
  
  // dropdown for the more icon on the property page of each property
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

  // navigates to the show properties page.
  const navOptions = () => {
    if (role === 'agency') return `/${role}/listings/`
    else return `/${role}/properties/`
  }

  // Fetch properties from your API here
  const fetchProperties = useCallback(async (apiEndpoint) => {
    setIsLoading(true);

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
      
      setTotalPages(data.page_count);
      
      // gets single property
      setproperty(data);
      console.log("Single Property Data: ", data.id);

      // pagination links
      setPaginationLinks({
        previous: data.links?.previous,
        next: data.links?.next,
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
      console.error(error);
      alert("An Error Occured: Unable to fetch properties", error);
    } finally {
      setIsLoading(false); // Set loading to false when the fetch operation completes
    }
  }, [accessToken, setIsLoading]);
  
  useEffect(() => {
    fetchProperties(apiEndpoint);
  }, [apiEndpoint, fetchProperties]);


  // Pagination handler
  const handlePagination = async () => {

    if (!isLoading && paginationLinks) {
      setIsLoading(true);

      try {
        // Fetch data for the next or previous page
        await fetchProperties(
          currentPage === 1 ? paginationLinks.next : paginationLinks?.previous
        );

        // Update the currentPage state after the fetchProperties completes
        setCurrentPage(prevPage => {
          return currentPage === 1 ? prevPage + 1 : prevPage - 1;
        });

      } catch (error) {
        console.error('Error during pagination fetch:', error);
        alert('An error occurred during pagination. Please try again');
      } finally {
        setIsLoading(false);
      }
    }
  };


  //navigation logic for the property purchase page
  const propertyPurchaseNav = async() => {
    if (role === 'agency') return alert("Agencies are not allowed to purchase property")
    else {
      if (property) {
        // export the generated data to the purchase property page
        await setSelectedPropertyData(property);
        const propertyId = property.id;
        localStorage.setItem('selectedPropertyId', propertyId);
        navigate(`/${role}/purchases/properties/`);
      } else {
        alert ('Unable to find property, please try again!');
      }
    }
  }

  // -------------- END OF CODE ----------------------------


  /* 
    The code below contains the logic for the property puchase
    - All logics are contained in different blocks of code below
      until you get to another comment block
    - PROPERTY PUCHASE
  */

  //Handle change in the values of user's input
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === 'property') {
      const propertyId = localStorage.getItem('selectedPropertyId');
      setpropertyPurchaseFormData({ ...propertyPurchaseFormData, property: propertyId });
    } else {
      setpropertyPurchaseFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  const handleTellerChange = (e) => {
    const file = e.target.files[0]
    setpropertyPurchaseFormData((prevFormData) => ({
      ...prevFormData,
      proof_of_payment: file,
    }));
  };

  const PurchaseProperty = async (e) => {
    e.preventDefault();
    console.log("Purchase property mounted");
    setIsLoading(true);

    try {
       // Ensure that the property ID is set
      const propertyId = propertyPurchaseFormData.property;
      if (propertyId !== localStorage.getItem('selectedPropertyId')) {
        console.error('Property ID is null or empty.');
        alert('Property ID is required.');
        return;
      }
      
      const formDataObj = new FormData();

      for (const key in propertyPurchaseFormData) {
        // Append all form data except the file directly
        if (key !== 'proof_of_payment') {
          formDataObj.append(key, propertyPurchaseFormData[key]);
        }
      }

      // Append the file separately
      formDataObj.append('proof_of_payment', propertyPurchaseFormData.proof_of_payment);


      // Log the FormData content before sending
       for (const pair of formDataObj.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      body: formDataObj,
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

      navigate(`/${role}/orders`);
      alert('Property purchase successful, a customer representative from the agency will reach out to you shortly to confirm your payment.');

    } catch (error) {
      // Handle errors (display an error message to the user, log the error, etc.)
      console.error('Error Occured', error.message);
      alert("Unable to purchase property. Please contact an admin");
    } finally {
      setIsLoading(false);
    }
  }
  // -------------- END OF CODE ----------------------------


  /* 
    The block of code below contains the code for agencies
    - This gets all the agencies on the platform
    - Shows the agencies to the agencies tab in the customer's dashboard
    - Contains data for agencies page.
  */
  useEffect(() => {
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
      } catch (error) {
        console.error('Error fetching properties:', error);
      } 
    }

    getAllAgencies();
  }, [accessToken, apiEndpoint]);

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

  const gridApplyAgencyBtn = (props) => (
    <div className="flex items-center justify-center gap-2">
      <button
        className='py-3 w-full text-white outline-none rounded-lg'
        style={{backgroundColor: currentColor}}
        formTarget='_blank'
        onClick={() => {
          localStorage.setItem('agencyId', props.Apply)
          navigate(`/agents/agency-applications/`)
        }}
      >
        Apply Agency
      </button>
    </div>
  );

  const agentApprovalGridStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.Status}</p>
    </div>
  );
  
  const agenciesGridForAgent = [
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
      headerText: 'Email',
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
    { 
      headerText: 'Apply',
      width: '125',
      textAlign: 'Center',
      template: gridApplyAgencyBtn,
    },
    { field: 'Status',
      headerText: 'Approval Status',
      width: '130',
      textAlign: 'Center',
      template: agentApprovalGridStatus, 
    },
  ];

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
      headerText: 'Email',
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
  // -------------- END OF CODE ---------------------------- 
  

  // Fetch properties from your API here
  const deleteProperty = async (propertyId) => {
    setIsLoading(true);
    const url = `https://realestate.api.sites.name.ng/properties/${propertyId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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

      alert('Property deleted successfully');
      navigate(`/${role}/overview`);

    } catch (error) {
      console.error(error);
      alert("An Error Occured: Unable to delete property", error);
    } finally {
      setIsLoading(false); // Set loading to false when the fetch operation completes
    }
  }
  // --- ----------- END OF CODE ----------------------------


 /* 
    The block of code below contains the code for Orders in an agency
    - This gets all the agencies orders on the platform
    - Shows the agencies orders, payment info and customer's profile 
    - Contains data for agencies orders page.
  */
    useEffect(() => {
      const getAllPropertyPurchases = async () => {
        try {
          const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          const data = await response.json();
          setgetAllPropertyPurchases(data.results);
        } catch (error) {
          console.error('Error fetching property purchase data:', error);
          alert('Error fetching data.');
        } 
      }
  
      getAllPropertyPurchases();
    }, [accessToken, apiEndpoint]);


    const gridPropertyImage = (props) => (
      <div>
        <img
          className="rounded-xl h-20 md:ml-3"
          src={props.ProductImage}
          alt="order-item"
        />
      </div>
    );
    
    const gridPropertyStatus = (props) => (
      <button
        type="button"
        style={{ background: props.StatusBg }}
        className="text-white py-1 px-2 capitalize rounded-2xl text-md"
      >
        {props.Status}
      </button>
    );

    const gridPropertyPurchaseReceipt = (props) => (
      <div className="flex items-center justify-center gap-2">
        <a href={`${props.Receipt}`} className=' underline text-blue-800'>Download Receipt</a>
      </div>
    );

    const gridPropertyPurchaseOption = (props) => (
      <div className="flex items-center justify-center gap-2">
        <a href={`${props.Teller}`} className=' underline text-blue-800' target='_blank' rel="noreferrer">Download Teller</a>
      </div>
    );

    const gridPropertyPurchaseViewButton = (props) => (
      <div className="flex items-center justify-center gap-2">
        {/* <a href={`${props.Teller}`} className=' underline text-blue-800' target='_blank' rel="noreferrer">Download Teller</a> */}
        <button
          className='py-3 w-full text-white outline-none rounded-lg'
          style={{backgroundColor: currentColor}}
          onClick={() => {
            showProperty(props.propertyID)
          }}
        >
          View Property
        </button>
      </div>
    );

    const currencyFormatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN', // Nigerian Naira
    });


    const propertyPurchaseGrid = [
      {
        headerText: 'Image',
        template: gridPropertyImage,
        textAlign: 'Center',
        width: '120',
      },
      {
        field: 'PropertyName',
        headerText: 'Property',
        width: '150',
        editType: 'dropdownedit',
        textAlign: 'Center',
      },
      { field: 'AgencyName',
        headerText: 'Agency Name',
        width: '150',
        textAlign: 'Center',
      },
      {
        field: 'TotalAmount',
        headerText: 'Total Amount',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
      },
      {
        headerText: 'Status',
        template: gridPropertyStatus,
        field: 'OrderItems',
        textAlign: 'Center',
        width: '120',
      },
      {
        field: 'propertyID',
        headerText: 'Property ID',
        width: '120',
        textAlign: 'Center',
      },
    
      {
        template: gridPropertyPurchaseReceipt,
        headerText: 'Receipt',
        width: '150',
        textAlign: 'Center',
      },
    ];

    const propertyPurchaseGridForAgency = [
      {
        headerText: 'Image',
        template: gridPropertyImage,
        textAlign: 'Center',
        width: '120',
      },
      {
        field: 'PropertyName',
        headerText: 'Property',
        width: '150',
        editType: 'dropdownedit',
        textAlign: 'Center',
      },
      { field: 'AgencyName',
        headerText: 'Customer Name',
        width: '150',
        textAlign: 'Center',
      },
      {
        field: 'TotalAmount',
        headerText: 'Total Amount',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '150',
      },
      {
        headerText: 'Status',
        template: gridPropertyStatus,
        field: 'OrderItems',
        textAlign: 'Center',
        width: '120',
      },
      {
        field: 'propertyID',
        headerText: 'Property ID',
        width: '120',
        textAlign: 'Center',
      },
    
      {
        template: gridPropertyPurchaseOption,
        headerText: 'Teller',
        width: '150',
        textAlign: 'Center',
      },
      {
        template: gridPropertyPurchaseViewButton,
        headerText: 'View Property',
        width: '150',
        textAlign: 'Center',
      },
    ];



    /* 
      The block of code below contains the code for customers page in the agencies dashboard
      - This gets all the customers on the platform that has patronized or has interest 
        in a property listed by the agency
      - Contains data for agencies customers page.
    */
    const agencyCustomerGridImage = (props) => (
      <div className="image flex gap-4">
        <img
          className="rounded-full w-10 h-10"
          src={props.CustomerImage}
          alt="customer"
        />
        <div>
          <p>{props.CustomerName}</p>
          <p>{props.CustomerEmail}</p>
        </div>
      </div>
    );

    const agencyCustomerGridStatus = (props) => (
      <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
        <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
        <p>{props.Status}</p>
      </div>
    );


    const agencyCustomersGrid = [
      { type: 'checkbox', width: '50' },
      { headerText: 'Name',
        width: '150',
        template: agencyCustomerGridImage,
        textAlign: 'Center' },
      { field: 'PropertyName',
        headerText: 'Property Name',
        width: '150',
        textAlign: 'Center' },
      { field: 'Status',
        headerText: 'Status',
        width: '130',
        textAlign: 'Center',
        template: agencyCustomerGridStatus 
      },
      {
        field: 'Availability',
        headerText: 'Availability',
        width: '100',
        textAlign: 'Center' },
      { field: 'Price',
        headerText: 'Price',
        width: '100',
        textAlign: 'Center' 
      },
      { field: 'Location',
        headerText: 'Location',
        width: '150',
        textAlign: 'Center' },
    
      { field: 'CustomerID',
        headerText: 'Customer ID',
        width: '120',
        textAlign: 'Center',
        isPrimaryKey: true,
      },
    
    ];


    useEffect(() => {
      const getProfile = async () => {
        try {
          const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          const data = await response.json();
          setProfile(data);
          
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
          console.error('Error fetching profile data:', error);
          alert('Error fetching profile data.');
        } 
      }

      getProfile();
    }, [accessToken, apiEndpoint])
    


  return {
    role,
    property,
    properties,
    dropdownPosition,
    showDropdown,
    currentColor,
    selectedImage,
    isModalOpen,
    getAllAgencies,
    agenciesGrid,
    isLoading,
    propertyPurchaseFormData,
    paginationLinks,
    currentPage,
    totalPages,
    setCurrentPage,
    propertyPurchaseGrid,
    propertyPurchaseGridForAgency,
    getAllPropertyPurchases,
    currencyFormatter,
    agencyCustomersGrid,
    agenciesGridForAgent,
    profile,
    navigate,
    openModal,
    navOptions,
    closeModal,
    UsehandleClick,
    UsehandleDropdown,
    showProperty,
    propertyPurchaseNav,
    handlePagination,
    handleFieldChange,
    handleTellerChange,
    PurchaseProperty,
    deleteProperty,
  }
}

export default UsePropertyLogic;