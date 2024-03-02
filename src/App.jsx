import React from 'react';
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
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/errorPages/404';
import './app.css';
import UserDashboard from './pages/Dashboards/userDashboard/UserDashboard';
import AgentDashboard from './pages/Dashboards/agentDashboard/AgentDashboard';
import AgencyDashboard from './pages/Dashboards/agencyDashboard/agencyDashboard';
import { PropertyDetails } from './pages/Dashboards/agencyDashboard';
import PurchaseProperty from './pages/Dashboards/PurchaseProperty';
import GetAgencyProfile from './pages/Dashboards/GetAgencyProfile';
import AgencyApplication from './pages/Dashboards/agentDashboard/AgencyApplication';
import AgentApplicationProfile from './pages/Dashboards/agencyDashboard/AgentApplicationProfile';
import ApprovePurchase from './pages/Dashboards/agencyDashboard/ApprovePurchase';
import EditProfile from './pages/Dashboards/userDashboard/EditProfile';
import EditAgencyProfile from './pages/Dashboards/agencyDashboard/EditAgencyProfile';
import EditAgentProfile from './pages/Dashboards/agentDashboard/EditProfile';


const App = () => {
  
  const role = localStorage.getItem('role');

  const DashboardsOptions = () => {
    if (role === 'customer') return <UserDashboard />
    if (role === 'agent') return <AgentDashboard />
    if (role === 'agency') return <AgencyDashboard />
    else return <CustomerLogin />
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


      {/* Show single property */}
      <Route path={`/${role}/purchases/properties/`} element={<PurchaseProperty />} />
      <Route path={`/agents/agency-applications/`} element={<AgencyApplication />} />
      <Route path={`/${role}/listings/show-property/:propertyId`} element={<PropertyDetails />} />
      <Route path={`/agencies/agency-applications/:id/`} element={<AgentApplicationProfile />} />
      <Route path={`/${role}/agencies/:id/`} element={<GetAgencyProfile />} />
      <Route path={`/${role}/purchases/properties/:id/`} element={<ApprovePurchase />} />
      <Route path={`/${role}/customers/profile/`} element={<EditProfile />} />
      <Route path={`/${role}/agencies/profile/`} element={<EditAgencyProfile />} />
      <Route path={`/${role}/agents/profile/`} element={<EditAgentProfile />} />


      {/* 404 Route - Catch-all */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
