import React from 'react';
import { GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Page,  
  Search,
  Toolbar,
  Inject 
} from '@syncfusion/ej2-react-grids';

import { agenciesData, agenciesGrid } from '../../../data/dummy';
import { Header } from '../../../components/dashboardComponents';
import UsePropertyLogic from '../methods';

const Agencies = () => {
  
  const {
    getAllAgencies,
  } = UsePropertyLogic('https://realestate.api.sites.name.ng/agencies/');

  console.log(getAllAgencies)
 
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Agencies"/>
      <GridComponent
        dataSource={agenciesData}
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