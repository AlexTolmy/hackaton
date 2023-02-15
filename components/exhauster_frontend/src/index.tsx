import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as RouterProvider } from 'react-router-dom';
import { MatomoProvider } from '@jonkoops/matomo-tracker-react';

import keycloakServiceInstance from './Utils/keycloakService';
import reportWebVitals from './Utils/reportWebVitals';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import(/* webpackPreload: true */ './index.css');

function initApp(storeInstance, matomoInstance) {
  ReactDOM.render(
    <React.StrictMode>
      <ReduxProvider store={storeInstance}>
        <RouterProvider>
          <MatomoProvider value={matomoInstance}>
            <App />
          </MatomoProvider>
        </RouterProvider>
      </ReduxProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://cra.link/PWA
  serviceWorkerRegistration.register();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

keycloakServiceInstance.startApp(initApp);
