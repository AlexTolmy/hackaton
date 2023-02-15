import React, { useEffect } from 'react';
import { useMatomo } from '@jonkoops/matomo-tracker-react';

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
    </div>
  );
}

export default App;
