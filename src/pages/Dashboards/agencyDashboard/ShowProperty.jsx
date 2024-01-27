import React, { useEffect, useState } from 'react';
import UsePropertyLogic from './methods';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  
  const { propertyId } = useParams();

  const {
    property,
  } = UsePropertyLogic(`https://realestate.api.sites.name.ng/properties/${propertyId}`)
  

  return (
    // <div className="container mx-auto mt-8">
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //     {/* Left Column - Property Pictures */}
    //     <div>
    //       {properties.images.map((images, index) => (
    //         <img
    //           key={index}
    //           src={images}
    //           alt={`properties ${index + 1}`}
    //           className="w-full mb-4"
    //         />
    //       ))}
    //     </div>

    //     {/* Right Column - properties Details */}
    //     <div>
    //       <h1 className="text-3xl font-bold mb-4">{properties.address.street_address}</h1>

    //       <p className="text-gray-600 mb-2">Price: ${properties.price}</p>

    //       {/* Add more details as needed, e.g., map, contact information, etc. */}
    //       <div className="mb-4">
    //         <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
    //         <p>Agency: {properties.agency.name}</p>
    //         <p>Contact: {properties.agency.phone_number}</p>
    //       </div>

    //       {/* You can include a map component here if needed */}
    //       {/* Example: <MapComponent location={property.location} /> */}
    //     </div>
    //   </div>
    // </div>
    <div className=''>
      <h1 className=' text-2xl '>Hello World</h1>
      <h2>{property.type}</h2>
      {console.log("This is working")}
    </div>
  );
};

export default PropertyDetails;
