import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import ExhaustersMonitorPage from '../Pages/ExhaustersMonitorPage';
import ExhausterSchemePage from '../Pages/ExhausterStatusPage';
import {
  wsConnectAction,
  wsDisconnectAction,
} from '../Store/websocket/websocketActions';

import { NavigationEndpoint } from './App.interface';
import AppTopBar from './AppTopBar';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectAction());

    return () => {
      dispatch(wsDisconnectAction());
    };
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppTopBar />
      <Routes>
        <Route
          path={NavigationEndpoint.Home}
          element={<ExhaustersMonitorPage />}
        />
        <Route
          path={NavigationEndpoint.ExhausterScheme}
          element={<ExhausterSchemePage />}
        />
        <Route
          path={NavigationEndpoint.Any}
          element={<Navigate to={NavigationEndpoint.Home} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
