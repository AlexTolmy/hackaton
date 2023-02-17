import React from 'react';

import Panel from '../../Components/Panel';

import ExhausterForecast from './ExhausterForecast';
import ExhausterSensors from './ExhausterSensorsTable';

import styles from './ExhausterContainer.module.css';

function ExhausterContainer() {
  return (
    <Panel className={styles.exhauster} title="Эксгаустер У-171">
      <ExhausterForecast />
      <ExhausterSensors />
    </Panel>
  );
}

export default ExhausterContainer;
