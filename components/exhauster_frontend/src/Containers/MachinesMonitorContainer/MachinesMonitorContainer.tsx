import React from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../Components/Spinner/Spinner';
import { getAngloMachinesNamesSelector } from '../../Store/reducers/exhaustersMonitorReducer';
import MachineContainer from '../MachineContainer';

import styles from './MachinesMonitorContainer.module.css';

function MachinesMonitorContainer() {
  const angloMachinesNames = useSelector(getAngloMachinesNamesSelector);

  return (
    <div className={styles.monitor}>
      {angloMachinesNames?.length > 0 ? (
        angloMachinesNames.map((machine) => (
          <MachineContainer key={machine} machineName={machine} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default MachinesMonitorContainer;
