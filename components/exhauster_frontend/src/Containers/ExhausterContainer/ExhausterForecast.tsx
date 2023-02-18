import React from 'react';
import { intervalToDuration } from 'date-fns';

import DateTimePicker from '../../Components/DateTimePicker';
import TextAnnotation from '../../Components/TextTitle/TextAnnotation';
import TextTitle from '../../Components/TextTitle/TextTitle';

import styles from './ExhausterContainer.module.css';

type ExhausterForecastProps = {
  rotorName: string;
  lastChangeDate: Date;
  nextChangeDate: Date;
};

function ExhausterForecast(props: ExhausterForecastProps) {
  const { rotorName, lastChangeDate, nextChangeDate } = props;

  const goneDuration = intervalToDuration({
    start: lastChangeDate,
    end: new Date(),
  });

  const standDuration = intervalToDuration({
    start: new Date(),
    end: nextChangeDate,
  });

  return (
    <div className={styles.exhauster_rotor_forecast}>
      <h4>Последняя замена ротора</h4>
      <div className={styles.exhauster_rotor_date}>
        <TextTitle textContent={rotorName} />
        <DateTimePicker
          initialDate={lastChangeDate}
          onNewDateSelect={() => {}}
          className={styles.exhauster_rotor_calendar}
        />
      </div>
      <div className={styles.exhauster_rotor_days}>
        <TextAnnotation value="Прошло" description={goneDuration.days} />
        <TextAnnotation value="Прогноз" description={standDuration.days} />
      </div>
    </div>
  );
}

export default ExhausterForecast;
