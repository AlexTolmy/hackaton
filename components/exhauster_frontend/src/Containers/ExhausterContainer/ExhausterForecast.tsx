import React from 'react';

import DateTimePicker from '../../Components/DateTimePicker';
import TextTitle from '../../Components/TextTitle/TextTitle';

import ExhausterForecastMonitor from './ExhausterForecastMonitor';

import styles from './ExhausterContainer.module.css';

type ExhausterForecastProps = {
  rotorName: string;
  lastChangeDate: Date;
  nextChangeDate: Date;
};

function ExhausterForecast(props: ExhausterForecastProps) {
  const { rotorName, lastChangeDate, nextChangeDate } = props;

  return (
    <div className={styles.exhauster_rotor_forecast}>
      <div className={styles.exhauster_rotor_data}>
        <TextTitle className={styles.rotor_name} textContent={rotorName} />
        <div className={styles.exhauster_rotor_calendar_container}>
          <h4>Последняя замена</h4>
          <DateTimePicker
            initialDate={lastChangeDate}
            onNewDateSelect={() => {}}
            className={styles.exhauster_rotor_calendar}
          />
        </div>
      </div>
      <ExhausterForecastMonitor
        lastChangeDate={lastChangeDate}
        nextChangeDate={nextChangeDate}
      />
    </div>
  );
}

export default ExhausterForecast;
