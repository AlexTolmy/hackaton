import React from 'react';
import { useSelector } from 'react-redux';

import DateTickTimer from '../Components/DateTickTimer';
import ThemeSwitcherContainer from '../Containers/ThemeSwitcherContainer';
import {
  getLastUpdateDate,
  getSensorsDataUpdateDate,
} from '../Store/reducers/exhaustersMonitorReducer';
import { formatDateToString } from '../Store/utils/dateUtils';

import AppNavigation from './AppNavigation';

import styles from './App.module.css';

function AppTopBar() {
  const sensorDate = useSelector(getLastUpdateDate);
  const sensorDataDate = useSelector(getSensorsDataUpdateDate);

  const isTimerVisible = !!sensorDate && !!sensorDataDate;

  return (
    <div className={styles.app_top_bar}>
      <AppNavigation />
      {isTimerVisible && (
        <div className={styles.app_top_bar_date}>
          <div className={styles.app_top_bar_date_timer}>
            Данные обновлены
            <DateTickTimer
              timeDates={{
                start: sensorDate,
                current: sensorDataDate,
                end: sensorDate,
              }}
            />
            сек. назад
          </div>
          <div className={styles.date}>{formatDateToString(sensorDate)}</div>
        </div>
      )}

      <ThemeSwitcherContainer />
    </div>
  );
}

export default AppTopBar;
