import React, {useState} from 'react';
import { HtmlEditor, 
  Inject, 
  Link, 
  QuickToolbar, 
  RichTextEditorComponent, 
  Toolbar 
} from '@syncfusion/ej2-react-richtexteditor';
import {useNavigate} from 'react-router-dom'

import { Header } from '../../../components/agencyDashboardComponent';
import { useStateContext } from '../../../contexts/ContextProvider';

const AddProperties = () => {
  const { currentColor } = useStateContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState([]);
  const [propertyData, setPropertyData] = useState({
    additional_fees: '',
    additional_notes: '',
    agent: null,
    address: {
      street_address: '',
      country: 'Nigeria',
      state: '',
      city: '',
    },
    amenities: [],
    availability: '',
    bathrooms: '',
    bedrooms: '',
    description: '',
    duration: '',
    floor_plans: [],
    images: [],
    is_compliant: false,
    interested_customers: null,
    legal_info: false,
    nearby_landmark: '',
    price: '',
    sold: false,
    square_footage: '',
    transaction_type: '',
    type: '', // name of the property
  })
  const maxFileSize = 2 * 1024 * 1024; // 10MB
  const navigate = useNavigate();
  // const [selectedVideos, setSelectedVideos] = useState([]);
  // const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFloorPlanFileChange = (e) => {
    const PDFs = Array.from(e.target.files);
    // Check PDF size before adding it to the state
    const validPdfs = PDFs.filter((pdf) => pdf.size <= maxFileSize);

    setSelectedFloorPlan((prevPDFs) => [...prevPDFs, ...validPdfs]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleRemoveFloorPlan = (index) => {
    const updatedPDFs = [...selectedFloorPlan];
    updatedPDFs.splice(index, 1);
    setSelectedFloorPlan(updatedPDFs);
  };

  // const handleVideoChange = (e) => {
  //   const videos = Array.from(e.target.files);

  //   // Check video size before adding it to the state
  //   const validVideos = videos.filter((video) => video.size <= maxFileSize);

  //   setSelectedVideos((prevVideos) => [...prevVideos, ...validVideos]);
  // };

  // const handleRemoveVideo = (index) => {
  //   const updatedVideos = [...selectedVideos];
  //   updatedVideos.splice(index, 1);
  //   setSelectedVideos(updatedVideos);
  // };


  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setPropertyData((prevData) => {
      let updatedData;
      if (type === 'checkbox') {
        if (name === 'legal_info') {
          return { ...prevData, [name]: !prevData[name] };
        }
        return { 
          ...prevData, 
          [name]: checked ? [...prevData[name], value] 
          : prevData[name].filter(item => item !== value) 
        };
      } else if (name.startsWith('address.')) {
        console.log('Updating address field:', name, value);
        const addressKey = name.split('.')[1];

          // Update the address object correctly
          updatedData = {
            ...prevData,
            address: {
              ...prevData.address,
              [addressKey]: value,
            },
          };
      } else {
        updatedData = { ...prevData, [name]: value };
      }
  
      console.log('Updated propertyData:', updatedData); // Log the updated propertyData
      return updatedData;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in propertyData) {
      if (propertyData.hasOwnProperty(key)) {
        if (key === 'address') {
          // Serialize the address object manually
          const addressObj = propertyData[key];
          for (const addressKey in addressObj) {
            if (addressObj.hasOwnProperty(addressKey)) {
              formData.append(`address.${addressKey}`, addressObj[addressKey]);
            }
          }
        } else if (Array.isArray(propertyData[key])) {
          if (key === 'amenities') {
            formData.append(key, JSON.stringify(propertyData[key]));
          } else if (Array.isArray(propertyData[key])) {
            propertyData[key].forEach((item) => {
              formData.append(key, item);
            });
          } else {
            formData.append(key, propertyData[key]);
          }          
        } else {
          formData.append(key, propertyData[key]);
        }
      }
    }

    // Append image files
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    // Append floor plan files
    selectedFloorPlan.forEach((file) => {
      formData.append('floor_plans', file);
    });

    // Log the FormData content before sending
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const accessToken = localStorage.getItem('token');
      // Send a request to your backend to add the property
      const response = await fetch('https://realestate.api.sites.name.ng/properties/', {
        method: 'POST',
        headers: {
          "Referer": "https://realestate.api.sites.name.ng/",
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      
      if (!response.ok) {
        // Handle the case where the request was not successful
        const errorResponse = await response.json();
        console.log(errorResponse);
        for (const field in errorResponse.extra.fields) {
          // Check if the field has a truthy value
          if (errorResponse.extra.fields[field]) {
            // Output the value contained in the field
            alert(`${errorResponse.extra.fields[field]}`)
            // openPopup(); // Open the popup
            console.log(`${field}: ${errorResponse.extra.fields[field]}`);
            return
          }
        }
      }
  
      // Display success message or redirect to confirmation page
      console.log(response);
      //navigate('/');
      alert('Property added successfully!');
    } catch (error) {
      // Handle errors (display an error message to the user, log the error, etc.)
      console.error('Error adding property:', error.message);
    }
  };
  

  

  return (
    <div className="mt-16">
      <div className='flex flex-wrap justify-center'>
        <div className="md:m-10 md:p-10 bg-white rounded-3xl m-2 p-4">
          <Header category="Page" title="Add Property"/>
          <div className="w-full p-4">
            {/* <h2 className="text-2xl font-semibold mb-4">Add Property</h2> */}
            <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
              {/* Property */}
              <div>
                <label htmlFor="propertyName" className="block text-base font-medium text-gray-700">
                  Property Name
                </label>
                <input
                  type="text"
                  id="propertyName"
                  name="type"
                  value={propertyData.type}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  required
                />
              </div>

              {/* street_address */}
              <div>
                <label htmlFor="street_address" className="block text-base font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="street_address"
                  name="address.street_address"
                  value={propertyData.address.street_address}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  required
                />
              </div>

              {/* Nearest Landmark */}
              <div>
                <label htmlFor="landmark" className="block text-base font-medium text-gray-700">
                  Nearest Landmark
                </label>
                <input
                  type='text'
                  id="landmark"
                  name="nearby_landmark"
                  value={propertyData.nearby_landmark}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  required
                />
              </div>

              {/* City and State */}
              <div className="flex space-x-6">
                <div className='w-6/12'>
                  <label htmlFor="state" className="block text-base font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type='text'
                    id="state"
                    name="address.state"
                    value={propertyData.address.state}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    required
                  />
                </div>

                <div className='w-6/12'>
                  <label htmlFor="city" className="block text-base font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type='text'
                    id="city"
                    name="address.city"
                    value={propertyData.address.city}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="text-base font-medium text-gray-700">
                  Price (₦)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={propertyData.price}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  min='0'
                  required
                />
              </div>

              {/* Bathrooms and Bedrooms */}
              <div className="flex space-x-6">
                <div className='w-6/12'>
                  <label htmlFor="bathrooms" className="block text-base font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <input
                    type='number'
                    id="bathrooms"
                    name="bathrooms"
                    value={propertyData.bathrooms}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    min='0'
                    required
                  />
                </div>

                <div className='w-6/12'>
                  <label htmlFor="bedrooms" className="block text-base font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <input
                    type='number'
                    id="bedrooms"
                    name="bedrooms"
                    value={propertyData.bedrooms}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    min='0'
                    required
                  />
                </div>
              </div>

              {/* Availability Date */}
              <div className="flex space-x-6">
                <div className='w-6/12'>
                  <label htmlFor="availability" className="block text-base font-medium text-gray-700">
                    Availability Date
                  </label>
                  <input
                    type='date'
                    id="availability"
                    name="availability"
                    value={propertyData.availability}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    required
                  />
                </div>

                <div className='w-6/12'>
                  <label htmlFor="duration" className="block text-base font-medium text-gray-700">
                    Duration of availability
                  </label>
                  <input
                    type='number'
                    id="duration"
                    name="duration"
                    value={propertyData.duration}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    min='0'
                    placeholder='Calculated in months'
                    required
                  />
                </div>
              </div>

              {/* Amenities offered by the property */}
              <div className='space-y-3'>
                  <label className="block text-base font-medium text-gray-700">
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
                            checked={propertyData.amenities.includes('pool')}
                            onChange={handleChange}
                        />
                        <span className="ml-2">Pool</span>
                        </label>
                    </div>

                    <div>
                        <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="amenities"
                            value="gym"
                            checked={propertyData.amenities.includes('gym')}
                            onChange={handleChange}
                        />
                        <span className="ml-2">Gym</span>
                        </label>
                    </div>

                    <div>
                        <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="amenities"
                            value="free-wifi"
                            checked={propertyData.amenities.includes('free-wifi')}
                            onChange={handleChange}
                        />
                        <span className="ml-2">Free WiFi</span>
                        </label>
                    </div>

                    <div>
                        <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="amenities"
                            value="parking-lot"
                            checked={propertyData.amenities.includes('parking-lot')}
                            onChange={handleChange}
                        />
                        <span className="ml-2">Parking Lot</span>
                        </label>
                    </div>

                    <div>
                        <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="amenities"
                            value="garden"
                            checked={propertyData.amenities.includes('garden')}
                            onChange={handleChange}
                        />
                        <span className="ml-2">Garden</span>
                        </label>
                    </div>

                  <div>
                      <label className="inline-flex items-center">
                      <input
                          type="checkbox"
                          name="amenities"
                          value="security"
                          checked={propertyData.amenities.includes('security')}
                          onChange={handleChange}
                      />
                      <span className="ml-2">Security</span>
                      </label>
                  </div>
                  
                  </div>
              </div>

              {/* Square footage and property type */}
              <div>
                  <label htmlFor="availability" className="block text-base font-medium text-gray-700">
                  Square Footage (km&sup2;)
                  </label>
                  <input
                  type='number'
                  id="availability"
                  name="square_footage"
                  value={propertyData.square_footage}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  min='0'
                  required
                  />
              </div>

              {/* uploading of property pictures */}
              <div>
                <label htmlFor="PropertyPictures" className="block text-base font-medium text-gray-700">
                  Upload pictures of property
                </label>
              <div className="w-full mt-1 p-6 bg-white rounded-md shadow-md">
                <input
                  type="file"
                  className="hidden"
                  id="fileInput"
                  multiple
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  style={{
                    backgroundColor: currentColor
                  }}
                  className="cursor-pointer text-white py-2 px-4 rounded-md inline-block mb-4"
                >
                  Select Pictures
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

              {/* uploading of Floor Plan */}
              <div>
                <label htmlFor="floorPlanFiles" className="block text-base font-medium text-gray-700">
                  Floor Plan
                </label>
              <div className="w-full mt-1 p-6 bg-white rounded-md shadow-md">
                <input
                  type="file"
                  className="hidden"
                  id="floorPlan"
                  multiple
                  onChange={handleFloorPlanFileChange}
                />
                <label
                  htmlFor="floorPlan"
                  style={{
                    backgroundColor: currentColor
                  }}
                  className="cursor-pointer text-white py-2 px-4 rounded-md inline-block mb-4"
                >
                  Select Files
                </label>
                {selectedFloorPlan.length > 0 && (
                  <div className="mt-4">
                      <p className="text-lg font-semibold mb-2">Selected Files:</p>
                      <ul>
                        {selectedFloorPlan.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-md"
                          >
                            <span className="truncate">{file.name}</span>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveFloorPlan(index)}
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

              {/* Description */}
              <div>
                <label htmlFor="description" className="text-base font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={propertyData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full h-72 outline-none"
                  required
                />
              </div>

              {/* Additionals */}
              <div className="flex space-x-6">
                <div className='w-6/12'>
                  <label htmlFor="fees" className="block text-base font-medium text-gray-700">
                    Additional Fees (₦)
                  </label>
                  <input
                    type='number'
                    id="fees"
                    name="additional_fees"
                    value={propertyData.additional_fees}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                    min='0'
                    placeholder='e.g. Taxes'
                  />
                </div>

                <div className='w-6/12'>
                  <label htmlFor="note" className="block text-base font-medium text-gray-700">
                    Additional Note
                  </label>
                  <input
                    type='text'
                    id="note"
                    name="additional_notes"
                    value={propertyData.additional_notes}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  />
                </div>
              </div>

              {/* Purchase Type */}
              <div className='space-y-3'>
                <label className="block text-base font-medium text-gray-700">
                  Purchase Type
                </label>
                <input
                  type='text'
                  id="type"
                  name="transaction_type"
                  value={propertyData.transaction_type}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  placeholder='E.g Sale or Rental'
                  required
                />
              </div>

              {/* Legal and compliance */}
              <div className='space-y-5'>
                <label htmlFor="legal" className="block text-base font-medium text-gray-700">
                  Legal and Compliance
                </label>
                <p className='text-sm text-gray-600 dark:text-gray-500 text-justify'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nisi molestiae veniam temporibus 
                  itaque quibusdam corporis quis repellat adipisci recusandae necessitatibus, mollitia fugit debitis 
                  doloremque asperiores, libero officiis, doloribus dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nisi molestiae veniam temporibus 
                  itaque quibusdam corporis quis repellat adipisci recusandae necessitatibus, mollitia fugit debitis 
                  doloremque asperiores, libero officiis, doloribus dicta.
                </p>

                {/* Purchase Type */}
                <div>
                  {/* Checkboxes for Amenities */}
                  <div className='mb-8'>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="legal_info"
                        value="legal_info"
                        checked={propertyData.legal_info}
                        onChange={handleChange}
                        required
                      />
                      <span className="ml-2">Agreement to the Terms and Conditions</span>
                    </label>
                  </div>
                  
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: currentColor
                  }}
                  className="w-full text-white p-3 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300"
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

export default AddProperties

