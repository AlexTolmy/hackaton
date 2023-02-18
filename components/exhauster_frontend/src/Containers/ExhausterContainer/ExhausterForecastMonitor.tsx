import React, { useMemo } from 'react';
import { intervalToDuration } from 'date-fns';

import { IndicatorState } from './ExhausterContainer.interface';
import ExhausterForecastMonitorDay from './ExhausterForecastMonitorDay';

import styles from './ExhausterContainer.module.css';

type ExhausterForecastMonitorProps = {
  lastChangeDate: Date;
  nextChangeDate: Date;
};

function ExhausterForecastMonitor(props: ExhausterForecastMonitorProps) {
  const { lastChangeDate, nextChangeDate } = props;

  const goneDuration = intervalToDuration({
    start: lastChangeDate,
    end: new Date(),
  });

  const standDuration = intervalToDuration({
    start: lastChangeDate,
    end: nextChangeDate,
  });

  const state = useMemo(() => {
    if (standDuration.days - goneDuration.days <= 1) {
      return IndicatorState.Critical;
    }
    if (standDuration.days - goneDuration.days <= 3) {
      return IndicatorState.Warning;
    }

    return IndicatorState.Default;
  }, [goneDuration.days, standDuration.days]);

  return (
    <div className={styles.exhauster_rotor_days}>
      <ExhausterForecastMonitorDay
        title="Прошло"
        days={goneDuration.days.toString()}
      />
      <ExhausterForecastMonitorDay
        title="Прогноз"
        days={standDuration.days.toString()}
        state={state}
      />
    </div>
  );
}

export default ExhausterForecastMonitor;
