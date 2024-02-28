import React, { useEffect, useState } from 'react';

import { Header } from '../../components/dashboardComponents';
import { GoLocation } from 'react-icons/go';
import { BsMarkdown, BsPhone } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { BiPin, BiUser } from 'react-icons/bi';
import { useStateContext } from '../../contexts/ContextProvider';
import { IoReturnDownBackOutline } from 'react-icons/io5';


const useSingleProfile = (apiEndpoint) => {
  const [singleProfile, setSingleProfile] = useState([]);


  const accessToken = localStorage.getItem('token');


    useEffect(() => {
        const getSingleProfile = async () => {
          try {
            const response = await fetch(apiEndpoint, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
    
            
            if (response.ok) {
                const data = await response.json();
                setSingleProfile(data);
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
            console.error('Error fetching profile data:', error);
            alert('Error fetching profile data.');
          } 
        }
  
        getSingleProfile();
      }, [accessToken, apiEndpoint]);


      return{
        singleProfile
      }

}


const GetAgencyProfile = () => {
    const { currentColor } = useStateContext();
    const role = localStorage.getItem('role');
    const profileId = localStorage.getItem('profileId');
    

    const {
        singleProfile
    } = useSingleProfile(`https://realestate.api.sites.name.ng/agencies/${profileId}`);


    return (
        <div className="mt-16">
            <div className="m-6 md:m-10 p-6 md:p-10 rounded-3xl bg-white">
                <div className="flex items-center justify-between">
                    <Header category="Page" title="Profile" />
                    
                    {/* Back link */}
                    <div className=' max-md:px-5'>
                        <a 
                            href={`/${role}/agencies`} 
                            className='flex items-center text-lg mb-4'
                            onClick={() => {localStorage.removeItem('profileId')}}
                        >
                            <IoReturnDownBackOutline className=' mr-2'/> Back
                        </a>
                    </div>
                </div>
                <div className="w-full mt-10">
                    <div className="text-center space-y-9">
                        <img
                            src={singleProfile.logo !== null ? singleProfile.logo : "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="}
                            alt="profile"
                            className="rounded-full w-40 h-40 shadow-lg m-auto border-4 border-solid border-purple-800 hover:border-purple-500 hover:shadow-2xl"
                        />
                        <h4 className="font-bold text-3xl mt-10">{singleProfile.name}</h4>
                        <div className="flex items-center justify-center">
                            <GoLocation className="mr-2" />
                            <p>{singleProfile.address && (singleProfile.address.state || singleProfile.address.city)}, {singleProfile.address && singleProfile.address.country}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-around md:items-center my-10 p-4 rounded-xl text-white space-y-9"
                        style={{ backgroundColor: currentColor }}>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <BsMarkdown />
                                <span className="font-medium text-sm">Address:</span>
                            </div>
                            <h4 className="font-semibold text-lg">{singleProfile.address && singleProfile.address.street_address}, {singleProfile.address && singleProfile.address.city}, {singleProfile.address && singleProfile.address.state}, {singleProfile.address && singleProfile.address.country}.</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <BiPin />
                                <span className="font-medium text-sm">Customer Id:</span>
                            </div>
                            <h4 className="font-semibold text-lg">{singleProfile.id}</h4>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-around md:items-center space-y-9">
                        <div className="text-2xl md:text-4xl font-bold">
                            <p>Profile Infomation</p>
                        </div>
                        <div className="space-y-9">
                            <div className="">
                                <div className="flex  space-x-2">
                                    <BiUser />
                                    <span className="font-medium text-sm">Role:</span>
                                </div>
                                <p className="font-semibold text-lg">{singleProfile.object}</p>
                            </div>
                            <div className="">
                                <div className="flex  space-x-2">
                                    <MdOutlineEmail />
                                    <span className="font-medium text-sm">Email:</span>
                                </div>
                                <a href={`mailto:${singleProfile.email}`} className="font-semibold text-lg">{singleProfile.email}</a>
                            </div>
                            <div className="">
                                <div className="flex  space-x-2">
                                    <BsPhone />
                                    <span className="font-medium text-sm">Phone Number</span>
                                </div>
                                <a href={`tel:+234${singleProfile.phone_number}`} className="font-semibold text-lg">{singleProfile.phone_number}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetAgencyProfile;