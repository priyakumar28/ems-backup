// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    authority: `${process.env.NEXT_PUBLIC_AZURE_AUTHORITY_URL}${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri: "/",
    postLogoutRedirectUri: "/login",
    navigateToLoginRequestUrl: false,
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: [`${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}/.default`]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = { 
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
