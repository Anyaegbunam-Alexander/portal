import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '../agencyDashboardComponent';
import { agencyProfileData } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UsePropertyLogic from '../../pages/Dashboards/methods';


const AgencyProfile = () => {
  const { currentColor } = useStateContext();
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');
  const agencyname = localStorage.getItem('agencyName');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert('Logout successful');
  };

  const {
    profile
  } = UsePropertyLogic('https://realestate.api.sites.name.ng/agencies/profile/');
  

  return (
    <div className="nav-item absolute right-1 top-16 bg-white shadow-xl dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Agency Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={profile.logo !== null ? profile.logo : "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {agencyname} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> {role} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {email} </p>
        </div>
      </div>
      <div>
        {agencyProfileData.map((item, index) => (
          <div 
            key={index} 
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
            onClick={() => navigate(item.link)}
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          type='button'
          onClick={(e) => {
            handleLogout(e);
          }}
          style={{ color: 'white', backgroundColor: currentColor, borderRadius: '10px' }}
          className={` p-3 w-full hover:drop-shadow-xl hover:bg-light-gray `}
        >
          Logout
        </button>

      </div>
    </div>

  );
};

export default AgencyProfile;