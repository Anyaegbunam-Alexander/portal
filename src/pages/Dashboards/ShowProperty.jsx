import React, { useEffect, useState } from 'react';
import UsePropertyLogic from './agencyDashboard/methods';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import MapComponent from '../../components/MapComponent';


import { MdAlternateEmail, MdOutlineCancel } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { IoWifiOutline } from "react-icons/io5";
import { MdOutlinePool } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { LuParkingCircle } from "react-icons/lu";
import { GiFlowers } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoReturnDownBackOutline } from "react-icons/io5";



const PropertyDetails = () => {
  const { propertyId } = useParams();
  const { 
    role,
    property, 
    selectedImage,
    isModalOpen, 
    openModal,
    closeModal,
    navOptions,
  } = UsePropertyLogic(`https://realestate.api.sites.name.ng/properties/${propertyId}`);
  

  return (
    <div className=" sm:p-10">
      {property.agency && (
        <div className="container mx-auto mt-8">
          {/* Back link */}
          <div className=' max-md:px-5'>
            <a href={navOptions()} className='flex items-center text-lg mb-4'>
              <IoReturnDownBackOutline className=' mr-2'/> Back
            </a>
          </div>

          {/* Property Pictures */}
          <div className="flex flex-row">
            <div className='bg-purple-800 w-full max-md:p-5 md:p-8 lg:p-20 rounded-lg'>
              <div className="flex md:flex-col-reverse md:space-x-0 md:p-4 lg:flex xl:flex-row
                max-md:flex-col-reverse max-md:space-x-0 max-md:p-4 justify-between items-center space-x-20
              ">
                <div className="text-white space-y-10 md:mt-5">
                  <h1 className='text-4xl font-extrabold lg:w-760 lg:mr-10 max-md:w-full max-md:text-3xl md:w-full'>{property.type}</h1>

                  <p className="text-3xl font-medium max-md:text-2xl">
                    {new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(property.price)}
                  </p>

                  <div>
                    <p className=' underline'>Listed by:</p>
                    <p className='text-white text-xl'>{property.agency.name}</p>
                  </div>

                  <div className='flex flex-row items-center space-x-10 w-24 md:w-full md:py-5 md:flex-wrap
                    max-md:w-full max-md:grid max-md:grid-cols-3 max-md:space-x-0 max-md:py-5
                  '>
                    {property.images.map((images, index) => (
                      <img
                        key={index}
                        src={images.image}
                        alt={`property ${index + 1}`}
                        className="flex rounded-xl cursor-pointer w-28 h-28 object-cover transform transition-transform duration-600 ease-in-out hover:scale-110 max-md:my-4 max-md:mr-4"
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
                    ariaHideApp={false}
                    className=" bg-secondary-dark-bg h-full flex flex-col justify-center items-center"
                    style={{ overlay: { zIndex: 1000 }, content: { zIndex: 1001 } }}
                  >
                  <button 
                    onClick={closeModal}
                    className=' bg-red-600 p-4 text-white rounded-lg fixed top-10 flex items-center text-lg'
                  ><MdOutlineCancel className='mr-2'/> Close</button>
                  <div className=' p-5 m-auto my-5'>
                    <img
                      src={selectedImage.image}
                      alt={`property enlarged`}
                      className="object-cover rounded-lg w-full h-full md:w-600 md:h-auto"
                    />
                  </div>
                </Modal>
                )}

                <img
                  src={property.images[0].image}
                  className="rounded-xl cursor-pointer h-96 object-cover transform transition-transform duration-600 ease-in-out hover:scale-110 
                  max-md:my-10 md:my-8"
                  style={{width: '700px'}}
                  alt="Property" 
                  onClick={() => openModal(property.images[0])}
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className='flex justify-between max-md:grid max-md:m-auto max-md:px-10 max-md:space-y-10 py-20 bg-white'>
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
                className=' bg-purple-800 p-5 text-white rounded-xl w-full max-md:mt-5'
              >
                View Profile
              </button>
            </div>
          </div>

          <div className=' -z-50'>
            <MapComponent />
          </div>

          {/* Property complete details */}
          <div className=" col-span-2 flex justify-between items-center space-x-3">
            {/* Left side */}
            <div className='bg-gray-100 p-20 rounded-md text-justify space-y-8 max-md:p-10 max-md:py-16'>
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
                <div className=' grid grid-flow-col'>
                  {property.amenities.map((item, index) => {
                    return(
                      <div 
                        key={index}
                        className='p-2 rounded-md text-lg uppercase'
                      >
                        <li>{item}</li>
                      </div>
                    )
                  })}
                </div>
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
