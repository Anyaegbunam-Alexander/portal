import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import CustomerLogin from './components/login/customer/login';
import AgentLogin from './components/login/agent/agent';
import AgencyLogin from './components/login/agency/agency';
import Customer from './components/register/customer/customerRegistration';
import Agent from './components/register/agent/agent';
import Agency from './components/register/agency/agency';
import UserDashboard from './pages/Dashboards/userDashboard/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/errorPages/404';
import './app.css';

 const custApi = 'https://realestate.api.sites.name.ng/auth/customers/login/';
// const agentApi = 'https://realestate.api.sites.name.ng/auth/agents/login/';
// const agencyApi = 'https://realestate.api.sites.name.ng/auth/agencies/login/';

const App = () => {
  const navigate = useNavigate();  
  
  const Layout = () => {
    return (
      <ProtectedRoute>
        <Routes>
          <Route path="/*" element={<UserDashboard />} />
          {/* <Route index element={<Navigate to= '/dashboard/overview'/>} /> */}
        </Routes>
      </ProtectedRoute>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/agent" element={<AgentLogin />} />
      <Route path="/login/agency" element={<AgencyLogin />} />
      <Route path="/register/customer" element={<Customer />} />
      <Route path="/register/agent" element={<Agent />} />
      <Route path="/register/agency" element={<Agency />} />
      {/* 404 Route - Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
