// Config object to be passed to Msal on creation
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_B2C_CLIENT_ID,
    authority: `https://sawadyprod.b2clogin.com/${process.env.REACT_APP_AZURE_AD_B2C_TENANT_ID}/b2c_1_zoom-clone-signup-signin`,
    knownAuthorities: ["sawadyprod.b2clogin.com", "localhost:3000"],
    redirectUri: "https://zoom.sawady.dev",
    postLogoutRedirectUri: "https://zoom.sawady.dev",
  },
  caches: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    secureCookies: false,
  },
};
