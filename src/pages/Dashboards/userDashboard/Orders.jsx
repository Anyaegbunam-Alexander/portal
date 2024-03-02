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


import { Header } from '../../../components/dashboardComponents';
import UsePropertyLogic from '../methods';


const Orders = () => {
  const {
    getAllPropertyPurchases,
    propertyPurchaseGrid,
    currencyFormatter,
  } = UsePropertyLogic('https://realestate.api.mvcsites.name.ng/purchases/properties/');

  const propertyPurchaseData = getAllPropertyPurchases; 

  console.log("Property new data: ", propertyPurchaseData);

  // Map through agenciesData and transform each agency as needed
  const mappedData = propertyPurchaseData.map((propertyPurchase) => {

    return {
      propertyID: propertyPurchase.property.id,
      agencyNote: propertyPurchase.agency_notes,
      PropertyName: propertyPurchase.property ? propertyPurchase.property.name || propertyPurchase.property.type : '',
      AgencyName: propertyPurchase.property.agency.name,
      TotalAmount: currencyFormatter.format(propertyPurchase.property.price),
      Receipt: '/customer/orders',
      Status: propertyPurchase.status,
      StatusBg: propertyPurchase.status === 'rejected' ? '#EF072F' : propertyPurchase.status === 'approved' ? '#86BE59' : '#544A62',
      ProductImage: propertyPurchase.property.images.length > 0 ? propertyPurchase.property.images[0].image : '',
    };
  });




  return (
    <div className="m-6 md:m-10 p-6 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Orders"/>
      
      <GridComponent
        id='gridcomp'
        dataSource={mappedData}
        allowPaging
        allowSorting
      >
        <ColumnsDirective>
          {propertyPurchaseGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, ContextMenu, ExcelExport, PdfExport, Sort, Edit, Page, Filter ]}/>
      </GridComponent>
    </div>
  )
}

export default Orders