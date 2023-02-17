import React from 'react';

import AppNavigationBreadcrumbs from './AppNavigationBreadcrumbs';

import styles from './App.module.css';

function AppNavigation() {
  return (
    <div className={styles.app_navigation}>
      <AppNavigationBreadcrumbs />
    </div>
  );
}

export default AppNavigation;
