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
      CustomerImage: customerInfo.customer.profile_picture !== null ? customerInfo.customer.profile_picture || customerInfo.property.interested_customers.profile_picture :
        'https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=',
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