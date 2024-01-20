import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';


import { Button } from '../../../components/agencyDashboardComponent';
import { useStateContext } from '../../../contexts/ContextProvider';

const Properties = () => {
  const { currentColor } = useStateContext();
  const [properties, setProperties] = useState([]);
  
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleClick = () => {
    return navigate(`/${role}/add-property`);
  }
  
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    // Fetch properties from your API here
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://realestate.api.sites.name.ng/properties/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        const data = await response.json();
        console.log('API response:', data); // Log the response
        
        setProperties(data.results);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);


  return (
    <div className="mt-16">
      <div className='flex flex-wrap justify-center'>
        {properties && properties.length > 0 ? (
          properties.map(property => (
            <div key={property.id} className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
              <div className="flex justify-between">
                <p className="text-xl font-semibold">{property.agency.name}</p>
                <button type="button" className="text-xl font-semibold text-gray-500">
                  <IoIosMore />
                </button>
              </div>
              <div className="mt-10">
                {/* Used a container with a fixed height */}
                <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    className="md:w-96 h-full object-cover"
                    src={property.images[0].image}
                    alt="Property"
                  />
                </div>
                <div className="mt-8">
                  <p className="font-semibold text-xl hover:text-purple-500"> {property.type}</p>
                  <p className="py-4">
                    Added: 
                    <span className="ml-2 text-gray-400">
                      {
                        new Date(property.availability).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                      }
                    </span>
                  </p>
                  <p className="text-lg">
                    {new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(property.price)}
                  </p>
                  <p className="mt-4 text-sm text-gray-400">
                    {property.description}
                  </p>
                  <div className="mt-3">
                    <Button
                      color="white"
                      bgColor={currentColor}
                      text="View Property"
                      borderRadius="10px"
                    />
                  </div>
                </div>
              </div>
            </div>
          )) 
        ) : (
            <div className='flex items-center justify-center h-screen w-full -mt-16'>
              <div className="text-center">
                <p className="mb-4 text-xl dark:text-gray-200">No properties available.</p>
                <button
                  className=' w-full'
                  style={{
                    color: 'white',
                    backgroundColor: currentColor,
                    borderRadius: '10px',
                    padding: '15px',
                  }}
                  onClick={handleClick}
                >
                  Add Property
                </button>
              </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Properties