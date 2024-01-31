import React from 'react';
import { useParams } from 'react-router-dom';
import UsePropertyLogic from './methods';


const PurchaseProperty = () => {
  const { propertyId } = useParams();
  const { 
    property,
    navigate,
    navOptions,
    propertyPurchaseNav,
  } = UsePropertyLogic(`https://realestate.api.sites.name.ng/purchases/properties/`);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg w-full md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-6 text-center">Property Purchase Form</h2>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Customer Name:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Note:</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded outline-none"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Referral Code:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Receipt:</label>
            <input
              type="file"
              accept="image/*,application/pdf" // adjust file types as needed
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-3 px-4 rounded hover:bg-purple-500 focus:outline-none focus:shadow-outline-blue"
            onClick={() => {
                alert("This feature is currently under maintenance");
                navigate(navOptions());
            }}
          >
            Submit Purchase
          </button>
        </form>
      </div>
    </div>
  )
}

export default PurchaseProperty