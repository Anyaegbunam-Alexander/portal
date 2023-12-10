import React from 'react';
import './app.css';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/js/dist/modal";


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
import UserDashboard from './pages/Dashboards/userDashboard/UserDashboard'

const App = () => {
  

  const currentUser = true

  const Layout = () => {
    return (
      <UserDashboard />
    );
  }

  const ProtectedRoute = ({children}) =>  {
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