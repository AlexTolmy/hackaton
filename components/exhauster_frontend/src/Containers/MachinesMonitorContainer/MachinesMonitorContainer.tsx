import React from 'react';
import { useSelector } from 'react-redux';

import { getAngloMachinesNamesSelector } from '../../Store/reducers/exhaustersMonitorReducer';
import MachineContainer from '../MachineContainer';

import styles from './MachinesMonitorContainer.module.css';

function MachinesMonitorContainer() {
  const angloMachinesNames = useSelector(getAngloMachinesNamesSelector);

  return (
    <div className={styles.monitor}>
      {angloMachinesNames.map((machine) => (
        <MachineContainer key={machine} machineName={machine} />
      ))}
    </div>
  );
}

export default MachinesMonitorContainer;
