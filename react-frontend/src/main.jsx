import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './state/store.js';

createRoot(document.getElementById('root')).render(
  <Fragment>
    <Provider store={store} >
      <App />
    </Provider>
  </Fragment>,
)
