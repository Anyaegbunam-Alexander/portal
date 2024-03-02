// EditProfile.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/loader/LoadingSpinner';

const EditAgencyProfile = () => {
  const [formData, setFormData] = useState({
    link: '',
    description: '',
    logo: null
  });
  const [isLoading, setIsLoading] = useState(false); 


  const accessToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');




  const handleChange = (e) => {
    if (e.target.name === 'logo') {
      setFormData({
        ...formData,
        logo: e.target.files[0]
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
    formDataToSend.append('description', formData.description);
    formDataToSend.append('link', formData.link);
    formDataToSend.append('logo', formData.logo);

    try {
      const response = await fetch('https://realestate.api.sites.name.ng/agencies/profile/', {
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
    
                    <div className="mt-6 space-y-6">
                      {/* Upload logo */}
                      <div className="my-6">
                          <label className="block text-gray-700 text-sm mb-2">Agency Logo</label>
                          <div className="flex items-center justify-between w-full">
                              <label htmlFor="logo" className="cursor-pointer bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded flex items-center">
                                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Upload Logo
                              </label>
                              <span className="ml-2 text-gray-500">{formData.logo ? formData.logo.name : 'No file selected'}</span>
                          </div>
                          <input id="logo" type="file" name="logo" onChange={handleChange} className="hidden"  accept="image/*"/>
                      </div>

                      <textarea type="text" name="description" value={formData.description} onChange={handleChange} rows='6' className="form-input outline-none w-full border-2 p-2" placeholder="Agency Description"></textarea>
                      <input type="link" name="link" value={formData.link} onChange={handleChange} className="form-input outline-none w-full border-b-2 p-2" placeholder="www.example.com"/>
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

export default EditAgencyProfile;
