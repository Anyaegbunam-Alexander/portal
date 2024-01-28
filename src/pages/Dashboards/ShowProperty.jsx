import React, { useEffect, useState } from 'react';
import UsePropertyLogic from './agencyDashboard/methods';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import MapComponent from '../../components/MapComponent';


import { MdAlternateEmail } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { IoWifiOutline } from "react-icons/io5";
import { MdOutlinePool } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { LuParkingCircle } from "react-icons/lu";
import { GiFlowers } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { GrLocation } from "react-icons/gr";



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
              <div className="flex justify-between items-center space-x-20">
                <div className="text-white space-y-10">
                  <h1 className='text-4xl font-extrabold w-760'>{property.type}</h1>

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
                        className="flex rounded-xl cursor-pointer md:w-96 h-28 object-cover transform transition-transform duration-600 ease-in-out hover:scale-110"
                        onClick={() => openModal(images)}
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
                    <button 
                      onClick={closeModal}
                      className=' bg-red-600 p-2 text-white rounded-lg left-0'
                    >Close</button>
                    <div className=' p-14 flex justify-center'>
                      <img
                        src={selectedImage.image}
                        alt={`property enlarged`}
                        className="object-cover rounded-lg"
                        style={{width: '700px', height: '700px'}}
                      />
                    </div>
                  </Modal>
                )}

                <img
                  src={property.images[1].image}
                  className="rounded-xl cursor-pointer md:w-96 h-96 object-cover transform transition-transform duration-600 ease-in-out hover:scale-110"
                  style={{width: '750px'}}
                  alt="Property" 
                  onClick={() => openModal(property.images[1])}
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className='flex justify-between py-20 bg-white'>
            <h1 className="text-3xl font-bold">Contact Information</h1>
            
            <div className=" space-y-5">
              <h2 className="text-xl font-semibold mb-3">{property.agency.name}</h2>
              <div className=' text-md space-y-4'>
                <div className="flex items-center space-x-3">
                  <MdAlternateEmail className='text-2xl'/>
                  <a href={`mailto:${property.agency.email}`}>{property.agency.email}</a>
                </div>

                <div className="flex items-center space-x-3">
                  <MdAddIcCall className='text-2xl'/>
                  <a href={`tel:+234${property.agency.phone_number}`}>{property.agency.phone_number}</a>
                </div>

                <div className="flex items-center space-x-3">
                  <GrLocation className='text-2xl'/>
                  <p>
                    {property.agency.address.street_address}, 
                    {property.agency.address.city}, 
                    {property.agency.address.state}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button
                className=' bg-purple-800 p-5 text-white rounded-xl'
              >
                View Profile
              </button>
            </div>
          </div>

          <MapComponent />

          {/* Property complete details */}
          <div className=" col-span-2 flex justify-between items-center py-16 space-x-3">
            {/* Left side */}
            <div className='bg-gray-100 p-20 rounded-md text-justify space-y-8'>
              <p className=' font-bold text-2xl capitalize'>{property.type}</p>
              <div className=' space-y-5'>
                <p className=' font-semibold text-xl mt-6'>Amenities</p>
                <div className='flex items-center space-x-3 text-xl'>
                  <IoWifiOutline />
                  <MdOutlinePool />
                  <CgGym />
                  <LuParkingCircle />
                  <GiFlowers />
                  <MdOutlineSecurity />
                </div>
                {property.amenities.map((item, index) => {
                  return(
                    <div 
                      key={index}
                      className='flex bg-gray-700 text-white p-2 rounded-md text-lg uppercase'
                    >
                      <li>{item}</li>
                    </div>
                  )
                })}
              </div>

              <div className='py-5'>
                <p className='font-semibold text-xl'>Description</p>
                <p className='my-4'>{property.description}</p>
              </div>

              <div className=' space-y-5'>
                <p className=' font-semibold text-xl'>Location</p>
                <div className=' space-y-3 text-lg'>
                  <p> <span className=' font-medium'> Street:</span> {property.address.street_address}</p>
                  <p> <span className=' font-medium'> City:</span> {property.address.city}</p>
                  <p> <span className=' font-medium'> State:</span> {property.address.state}</p>
                  <p> <span className=' font-medium'> Country:</span> {property.address.country}</p>
                </div>
              </div>

              <button
                  className=' bg-purple-800 p-4 text-white w-full'
                >
                  Purchase
              </button>
            </div>

            {/* Right Side */}
            <div className=''>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
