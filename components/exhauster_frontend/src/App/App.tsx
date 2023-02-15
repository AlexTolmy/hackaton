import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  wsConnectAction,
  wsDisconnectAction,
} from '../Store/websocket/websocketActions';
import getTranslation from '../Utils/getTranslation';

import AppTopBar from './AppTopBar';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = getTranslation('violationsMonitor');
    dispatch(wsConnectAction());

    return () => {
      dispatch(wsDisconnectAction());
    };
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppTopBar />
    </div>
  );
}

export default App;
