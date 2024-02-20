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


const HandleAgentApplication = (apiEndpoint) => {

  const [getAgentApplication, setAgentApplication] = useState([]);

  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const accessToken = localStorage.getItem('token');

  // const employeesData = [
  //   {
  //     EmployeeID: 1,
  //     Name: 'Nancy Davolio',
  //     Title: 'Sales Representative',
  //     HireDate: '01/02/2021',
  //     State: 'USA',
  //     ReportsTo: 'Carson',
  //     EmployeeImage:
  //     profile.logo !== null ? profile.logo : "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=",
  //   }
  // ];

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
    { field: 'Title',
      headerText: 'Designation',
      width: '170',
      textAlign: 'Center',
    },
    { headerText: 'Country',
      width: '120',
      textAlign: 'Center',
      template: gridEmployeeState
    },
  
    { field: 'HireDate',
      headerText: 'Hire Date',
      width: '135',
      format: 'yMd',
      textAlign: 'Center' },
  
    { field: 'ReportsTo',
      headerText: 'Reports To',
      width: '120',
      textAlign: 'Center' },
    { field: 'EmployeeID',
      headerText: 'Employee ID',
      width: '125',
      textAlign: 'Center' },
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
      Name: `${agents.agent.last_name} ${agents.agent.first_name}`,
      Title: 'Sales Representative',
      HireDate: '01/02/2021',
      State: 'USA',
      ReportsTo: 'Carson',
      EmployeeImage:
      "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=",
    }
  });


  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl mt-16">
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