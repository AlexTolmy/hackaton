import React from 'react';
import { useSelector } from 'react-redux';

import Panel from '../../Components/Panel';
import { getAngloMachineExhaustersNamesSelector } from '../../Store/reducers/exhaustersMonitorReducer';
import ExhausterContainer from '../ExhausterContainer';

import styles from './MachineContainer.module.css';

type MachineContainerProps = {
  machineName: string;
};

function MachineContainer(props: MachineContainerProps) {
  const { machineName } = props;
  const exhaustersNames = useSelector(
    getAngloMachineExhaustersNamesSelector(machineName),
  );

  return (
    <Panel className={styles.machine} title={machineName}>
      <div className={styles.machine_body}>
        {exhaustersNames.map((name) => (
          <ExhausterContainer key={name} exhausterName={name} />
        ))}
      </div>
    </Panel>
  );
}

export default MachineContainer;
