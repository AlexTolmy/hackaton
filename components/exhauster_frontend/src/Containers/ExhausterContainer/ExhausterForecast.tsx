import React from 'react';

import DateTimePicker from '../../Components/DateTimePicker';
import TextAnnotation from '../../Components/TextTitle/TextAnnotation';
import TextTitle from '../../Components/TextTitle/TextTitle';

import styles from './ExhausterContainer.module.css';

function ExhausterForecast() {
  return (
    <div className={styles.exhauster_rotor_forecast}>
      <h4>Последняя замена ротора</h4>
      <div className={styles.exhauster_rotor_date}>
        <TextTitle textContent="Ротор № 35к" />
        <DateTimePicker
          initialDate={new Date()}
          onNewDateSelect={() => {}}
          className={styles.exhauster_rotor_calendar}
        />
      </div>
      <div className={styles.exhauster_rotor_days}>
        <TextAnnotation value="Прошло" description="6 суток" />
        <TextAnnotation value="Прогноз" description="12 суток" />
      </div>
    </div>
  );
}

export default ExhausterForecast;
