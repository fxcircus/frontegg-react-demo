import React from 'react';
import ReactDOM from 'react-dom'; // For react 17
// For react 18: import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-frtqiefxjqn9.frontegg.com',
  clientId: '04017595-4e5d-4e7e-aff6-93c58d489d2f',


  tenantResolver: () => ({
    tenant: new URLSearchParams(window.location.search).get("organization"),
  }),
};


const authOptions = {
 keepSessionAlive: true // refreshes the JWT once it reaches 80% expiration time
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