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
      width: '190',
      textAlign: 'Center',
    },
    { headerText: 'State',
      width: '120',
      textAlign: 'Center',
      template: gridEmployeeState
    },
  
    { field: 'Phone',
      headerText: 'Phone Number',
      width: '170',
      textAlign: 'Center' 
    },
  
    { field: 'Status',
      headerText: 'Status',
      width: '120',
      textAlign: 'Center', 
      template: agentApprovalGridStatus,
    },
    { field: 'EmployeeID',
      headerText: 'Employee ID',
      width: '150',
      textAlign: 'Center' 
    },
    { field: 'Refcode',
      headerText: 'Referral Code',
      width: '170',
      textAlign: 'Center' 
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

const Agents = () => {

  const {
    employeesGrid,
    getAgentApplication,
  } = HandleAgentApplication('https://realestate.api.sites.name.ng/agencies/agents/');


  const agentsData = getAgentApplication; 

  // Map through agenciesData and transform each agency as needed
  const mappedData = agentsData.map((agent) => {
    return {
      EmployeeID: agent.id,
      Name: `${agent.last_name} ${agent.first_name}`,
      Email: agent.email,
      Phone: agent.phone_number,
      State: agent.address.state,
      Status: 'Approved',
      StatusBg: '#86BE59',
      Refcode: agent.referral_code,
      EmployeeImage: agent.profile_picture !== null ? agent.profile_picture : 
      "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=",
    }
  });


  return (
    <div className="m-6 md:m-10 p-6 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Agents"/>

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

export default Agents;