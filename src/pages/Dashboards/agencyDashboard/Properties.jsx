import React, {useEffect, useState} from 'react';
import { IoIosMore } from 'react-icons/io';


import { Button } from '../../../components/agencyDashboardComponent';
import { useStateContext } from '../../../contexts/ContextProvider';
import house1 from '../../../data/company_x-1.jpg';

const Properties = () => {
  const { currentColor } = useStateContext();
  const [properties, setProperties] = useState([]);
  
  
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    // Fetch properties from your API here
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://realestate.api.sites.name.ng/properties/', {
          method: 'GET',
          headers: {
            //"Referer": "https://realestate.api.sites.name.ng/",
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        const data = await response.json();

        console.log('API response:', data); // Log the response
        
        // Assuming 'results' is the key containing the properties array
        setProperties(data.results);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);


  return (
    <div className="mt-16">
      <div className='flex flex-wrap justify-center w-100'>
        {properties && properties.length > 0 ? (
          properties.map(property => (
            <div key={property.id} className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
              <div className="flex justify-between">
                <p className="text-xl font-semibold">Listing</p>
                <button type="button" className="text-xl font-semibold text-gray-500">
                  <IoIosMore />
                </button>
              </div>
              <div className="mt-10">
                <img
                  className="md:w-96 h-50"
                  src={house1}
                  alt=""
                />
                <div className="mt-8">
                  <p className="font-semibold text-lg"> {property.type}</p>
                  <p className="text-gray-400 ">Agency 1</p>
                  <p className="mt-8 text-sm text-gray-400">
                    This will be the small description for the news you have shown
                    here. There could be some great info.
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
            <p>No properties available.</p> 
        )}
      </div>
    </div>
  )
}

export default Properties