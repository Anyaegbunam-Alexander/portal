import React from 'react';
import { useParams } from 'react-router-dom';


const PurchaseProperty = () => {
  const { propertyId } = useParams();
  const { 
    propertyPurchaseNav,
  } = UsePropertyLogic(`https://realestate.api.sites.name.ng/properties/${propertyId}`);


  return (
    <div>
        <label>
            Customer Name:
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </label>
      <br />
      <label>
        Receipt File:
        <input type="file" onChange={(e) => setReceiptFile(e.target.files[0])} />
      </label>
      <br />
      <label>
        Referral Code:
        <input type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
      </label>
      <br />
      <button onClick={handlePurchase}>Submit Purchase</button>
    </div>
  )
}

export default PurchaseProperty