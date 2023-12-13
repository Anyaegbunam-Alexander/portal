import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import { ContextProvider } from './contexts/ContextProvider';
//import { AuthProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <AuthProvider>
    // </AuthProvider>
    <ContextProvider>
        <App />
    </ContextProvider>
);