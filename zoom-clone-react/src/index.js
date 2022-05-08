import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// MSAL imports
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const container = document.getElementById("root");
const root = createRoot(container);
const msalInstance = new PublicClientApplication(msalConfig);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App pca={msalInstance} />
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
