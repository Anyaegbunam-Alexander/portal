import React from 'react';

import { GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Page, 
  Selection, 
  Inject, 
  Edit, 
  Toolbar,
  Sort, 
  Filter 
} from '@syncfusion/ej2-react-grids';

import { customersGrid } from '../../../data/dummy';
import { Header } from '../../../components/dashboardComponents';
import UsePropertyLogic from '../methods';



const Customers = () => {

  const {
    getAllPropertyPurchases,
    agencyCustomersGrid,
    currencyFormatter,
  } = UsePropertyLogic('https://realestate.api.sites.name.ng/purchases/properties/');

  const customersData = getAllPropertyPurchases;

  console.log("Customers new data: ", customersData);

  // Map through agenciesData and transform each agency as needed
  const mappedData = customersData.map((customerInfo) => {

    return {
      CustomerID: customerInfo.customer.id || customerInfo.property.interested_customers.id,
      CustomerName: customerInfo.customer.last_name || customerInfo.property.interested_customers.last_name,
      CustomerEmail: customerInfo.customer.email || customerInfo.property.interested_customers.email,
      CustomerImage: customerInfo ? customerInfo.customer.profile_picture || customerInfo.property.interested_customers.profile_picture :
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      PropertyName: customerInfo.property ? customerInfo.property.name || customerInfo.property.type : '',
      Status: customerInfo.status,
      StatusBg: '#494D56',
      Availability: new Date(customerInfo.property.availability).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      Price: currencyFormatter.format(customerInfo.property.price),
      Location: customerInfo.customer.address.state || customerInfo.property.interested_customers.address.state,
    };
  });



  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl mt-16">
      <Header category="Page" title="Customers"/>
      <h1>You have no custormers yet</h1>

      <GridComponent
        dataSource={mappedData}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{allowDeleting: true, allowEditing: true}}
        width="auto"
      >
        <ColumnsDirective>
          {agencyCustomersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[ Page, Toolbar, Selection, Edit, Sort, Filter ]}/>
      </GridComponent>
    </div>
  )
}

export default Customers