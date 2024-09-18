import React from 'react';
import ReactDOM from 'react-dom'; // For react 17
// For react 18: import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://[YOUR_SUBDOMAIN].frontegg.com', // Login URL (WITHOUT /oauth) from Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page
  clientId: '[YOUR-CLIENT-ID]',                     // Client ID Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page
  appId: '[APPLICATION_ID]',   // ID from Frontegg Portal ➜ [ENVIRONMENT] ➜ Applications ➜ Your application


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