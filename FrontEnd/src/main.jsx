// index.js o App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { runtimeConfig } from './config/runtime';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <GoogleOAuthProvider clientId={runtimeConfig.googleClientId}>
      <App />
    </GoogleOAuthProvider>
  //</React.StrictMode>
);