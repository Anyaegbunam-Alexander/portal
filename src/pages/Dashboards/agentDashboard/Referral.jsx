import React from 'react';
import { GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Resize, 
  Sort, 
  ContextMenu, 
  Filter, 
  Page, 
  ExcelExport, 
  PdfExport, 
  Edit, 
  Inject 
} from '@syncfusion/ej2-react-grids';

import { ordersData, ordersGrid } from '../../../data/dummy';
import { Header } from '../../../components/dashboardComponents';

const Referral = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Referral Link"/>
      <GridComponent
        id='gridcomp'
        dataSource={ordersData}
        allowPaging
        allowSorting
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, ContextMenu, ExcelExport, PdfExport, Sort, Edit, Page, Filter ]}/>
      </GridComponent>
    </div>
  )
}

export default Referral;