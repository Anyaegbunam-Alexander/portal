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
  } = UsePropertyLogic('https://realestate.api.sites.name.ng/purchases/properties/');

  const propertyPurchaseData = getAllPropertyPurchases; 

  console.log("Property new data: ", propertyPurchaseData);

  // Map through agenciesData and transform each agency as needed
  const mappedData = propertyPurchaseData.map((propertyPurchase) => {

    return {
      propertyID: propertyPurchase.property.id,
      PropertyName: propertyPurchase.property ? propertyPurchase.property.name || propertyPurchase.property.type : '',
      AgencyName: propertyPurchase.property.agency.name,
      TotalAmount: currencyFormatter.format(propertyPurchase.property.price),
      OrderItems: 'Fresh Tomato',
      Receipt: 'https://google.com',
      Status: propertyPurchase.status,
      StatusBg: '#FB9678',
      ProductImage: propertyPurchase.property.images.length > 0 ? propertyPurchase.property.images[0].image : '',
    };
  });


  // const propertyPurchaseData = [
  //   {
  //     OrderID: 10248,
  //     CustomerName: 'Vinet',
  //     TotalAmount: 32.38,
  //     OrderItems: 'Fresh Tomato',
  //     Location: 'USA',
  //     Status: 'pending',
  //     StatusBg: '#FB9678',
  //     ProductImage:
  //     'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
  //   },
  // ];


  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl mt-16">
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