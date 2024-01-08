import React from 'react';
import ReactDOM from 'react-dom'; // For react 17
// For react 18: import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://[YOUR_SUBDOMAIN].frontegg.com',
  clientId: '[YOUR-CLIENT-ID]'
};


const authOptions = {
 // keepSessionAlive: true // Uncomment this in order to maintain the session alive
};

// For react 18: 
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
ReactDOM.render(
    <FronteggProvider 
      contextOptions={contextOptions}
      hostedLoginBox={true}
      authOptions={authOptions}
      entitlementsOptions={{ enabled: true }}
    >
        <App />
    </FronteggProvider>,
    document.getElementById('root')
);