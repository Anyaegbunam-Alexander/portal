import React, { useState } from 'react';
import LoadingSpinner from '../../../components/loader/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const HandleAgentApproval = (apiEndpoint) => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const accessToken = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Pending');
  const [agentApplicationApproval, setagentApplicationApproval] = useState({
    status: '',
    agency_notes: '',
  });

  //Handle change in the values of user's input
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setagentApplicationApproval((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const approveAgent = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formDataObj = new FormData();
      
      formDataObj.append('status', agentApplicationApproval.status);
      formDataObj.append('agency_notes', agentApplicationApproval.agency_notes);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataObj,
      });


      if (response.ok) {
        alert('Agent is now Approved');
        navigate(`/${role}/agents`);
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
      alert("An Error Occured: Unable to approve agent", error);
    } finally {
      setIsLoading(false); // Set loading to false when the fetch operation completes
    }
  }

  return {
    isLoading,
    selectedOption,
    agentApplicationApproval,
    handleFieldChange,
    handleOptionChange,
    approveAgent,
  }

}

const AgentApplicationProfile = () => {
    const agentAppId = localStorage.getItem('agentApplicationId');

    console.log(agentAppId)
    const {
        isLoading,
        selectedOption,
        agentApplicationApproval,
        handleFieldChange,
        handleOptionChange,
        approveAgent,
    } = HandleAgentApproval(`https://realestate.api.sites.name.ng/agencies/agency-applications/${agentAppId}`);



  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg w-full md:w-2/3 lg:w-1/2">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Agent Approval Form</h2>

              <form onSubmit={approveAgent} encType="multipart/form-data">
                
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={agentApplicationApproval.status = selectedOption}
                        onChange={handleFieldChange}
                        className="my-4 bg-purple-600 text-white w-1/2 border-none p-3 text-base sm:text-sm rounded-md"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Agent Note:</label>
                  <textarea
                    id='agency_notes'
                    name='agency_notes'
                    placeholder='Enter your approval message here.'
                    value={agentApplicationApproval.agency_notes}
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
                  Approve application
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AgentApplicationProfile