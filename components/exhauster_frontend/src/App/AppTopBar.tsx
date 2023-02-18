import React from 'react';
import { useSelector } from 'react-redux';

import ThemeSwitcherContainer from '../Containers/ThemeSwitcherContainer';
import { getLastUpdateDate } from '../Store/reducers/exhaustersMonitorReducer';
import { formatDateToString } from '../Store/utils/dateUtils';

import AppNavigation from './AppNavigation';

import styles from './App.module.css';

function AppTopBar() {
  const date = useSelector(getLastUpdateDate);

  return (
    <div className={styles.app_top_bar}>
      <AppNavigation />
      <div className={styles.app_top_bar_date}>
        {`Последняя дата обновления: ${formatDateToString(date)}`}
      </div>
      <ThemeSwitcherContainer />
    </div>
  );
}

export default AppTopBar;
