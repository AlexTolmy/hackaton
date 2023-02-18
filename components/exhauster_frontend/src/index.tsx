import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as RouterProvider } from 'react-router-dom';

import App from './App';
import getStoreInstance from './Store';

import(/* webpackPreload: true */ './index.css');

const storeInstance = getStoreInstance();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={storeInstance}>
      <RouterProvider>
        <App />
      </RouterProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
