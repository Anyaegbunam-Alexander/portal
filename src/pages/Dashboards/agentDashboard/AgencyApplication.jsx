import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/loader/LoadingSpinner';


const UseHandleAgentApplication = (apiEndpoint) => {

  // variables
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const accessToken = localStorage.getItem('token');
  const agencyId = localStorage.getItem('agencyId');

  const [isLoading, setIsLoading] = useState(false);
  const [agentApplicationData, setagentApplicationData] = useState({
    agency: '',
    notes: '',
  });

  //Handle change in the values of user's input
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setagentApplicationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const applyAgency = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formDataObj = new FormData();
      
      formDataObj.append('agency', agentApplicationData.agency);
      formDataObj.append('notes', agentApplicationData.notes);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataObj,
      });

      if (response.ok) {
        alert('Agency Application successful');
        navigate(`/${role}/agencies`);
      } else{
        alert("An Error Occured: Unable to apply to Agency");
      }


      if (!response.ok) {
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
      alert("An Error Occured: Unable to apply to Agency", error);
    } finally {
      setIsLoading(false); // Set loading to false when the fetch operation completes
    }
  }

  return {
    isLoading,
    agentApplicationData,
    agencyId,
    handleFieldChange,
    applyAgency,
  }
}


const AgencyApplication = () => {

  const {
    isLoading,
    agentApplicationData,
    agencyId,
    handleFieldChange,
    applyAgency,
  } = UseHandleAgentApplication('https://realestate.api.sites.name.ng/agents/agency-applications/');


  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg w-full md:w-2/3 lg:w-1/2">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Agency Application Form</h2>

              <form onSubmit={applyAgency} encType="multipart/form-data">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Agency Id:</label>
                  <input
                    type="text"
                    id='agency'
                    name='agency'
                    value={agentApplicationData.agency = agencyId}
                    onChange={handleFieldChange}
                    className="w-full p-3 border border-gray-300 rounded outline-none"
                    required
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Agent Note:</label>
                  <textarea
                    id='notes'
                    name='notes'
                    placeholder='Enter your application message here.'
                    value={agentApplicationData.notes}
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
                  Submit Purchase
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AgencyApplication