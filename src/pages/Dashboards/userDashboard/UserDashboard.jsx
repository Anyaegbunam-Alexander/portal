import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
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
} from './index';

import { useStateContext } from '../../../contexts/ContextProvider';

const UserDashboard = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

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

                    {/* Dashboard */}
                    <a href="/user/overview">{<Overview />}</a>

                    {/* Pages */}
                    <a href="/user/properties">{<Properties />}</a>
                    <a href="/user/overview">{<Overview />}</a>
                    <a href="/user/orders">{<Orders />}</a>
                    <a href="/user/agents">{<Employees />}</a>
                    <a href="/user/customers">{<Customers />}</a>

                    {/* Apps */}
                    <a href="/user/kanban">{<Kanban />}</a>
                    <a href="/user/editor">{<Editor />}</a>
                    <a href="/user/calendar">{<Calendar />}</a>
                    <a href="/user/color-picker">{<ColorPicker />}</a>

                    {/* Charts */}
                    <a href="/user/line">{<Line />}</a>
                    <a href="/user/area">{<Area />}</a>
                    <a href="/user/bar">{<Bar />}</a>
                    <a href="/user/pie">{<Pie />}</a>
                    <a href="/user/financial">{<Financial />}</a>
                    <a href="/user/color-mapping">{<ColorMapping />}</a>
                    <a href="/user/pyramid">{<Pyramid />}</a>
                    <a href="/user/stacked">{<Stacked />}</a>

                </div>

                <Footer />
            </div>
        </div>
    </div>
  )
}

export default UserDashboard