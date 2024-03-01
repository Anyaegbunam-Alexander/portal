import React, { useState } from 'react';
import LoadingSpinner from '../../../components/loader/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const HandlePropertyPurchaseApproval = (apiEndpoint) => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const accessToken = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(false);
  const [propertyPurchaseApproval, setPropertyPurchaseApproval] = useState({
    status: '',
    agency_notes: '',
  });

  //Handle change in the values of user's input
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name); // Log the name of the field
    console.log("Value:", value);
    setPropertyPurchaseApproval((prevData) => ({ ...prevData, [name]: value }));
  };

  const approvePropertyPurchase = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyPurchaseApproval),
      });


      if(response.ok){
        alert(`Property purchase is ${propertyPurchaseApproval.status}`);
        navigate(`/${role}/orders`);
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
      console.error(error);
      alert("An Error Occured: Unable to approve property purchase", error);
    } finally {
      setIsLoading(false); // Set loading to false when the fetch operation completes
    }
  }

  return {
    isLoading,
    propertyPurchaseApproval,
    handleFieldChange,
    approvePropertyPurchase,
  }

}

const ApprovePurchase = () => {
    const propertyId = localStorage.getItem('property-id');

    const {
        isLoading,
        propertyPurchaseApproval,
        handleFieldChange,
        approvePropertyPurchase,
    } = HandlePropertyPurchaseApproval(`https://realestate.api.sites.name.ng/purchases/properties/${propertyId}/`);



  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg w-full md:w-2/3 lg:w-1/2">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Property Purchase Approval Form</h2>

              <form onSubmit={approvePropertyPurchase} encType="multipart/form-data">
                
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={propertyPurchaseApproval.status}
                        onChange={handleFieldChange}
                        className="my-4 bg-purple-600 text-white w-1/2 border-none outline-none p-3 text-base sm:text-sm rounded-md"
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Agency Note:</label>
                  <textarea
                    id='agency_notes'
                    name='agency_notes'
                    placeholder='Enter your approval message here.'
                    value={propertyPurchaseApproval.agency_notes}
                    onChange={handleFieldChange}
                    className="w-full p-3 border border-gray-300 rounded outline-none"
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-800 text-white py-3 px-4 rounded hover:bg-purple-500 focus:outline-none focus:shadow-outline-blue"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ApprovePurchase