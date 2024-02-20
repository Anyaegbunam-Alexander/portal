import React from 'react';
import { GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Page,  
  Search,
  Toolbar,
  Inject 
} from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../../../data/dummy';
import { Header } from '../../../components/dashboardComponents';

const Employees = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Agents"/>
      <h1>Coming soon</h1>
      <GridComponent
        dataSource={employeesData}
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