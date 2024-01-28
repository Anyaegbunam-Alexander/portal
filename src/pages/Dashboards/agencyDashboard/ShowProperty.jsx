import React, { useEffect, useState } from 'react';
import UsePropertyLogic from './methods';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const { 
    property, 
    selectedImage,
    isModalOpen, 
    openModal,
    closeModal,
  } = UsePropertyLogic(`https://realestate.api.sites.name.ng/properties/${propertyId}`);
  
  console.log(property)

  return (
    <div className="">
      {property.agency && (
        <div className="container mx-auto mt-8">
          <div className="flex">
            {/* Left Column - Property Pictures */}
            <div className='bg-purple-800 w-full p-20 rounded-lg'>
              <div className="flex justify-between items-center space-x-10">
                <div className="text-white space-y-10">
                  <h1 className='text-5xl font-extrabold w-760'>{property.type}</h1>

                  <p className="text-3xl font-medium">
                    {new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(property.price)}
                  </p>

                  <div>
                    <p className=' underline'>Listed by:</p>
                    <p className='text-white text-xl'>{property.agency.name}</p>
                  </div>

                  <div className='flex space-x-10 w-24'>
                    {property.images.map((images, index) => (
                      <img
                        key={index}
                        src={images.image}
                        alt={`property ${index + 1}`}
                        className="flex rounded-xl md:w-96 h-28 object-cover transform transition-transform duration-600 ease-in-out hover:scale-110"
                        onClick={() => openModal(images[index])}
                      />
                    ))}
                  </div>
                </div>

                {/* Display the selected image in a modal */}
                {selectedImage && (
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Enlarged Image"
                  >
                    <div>
                      <img
                        src={selectedImage.image}
                        alt={`property enlarged`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button onClick={closeModal}>Close</button>
                  </Modal>
                )}

                <img
                  src={property.images[1].image}
                  className="rounded-xl md:w-96 h-96 object-cover transform transition-transform duration-600 ease-in-out hover:scale-110"
                  style={{width: '750px'}}
                  alt="Property" 
                  onClick={() => openModal(property.images[1])}
                />
              </div>
            </div>
          </div>
          {/* Right Column - property Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{property.address.street_address}</h1>

            

            {/* Add more details as needed, e.g., map, contact information, etc. */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <p>Agency: {property.agency.name}</p>
              <p>Contact: {property.agency.phone_number}</p>
            </div>

            {/* You can include a map component here if needed */}
            {/* Example: <MapComponent location={property.location} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
