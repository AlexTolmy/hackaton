import React from 'react';

import TopBar from '../Components/TopBar';
import ThemeSwitcherContainer from '../Containers/ThemeSwitcherContainer';

import AppNavigation from './AppNavigation';

import styles from './App.module.css';

function AppTopBar() {
  return (
    <div className={styles.app_top_bar}>
      <AppNavigation />
      <ThemeSwitcherContainer />
    </div>
  );
}

export default AppTopBar;
