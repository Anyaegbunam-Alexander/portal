import React, { useEffect } from 'react';

import { Header } from '../../../components/dashboardComponents';
import { GoHomeFill } from 'react-icons/go';
import UsePropertyLogic from '../methods';


const Profile = () => {
    
    const role = localStorage.getItem('role');
    const {
        profile
    } = UsePropertyLogic('https://realestate.api.sites.name.ng/customers/profile/')

    console.log("User data:", profile)

 
  return (
    <div className="mt-16">
        {/* <div className='m-2 md:m-10 p-2 flex items-center space-x-5 dark:text-gray-200'>
            <GoHomeFill />
            <a href="/">Home</a>
            <span>&gt;</span>
            <a href={`/${role}/profile`} className='active'>profile</a>
        </div> */}

        <div className="m-2 md:m-10 p-2 md:p-10 rounded-3xl bg-white">
            <Header category="Page" title="Profile"/>
            <hr />
            <div>
                <div className="w-full mt-10">
                    <div className='flex space-x-10'>
                        <img 
                            src={profile.profile_picture !== null ? profile.profile_picture : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt="profile" 
                            className='rounded-full w-40 h-40'
                        />

                        <div>
                            
                            <h4>{profile.last_name} {profile.first_name}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile;