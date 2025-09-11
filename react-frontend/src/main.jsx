import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './state/store.js';
import { AuthProvider } from '@asgardeo/auth-react';

const asgardeoConfig = {
  signInRedirectURL: window.location.origin + "/login",
  signOutRedirectURL: window.location.origin + "/login",
  clientID: "tSsbf7iJjqTXHgljhT_KOjr6TRga",
  baseUrl: "https://api.asgardeo.io/t/orgt1ayt",
  scope: ["openid", "profile", "email", "address", "phone"]
};

createRoot(document.getElementById('root')).render(
  <Fragment>
    <AuthProvider config={asgardeoConfig}>
      <Provider store={store} >
        <App />
      </Provider>
    </AuthProvider>
  </Fragment>,
)
