import React from 'react';
import clsx from 'clsx';

import { IndicatorState } from './ExhausterContainer.interface';

import styles from './ExhausterContainer.module.css';

type ExhausterForecastMonitorDayProps = {
  title: string;
  days: string;
  state?: IndicatorState;
};

function ExhausterForecastMonitorDay(props: ExhausterForecastMonitorDayProps) {
  const { title, days, state } = props;

  return (
    <div className={clsx(styles.forecast_day, state)}>
      <h5>{title}</h5>
      <p>{days}</p>
    </div>
  );
}

export default ExhausterForecastMonitorDay;
