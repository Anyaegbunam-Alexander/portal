import React, { useState, useEffect } from 'react';
import { Header } from '../../../components/dashboardComponents';

const Referral = () => {
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const response = await fetch('https://realestate.api.mvcsites.name.ng/agents/profile/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('data', data);
          setReferralCode(data.referral_code);
        } else {
          console.error('Failed to fetch referral code');
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
        console.error('Error fetching referral code:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralCode();
  }, [accessToken]);


  const handleShareButtonClick = () => {
    const shareUrl = referralCode;
    if (navigator.share) {
      navigator.share({
        title: 'Looking to purchase a property?',
        text: 'Kindly use my referral code below!',
        url: shareUrl,
      })
      .then(() => alert('Shared successfully'))
      .catch(error => alert('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this device/browser.');
    }
  };


  return (
    <div className="m-6 md:m-10 p-6 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Referral Link" />
      {loading ? (
        <p className="text-center text-gray-600 mt-4 animate-pulse">Loading...</p>
      ) : (
        <div className="mt-6">
          <p className="text-center text-gray-700 mb-2">Share your referral code:</p>
          <div className="flex items-center m-auto bg-gray-100 rounded-lg p-2 w-1/2">
            <input
              type="text"
              className="flex-1 bg-transparent border-none focus:outline-none text-lg pl-3"
              value={referralCode}
              readOnly
            />
            <button
              className="ml-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
              onClick={() => {
                navigator.clipboard.writeText(referralCode);
                alert('Referral link copied to clipboard!');
              }}
            >
              Copy
            </button>

            <button
              className="ml-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
              onClick={() => handleShareButtonClick }
            >
              Share
            </button>
          </div>
        </div>
      )}

      <div className=" mt-12">
        <h1 className=' text-center text-xl font-bold my-6'>Commission</h1>

        <div className=' col columns-2'>
          <div className=' bg-purple-800 rounded-lg text-white p-4'>
            <div className=' space-y-6'>
              <p className=' text-lg md:text-xl font-semibold'>Earned commission</p>
              <p className='text-2xl font-bold'>₦00.00 <span className=' text-sm text-gray-200'>Earned</span></p>
              {/* <p className=' text-base'>From property purchase</p> */}
            </div>
          </div>
          <div className=' bg-slate-100 rounded-lg p-4'>
            <div className=' space-y-6'>
              <p className=' text-lg md:text-xl font-semibold'>Paid commission</p>
              <p className='text-2xl font-bold'>₦00.00 <span className=' text-sm text-green-600'>Paid</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
