import React from 'react';
import { IoIosMore } from 'react-icons/io';


import { Button } from '../../../components/agencyDashboardComponent';
import { useStateContext } from '../../../contexts/ContextProvider';
import house1 from '../../../data/company_x-1.jpg';

const Properties = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="mt-12">
      <div className='flex flex-wrap justify-center'>
        <div className="w-full bg-white dark:text-gray-600 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="w-6/12 max-sm:w-5/6 mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Add Property</h2>
            <form  className="space-y-4">
              <div>
                <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Property Name
                </label>
                <input
                  type="text"
                  id="propertyName"
                  name="propertyName"
                  //value={propertyData.propertyName}
                  //onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  //value={propertyData.address}
                  //onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  //value={propertyData.price}
                  //onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              <div className="flex space-x-6">
                <div className='w-6/12'>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Bathrooms
                  </label>
                  <input
                    type='number'
                    id="bathrooms"
                    name="bathrooms"
                    //value={propertyData.price}
                    //onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>

                <div className='w-6/12'>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Bedrooms
                  </label>
                  <input
                    type='number'
                    id="bedrooms"
                    name="bedrooms"
                    //value={propertyData.price}
                    //onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-6">
                <div className='w-6/12'>
                  <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Property Type
                  </label>
                  <input
                    type='text'
                    id="property-type"
                    name="property-type"
                    //value={propertyData.price}
                    //onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>

                <div className='w-6/12'>
                  <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Nearest Landmark
                  </label>
                  <input
                    type='text'
                    id="landmark"
                    name="landmark"
                    //value={propertyData.price}
                    //onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  //value={propertyData.description}
                  //onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300"
                >
                  Add Property
                </button>
              </div>
            </form>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Properties