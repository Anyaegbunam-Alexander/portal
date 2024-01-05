import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { Navbar, Footer, SideBar,ThemeSettings } from '../../../components/dashboardComponents/index';
import {
  Properties, 
  Orders, 
  Calendar, 
  Employees, 
  Overview,
  Stacked, 
  Pyramid, 
  Customers,
  Line, 
  Kanban, 
  Area,
  Bar, 
  Pie, 
  Financial, 
  ColorPicker, 
  ColorMapping, 
  Editor
} from '../../Dashboards/index';

import { useStateContext } from '../../../contexts/ContextProvider';


const UserDashboard = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();
  // Get the navigate function from useNavigate
  const navigate = useNavigate();

  // useEffect to navigate to '/dashboard/overview' on component mount
  useEffect(() => {
    navigate('/dashboard/overview');
  }, [navigate]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                <TooltipComponent content="Settings" position='Top' onClick={() => setThemeSettings(true)}>
                    <button 
                        type='button'
                        className='text-3xl p-3 
                        hover:drop-shadow-xl
                        hover:bg-light-gray
                        text-white'
                        style={{
                            background: currentColor,
                            borderRadius: '50%',
                        }}
                    >
                        <FiSettings/>
                    </button>
                </TooltipComponent>
            </div>
            {activeMenu ? (
                <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                    <SideBar />
                </div>
            ) : (
                <div className='w-0 dark:bg-secondary-dark-bg'>
                    <SideBar />
                </div>
            )}
            <div className={
                `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
                ${activeMenu ? ' md:ml-72' :  'flex-2'}`
            }>
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                    <Navbar />
                </div> 
                <div>
                    {themeSettings && <ThemeSettings />}

                    <Routes>
                        {/* Dashboard */}
                        {/* <Route index element={<Navigate to='/dashboard/overview' />} /> */}
                        <Route path="/dashboard/properties" element={<Properties />} />
                        <Route path="/dashboard/overview" element={<Overview />} />


                        {/* Pages */}
                        <Route path="/dashboard/orders" element={<Orders />} />
                        <Route path="/dashboard/agents" element={<Employees />} />
                        <Route path="/dashboard/customers" element={<Customers />} />

                        {/* Apps */}
                        <Route path="/dashboard/kanban" element={<Kanban />} />
                        <Route path="/dashboard/editor" element={<Editor />} />
                        <Route path="/dashboard/calendar" element={<Calendar />} />
                        <Route path="/dashboard/color-picker" element={<ColorPicker />} />

                        {/* charts */}
                        <Route path="/dashboard/line" element={<Line />} />
                        <Route path="/dashboard/area" element={<Area />} />
                        <Route path="/dashboard/bar" element={<Bar />} />
                        <Route path="/dashboard/pie" element={<Pie />} />
                        <Route path="/dashboard/financial" element={<Financial />} />
                        <Route path="/dashboard/color-mapping" element={<ColorMapping />} />
                        <Route path="/dashboard/pyramid" element={<Pyramid />} />
                        <Route path="/dashboard/stacked" element={<Stacked />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </div>
    </div>
  )
}

export default UserDashboard