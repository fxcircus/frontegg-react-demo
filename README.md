# Frontegg - Hosted Login React integration

Reference documentation - [Hosted Login Integration (React)](https://docs.frontegg.com/docs/react-hosted-login-guide).

## How to run

### Frontegg account setup
Signup for a Frontegg account
- EU ➜ https://portal.frontegg.com
- US ➜ https://portal.us.frontegg.com
- CA ➜ https://portal.ca.frontegg.com
- AU ➜ https://portal.au.frontegg.com

### Code setup

1. Clone the repo & install the dependencies
```
git clone https://github.com/fxcircus/frontegg-react-demo.git leaddevnyc_frontegg_challenge

cd leaddevnyc_frontegg_challenge

npm i
```

2. In your IDE, navigate to `src/index.js`. Add your Client ID and API Key from `Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page`:

```
const contextOptions = {
  baseUrl: 'https://[YOUR_SUBDOMAIN].frontegg.com',
  clientId: '[YOUR-CLIENT-ID]'
};
```

- Open your browser and navigate to `http://localhost:3000`
