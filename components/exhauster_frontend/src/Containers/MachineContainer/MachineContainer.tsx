import React from 'react';

import Panel from '../../Components/Panel';
import ExhausterContainer from '../ExhausterContainer';

import styles from './MachineContainer.module.css';

function MachineContainer() {
  return (
    <Panel className={styles.machine} title="Агломашина №1">
      <div className={styles.machine_body}>
        <ExhausterContainer />
        <ExhausterContainer />
      </div>
    </Panel>
  );
}

export default MachineContainer;
