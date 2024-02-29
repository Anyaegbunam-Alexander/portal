import React from 'react';
import { GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Page,  
  Search,
  Toolbar,
  Inject 
} from '@syncfusion/ej2-react-grids';

import { Header } from '../../../components/dashboardComponents';
import UsePropertyLogic from '../methods';

const Agencies = () => {
  
  const {
    getAllAgencies,
    getAgentApprovalStatus,
    agenciesGridForAgent,
  } = UsePropertyLogic('https://realestate.api.sites.name.ng/agencies/');


  const agenciesData = getAllAgencies; 

  // Map through agenciesData and transform each agency as needed
  const mappedData = agenciesData.map((agency) => {
    return {
      Profile: agency.id,
      Apply: agency.id,
      Status: getAgentApprovalStatus,
      StatusBg: '#544A62',
      Name: agency.name,
      Email: agency.email,
      Address: agency.address.street_address,
      Country: agency.address.country,
      State: agency.address.state,
      EmployeeImage: agency.logo !== null ? agency.logo :
      'https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=',
    };
  });
 
  return (
    <div className="m-6 md:m-10 p-6 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Agencies"/>
      <GridComponent
        dataSource={mappedData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
      >
        <ColumnsDirective>
          {agenciesGridForAgent.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[ Page, Search, Toolbar ]}/>
      </GridComponent>
    </div>
  )
}

export default Agencies;