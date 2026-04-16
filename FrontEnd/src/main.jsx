// index.js o App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { runtimeConfig } from './config/runtime';

// Inject tenant-specific styles before React renders
const p = runtimeConfig.primaryColor;
const s = runtimeConfig.secondaryColor;
const tenantStyle = document.createElement('style');
tenantStyle.textContent = [
  `:root { --tenant-primary: ${p}; --tenant-secondary: ${s}; --color-main: ${p}; }`,
  `.btn-primary { background-color: ${p} !important; border-color: ${p} !important; }`,
  `.btn-primary:hover,.btn-primary:focus,.btn-primary:active { background-color: ${s} !important; border-color: ${s} !important; }`,
  `.bg-primary, .navbar.bg-primary { background-color: ${p} !important; }`,
].join('\n');
document.head.appendChild(tenantStyle);

const root = ReactDOM.createRoot(document.getElementById('root'));
const appElement = runtimeConfig.authMode === 'google'
  ? (
      <GoogleOAuthProvider clientId={runtimeConfig.googleClientId}>
        <App />
      </GoogleOAuthProvider>
    )
  : <App />;

root.render(
  //<React.StrictMode>
    appElement
  //</React.StrictMode>
);