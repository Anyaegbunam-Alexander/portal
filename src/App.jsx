import React from 'react';
import './app.css';


//react-router
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";



//pages
import CustomerLogin from './components/login/customer/login';
import AgentLogin from './components/login/agent/agent';
import AgencyLogin from './components/login/agency/agency';
import Customer from './components/register/customer/customerRegistration';
import Agent from './components/register/agent/agent';
import Agency from './components/register/agency/agency';
import UserDashboard from './pages/Dashboards/userDashboard/UserDashboard';

import { useAuth } from './contexts/AuthContext';


const App = () => {

  //const { user } = useAuth();
  

  const currentUser = true;
  //console.log(currentUser);

  const Layout = () => {
    return (
      <UserDashboard />
    );
  }

  const ProtectedRoute = ({children}) =>  {
    //console.log('Current User:', currentUser);
    if(!currentUser) {
      return <Navigate to='/login/customer'/>
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/*",
      element: 
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
    },
    {
      path: "/login/customer",
      element: <CustomerLogin />,
    },
    {
      path: "/login/agent",
      element: <AgentLogin />,
    },
    {
      path: "/login/agency",
      element: <AgencyLogin />,
    },
    {
      path: "/register/customer",
      element: <Customer />,
    },
    {
      path: "/register/agent",
      element: <Agent />,
    },
    {
      path: "/register/agency",
      element: <Agency />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;