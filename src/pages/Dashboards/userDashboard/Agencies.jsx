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
import house from '../../../assets/1.png';

const Agencies = () => {
  
  const {
    getAllAgencies,
    agenciesGrid,
  } = UsePropertyLogic('https://realestate.api.sites.name.ng/agencies/');

  const agenciesData = getAllAgencies; 

  // Map through agenciesData and transform each agency as needed
  const mappedData = agenciesData.map((agency) => {
    return {
      Profile: 'https://google.com',
      Name: agency.name,
      Email: agency.email,
      Address: agency.address.street_address,
      Country: agency.address.country,
      State: agency.address.state,
      EmployeeImage: house,
    };
  });
 
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Agencies"/>
      <GridComponent
        dataSource={mappedData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
      >
        <ColumnsDirective>
          {agenciesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[ Page, Search, Toolbar ]}/>
      </GridComponent>
    </div>
  )
}

export default Agencies;