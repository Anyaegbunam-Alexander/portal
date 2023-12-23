import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import CustomerLogin from './components/login/customer/login';
import AgentLogin from './components/login/agent/agent';
import AgencyLogin from './components/login/agency/agency';
import Customer from './components/register/customer/customerRegistration';
import Agent from './components/register/agent/agent';
import Agency from './components/register/agency/agency';
import UserDashboard from './pages/Dashboards/userDashboard/UserDashboard';
import useLoginLogic from './components/login/methods';
import './app.css';

// const custApi = 'https://realestate.api.sites.name.ng/auth/customers/login/';
// const agentApi = 'https://realestate.api.sites.name.ng/auth/agents/login/';
// const agencyApi = 'https://realestate.api.sites.name.ng/auth/agencies/login/';

const App = () => {
  const { userLoggedIn } = useLoginLogic();
  //const { useHandleLogin } = useLoginLogic(custApi || agentApi || agencyApi);

  console.log(userLoggedIn);
  

  return (
    <Routes>
      <Route path="/*" element={true ? <UserDashboard/> : <CustomerLogin/>} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/agent" element={<AgentLogin />} />
      <Route path="/login/agency" element={<AgencyLogin />} />
      <Route path="/register/customer" element={<Customer />} />
      <Route path="/register/agent" element={<Agent />} />
      <Route path="/register/agency" element={<Agency />} />
    </Routes>
  );
}

export default App;
