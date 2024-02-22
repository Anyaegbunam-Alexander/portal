import React, { useEffect, useState } from 'react';
import { GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Page,  
  Search,
  Toolbar,
  Inject 
} from '@syncfusion/ej2-react-grids';

import { Header } from '../../../components/dashboardComponents';
import { useNavigate } from 'react-router-dom';
import { GrLocation } from 'react-icons/gr';
import { useStateContext } from '../../../contexts/ContextProvider';


const HandleAgentApplication = (apiEndpoint) => {

  const [getAgentApplication, setAgentApplication] = useState([]);
  const { currentColor } = useStateContext();


  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const accessToken = localStorage.getItem('token');

  const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.EmployeeImage}
        alt="employee"
      />
      <p>{props.Name}</p>
    </div>
  );

  const gridEmployeeState = (props) => (
    <div className="flex items-center justify-center gap-2">
      <GrLocation />
      <span>{props.State}</span>
    </div>
  );

  const gridViewAgentApplicationBtn = (props) => (
    <div className="flex items-center justify-center gap-2">
      <button
        className='py-3 w-full text-white outline-none rounded-lg'
        style={{backgroundColor: currentColor}}
        formTarget='_blank'
        onClick={() => {
          localStorage.setItem('agentApplicationId', props.ApplicationID)
          navigate(`/agencies/agency-applications/${props.ApplicationID}/`)
        }}
      >
        Take Decision
      </button>
    </div>
  );


  const agentApprovalGridStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.Status}</p>
    </div>
  );

  const employeesGrid = [
    { headerText: 'Employee',
      width: '150',
      template: gridEmployeeProfile,
      textAlign: 'Center' 
    },
    { field: 'Name',
      headerText: '',
      width: '0',
      textAlign: 'Center',
    },
    { field: 'Email',
      headerText: 'Email',
      width: '170',
      textAlign: 'Center',
    },
    { headerText: 'Country',
      width: '120',
      textAlign: 'Center',
      template: gridEmployeeState
    },
  
    { field: 'ApplicationDate',
      headerText: 'Application Date',
      width: '170',
      format: 'yMd',
      textAlign: 'Center' },
  
    { field: 'Status',
      headerText: 'Status',
      width: '120',
      textAlign: 'Center', 
      template: agentApprovalGridStatus,
    },
    { field: 'EmployeeID',
      headerText: 'Employee ID',
      width: '125',
      textAlign: 'Center' 
    },
    { field: 'ApplicationID',
      headerText: 'Application ID',
      width: '125',
      textAlign: 'Center' 
    },
    { 
      headerText: 'View Application',
      width: '150',
      textAlign: 'Center',
      template: gridViewAgentApplicationBtn,
    },
  ];


 useEffect(() => {
  const getAllAgentApplication = async () => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      
      console.log(data)
      setAgentApplication(data.results);
    } catch (error) {
      console.error('Error getting agent Application:', error);
    } 
  }

  getAllAgentApplication();
 }, [apiEndpoint, accessToken])
 

  return{
    employeesGrid,
    getAgentApplication,
  }

}

const Employees = () => {

  const {
    employeesGrid,
    getAgentApplication,
  } = HandleAgentApplication('https://realestate.api.sites.name.ng/agencies/agency-applications/');

  console.log('test', getAgentApplication);


  const agentsData = getAgentApplication; 

  // Map through agenciesData and transform each agency as needed
  const mappedData = agentsData.map((agents) => {
    return {
      EmployeeID: agents.agent.id,
      ApplicationID: agents.id,
      Name: `${agents.agent.last_name} ${agents.agent.first_name}`,
      Email: agents.agent.email,
      ApplicationDate: new Date(agents.created).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      State: agents.agent.address.state,
      Status: agents.status,
      StatusBg: agents.status === 'rejected' ? '#EF072F' : agents.status === 'approved' ? '#86BE59' : '#544A62',
      EmployeeImage: agents.agent.profile_picture !== null ? agents.agent.profile_picture : 
      "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=",
    }
  });


  return (
    <div className="m-6 md:m-10 p-6 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Agents"/>
      <h1>Coming soon</h1>
      <GridComponent
        dataSource={mappedData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[ Page, Search, Toolbar ]}/>
      </GridComponent>
    </div>
  )
}

export default Employees