import React from 'react';

import MachineContainer from '../MachineContainer';

import styles from './MachinesMonitorContainer.module.css';

function MachinesMonitorContainer() {
  return (
    <div className={styles.monitor}>
      <MachineContainer />
      <MachineContainer />
      <MachineContainer />
    </div>
  );
}

export default MachinesMonitorContainer;
