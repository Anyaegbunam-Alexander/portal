import React, {useState} from 'react';
import { IoIosMore } from 'react-icons/io';


import { Button } from '../../../components/agencyDashboardComponent';
import { useStateContext } from '../../../contexts/ContextProvider';
import house1 from '../../../data/company_x-1.jpg';

const Properties = () => {
  const { currentColor } = useStateContext();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className="mt-12">
      <div className='flex flex-wrap justify-center'>
        <div className="w-full bg-white dark:text-gray-600 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="w-6/12 max-sm:w-5/6 mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Add Property</h2>
            <form  className="space-y-4">
              {/* Property */}
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
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Price (₦)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  //value={propertyData.price}
                  //onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-6">
                <div className='w-6/12'>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Availability Date
                  </label>
                  <input
                    type='date'
                    id="availability"
                    name="availability"
                    //value={propertyData.price}
                    //onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    required
                  />
                </div>

                <div className='w-6/12'>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Duration of availability
                  </label>
                  <input
                    type='number'
                    id="duration"
                    name="duration"
                    //value={propertyData.price}
                    //onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    required
                  />
                </div>
              </div>

              {/* Amenities offered by the property */}
              <div className='space-y-3'>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Features and Amenities
                </label>
                <div className="columns-3">
                  {/* Checkboxes for Amenities */}
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="pool"
                        //checked={propertyData.amenities.includes('pool')}
                        //onChange={handleChange}
                      />
                      <span className="ml-2 dark:text-gray-200">Pool</span>
                    </label>
                  </div>

                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="gym"
                        //checked={propertyData.amenities.includes('gym')}
                        //onChange={handleChange}
                      />
                      <span className="ml-2 dark:text-gray-200">Gym</span>
                    </label>
                  </div>

                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="free-wifi"
                        //checked={propertyData.amenities.includes('free wifi')}
                        //onChange={handleChange}
                      />
                      <span className="ml-2 dark:text-gray-200">Free WiFi</span>
                    </label>
                  </div>

                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="parking-lot"
                        //checked={propertyData.amenities.includes('free wifi')}
                        //onChange={handleChange}
                      />
                      <span className="ml-2 dark:text-gray-200">Parking Lot</span>
                    </label>
                  </div>

                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="garden"
                        //checked={propertyData.amenities.includes('free wifi')}
                        //onChange={handleChange}
                      />
                      <span className="ml-2 dark:text-gray-200">Garden</span>
                    </label>
                  </div>

                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="security"
                        //checked={propertyData.amenities.includes('free wifi')}
                        //onChange={handleChange}
                      />
                      <span className="ml-2 dark:text-gray-200">Security</span>
                    </label>
                  </div>
                  
                </div>
              </div>

              <div className="flex space-x-6">
                <div className='w-6/12'>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Square Footage (km&sup2;)
                  </label>
                  <input
                    type='number'
                    id="availability"
                    name="availability"
                    //value={propertyData.price}
                    //onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    required
                  />
                </div>

                <div className='w-6/12'>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Duration
                  </label>
                  <input
                    type='number'
                    id="duration"
                    name="duration"
                    //value={propertyData.price}
                    //onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                  <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    multiple
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md inline-block mb-4"
                  >
                    Select Files
                  </label>
                  {selectedFiles.length > 0 && (
                    <div className="mt-4">
                        <p className="text-lg font-semibold mb-2">Selected Files:</p>
                        <ul>
                          {selectedFiles.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-md"
                            >
                              <span className="truncate">{file.name}</span>
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveFile(index)}
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                    </div>
                  )}
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
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none h-60"
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