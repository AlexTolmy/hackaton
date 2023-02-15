import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { NavBar } from '../UIKit';

import { NavigationEndpoint } from './App.interface';
import AppNavigationItem from './AppNavigationItem';
import { APP_NAVIGATION_ITEMS } from './constants';

import styles from './App.module.css';

function AppNavigation() {
  return (
    <div className={styles.app_navigation}>
      <NavBar
        navigationItems={APP_NAVIGATION_ITEMS}
        renderNavigationItem={AppNavigationItem}
        className={styles.app_navigation_bar}
      />
      <Routes>
        <Route path={NavigationEndpoint.Home} element={null} />
        <Route
          path={NavigationEndpoint.Any}
          element={<Navigate to={NavigationEndpoint.Home} replace />}
        />
      </Routes>
    </div>
  );
}

export default AppNavigation;
