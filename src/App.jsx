import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate
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
import AgencyDashboard from './pages/Dashboards/agencyDashboard/agencyDashboard';


const App = () => {
  
  const role = localStorage.getItem('role');

  const DashboardsOptions = () => {
    if (role === 'customer') return <UserDashboard />
    if (role === 'agent') return <UserDashboard />
    if (role === 'agency') return <AgencyDashboard />
    else return null
  }
  
  const Layout = () => {
    return (
      <ProtectedRoute>
        <DashboardsOptions />
      </ProtectedRoute>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${role}/overview`} replace />} />
      <Route path={`/${role}/*`} element={<Layout />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/agent" element={<AgentLogin />} />
      <Route path="/login/agency" element={<AgencyLogin />} />
      <Route path="/register/customer" element={<Customer />} />
      <Route path="/register/agent" element={<Agent />} />
      <Route path="/register/agency" element={<Agency />} />

      {/* 404 Route - Catch-all */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
