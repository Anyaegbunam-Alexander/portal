import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import './index.css';
import App from './App';

import { ContextProvider } from './contexts/ContextProvider';
import { AuthContextProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Switch>
            <ContextProvider>
                {/* <AuthContextProvider>
                </AuthContextProvider> */}
                <App />
            </ContextProvider>
        </Switch>
    </Router>
);