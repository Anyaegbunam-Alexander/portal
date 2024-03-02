// EditProfile.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/loader/LoadingSpinner';

const EditAgentProfile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    street_address: '',
    city: '',
    state: '',
    country: '',
    profile_picture: null
  });
  const [isLoading, setIsLoading] = useState(false); 


  const accessToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');




  const handleChange = (e) => {
    if (e.target.name === 'profile_picture') {
      setFormData({
        ...formData,
        profile_picture: e.target.files[0]
      });
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('street_address', formData.street_address);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('profile_picture', formData.profile_picture);

    try {
      const response = await fetch('https://realestate.api.sites.name.ng/agents/profile/', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formDataToSend
      });

      if (response.ok) {
        // Handle success, maybe show a success message or redirect
        alert('Profile updated successfully');
        navigate(`/${role}/profile`)
      } else {
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
      console.error('Error updating profile:', error);
      alert('Error updating profile:', error);
    } finally {
        setIsLoading(false);
      }
  };

  return (
    <div>
        {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-lg md:text-xl text-center text-purple-500 font-semibold">Edit Profile</div>
    
                    <div className="mt-4 space-y-6">
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="First Name"/>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="Last Name"/>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="Email"/>
                    <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="Phone Number"/>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm mb-2">Profile Picture</label>
                        <div className="flex items-center justify-between w-full">
                            <label htmlFor="profile_picture" className="cursor-pointer bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Upload Picture
                            </label>
                            <span className="ml-2 text-gray-500">{formData.profile_picture ? formData.profile_picture.name : 'No file selected'}</span>
                        </div>
                        <input id="profile_picture" type="file" name="profile_picture" onChange={handleChange} className="hidden"  accept="image/*"/>
                    </div>
                    <input type="text" name="street_address" value={formData.street_address} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="Street Address"/>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="City"/>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="State"/>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="Country"/>
                    </div>
                
                    <div className="mt-8">
                    <button type="submit" className="bg-purple-800 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded w-full">Save</button>
                    </div>
                </div>
                </div>
            </form>
            
            </div>
        </div>
        </>
      )}
    </div>
    
  );
};

export default EditAgentProfile;
