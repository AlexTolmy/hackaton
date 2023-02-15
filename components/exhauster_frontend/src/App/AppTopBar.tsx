import React from 'react';

import ThemeSwitcherContainer from '../Containers/ThemeSwitcherContainer';

import AppNavigation from './AppNavigation';

import styles from './App.module.css';

function AppTopBar() {
  const renderRightSideFn = () => <ThemeSwitcherContainer />;

  return (
    <TopBar
      className={styles.app_top_bar}
      RightSideRenderFn={renderRightSideFn}
    >
      <AppNavigation />
    </TopBar>
  );
}

export default AppTopBar;
