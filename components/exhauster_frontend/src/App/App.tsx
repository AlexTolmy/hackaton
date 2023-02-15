import React, { useEffect } from 'react';
import { useMatomo } from '@jonkoops/matomo-tracker-react';

import NotificationPanelContainer from '../Containers/NotificationPanelContainer';
import getTranslation from '../Utils/getTranslation';

import AppTopBar from './AppTopBar';

import styles from './App.module.css';

function App() {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({ documentTitle: getTranslation('mainPage') });
  }, [trackPageView]);

  return (
    <div className={styles.app}>
      <AppTopBar />
      <NotificationPanelContainer />
    </div>
  );
}

export default App;
