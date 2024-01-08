# Frontegg - Hosted Login + React SDK + Entitlements

Implementation of the [Hosted Login Integration (React)](https://docs.frontegg.com/docs/react-hosted-login-guide).
And [Entitlements Integration (React)](https://docs.frontegg.com/docs/react-hosted-login-guide).

## How to run

- Open `index.js`, add your Client ID and API Key from `Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page`:

```
const contextOptions = {
  baseUrl: 'https://[YOUR_SUBDOMAIN].frontegg.com',
  clientId: '[YOUR-CLIENT-ID]'
};
```

- Open `App.js`, replace `"test"` with the Feature name you set in the Frontegg Portal:
```
const { isEntitled: isFEntitled, justification: fJust } =
      useFeatureEntitlements("test");
  
    const { isEntitled: isPEntitled, justification: pJust } =
      usePermissionEntitlements("test");
  
    const { isEntitled: isPEntitled2, justification: pJust2 } = useEntitlements({
      permissionKey: "test",
    });
  
    const { isEntitled: isFEntitled2, justification: fJust2 } = useEntitlements({
      featureKey: "test",
    });
```
- Run `npm install` and then `npm start`
- Open your browser and navigate to `http://localhost:3000`
