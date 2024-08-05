import './App.css';
import { useEffect, useState } from 'react';
import {
  AdminPortal,
  useAuth,
  useLoginWithRedirect,
  useAuthActions,
  useTenantsState,
  ContextHolder,
  useFeatureEntitlements, // checks whether a user is entitled to feature access.
  usePermissionEntitlements, // checks whether a user is entitled to permission.
  useEntitlements, // checks whether a user is entitled to a feature or permission.
  useIsAuthenticated,
  useStepUp,
  useIsSteppedUp
} from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const { switchTenant, requestHostedLoginAuthorizeV2 } = useAuthActions();
  const { tenants } = useTenantsState();  
  const loginWithRedirect = useLoginWithRedirect();
  const stepUp = useStepUp();
  const [stepUpState, setStepUpState] = useState()
  const MAX_AGE = 60 * 60;  // 60 seconds, use 60 * 60 for 1HR
  const isSteppedUp = useIsSteppedUp({ maxAge: MAX_AGE });
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false); // State to track admin portal status

  
  // Redirect from your app to the login box automatically
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({scope: 'openid email'});
    }
    // showAdminPortal()
  }, [isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "") {
        setIsAdminPortalOpen(false); // Admin portal is closed
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const showAdminPortal = () => {
    AdminPortal.show();
    setIsAdminPortalOpen(true); // Admin portal is opened
  };

  const logout = () => {
   const baseUrl = ContextHolder.getContext().baseUrl;
   window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const copyValue = (e) => {
    const val = e.target.value;
    navigator.clipboard.writeText(val);
    e.target.value = "copied!";
    setInterval(() => {
      e.target.value = val;
    }, 2000);
  };

  const Entitlements = () => {
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

    const { isEntitled: isFEntitledFF, justification: fJust3 } = useEntitlements({
      featureKey: "feature01",
    });
  
    // Check if any entitlement is present
    const hasEntitlement =
      isFEntitled || isPEntitled || isPEntitled2 || isFEntitled2;
  
    return (
      <>
        {isFEntitled && <div>A cool section</div>}
        {isPEntitled && <div>An awesome section</div>}
        {isPEntitled2 && <div>A mind-blowing section</div>}
        {isFEntitled2 && <div>Another section</div>}
        {isFEntitledFF && <div>Feature Flag on</div>}
        {!hasEntitlement && <div>No entitlements</div>}
      </>
    );
  };

  const switchTenantFromDropdown =(e) => {
    const selectedIndex = e.target.selectedIndex
    const newTenantId = tenants[selectedIndex].tenantId
    const newTenantName = tenants[selectedIndex].name
    console.log(`\n\n----\nSelected index:\n${selectedIndex}\n\nTenant name:\n${newTenantName}\n\nTenant ID:\n${newTenantId}`)
    switchTenant({ tenantId: newTenantId });
  }
  
  return (
    <div className="App">
      { isAuthenticated ? (
         <div className="user-zone">
          <img src={user.profilePictureUrl} alt={user.name} referrerPolicy="no-referrer"/>
          <span>{user.name}</span>

          <button onClick={() => logout()}>Logout</button>
          
          <button onClick={showAdminPortal}>Open Admin Portal</button>
          
          <div><br /><b>Active tenant id:</b></div>
          <textarea cols="35" onClick={(e) => {copyValue(e);}}>{user.tenantId}</textarea>
            

          <div><br /><b>User id:</b></div>
          <textarea cols="35" onClick={(e) => {copyValue(e);}}>{user.id}</textarea>
          
          <br/>


          <select className="tenant-selector" onChange={switchTenantFromDropdown}>
            {tenants.map((option, index) => (
              option.tenantId === user.tenantId ? 
              <option key={index} value={option.name} selected="selected">
                {option.name}
              </option>
              :
              <option key={index} value={option.name} >
                {option.name}
              </option>
            ))}
          </select>

          { isSteppedUp ? (
            <div>
              <br/>You are STEPPED UP!
            </div>
          ) : (
            <button onClick={() => {
              stepUp({ maxAge: MAX_AGE });
            }}>
              Step up MFA
            </button>
          )}

          <div><br /><b>Entitlements:</b></div>
          <Entitlements />
          
          <div><br /><b>JWT:</b></div>
          <textarea className="jwt" cols="70" rows="25" onClick={(e) => {copyValue(e);}}>{user.accessToken}</textarea>
          
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;
