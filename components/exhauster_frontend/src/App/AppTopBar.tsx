import React from 'react';
import { useSelector } from 'react-redux';

import DateTickTimer from '../Components/DateTickTimer';
import ThemeSwitcherContainer from '../Containers/ThemeSwitcherContainer';
import { getLastUpdateDate } from '../Store/reducers/exhaustersMonitorReducer';

import AppNavigation from './AppNavigation';

import styles from './App.module.css';

function AppTopBar() {
  const date = useSelector(getLastUpdateDate);

  return (
    <div className={styles.app_top_bar}>
      <AppNavigation />
      <div className={styles.app_top_bar_date}>
        Данные обновлены
        <DateTickTimer timeDates={{ start: date, current: date, end: date }} />
        сек. назад
      </div>
      <ThemeSwitcherContainer />
    </div>
  );
}

export default AppTopBar;
