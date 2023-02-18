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
    <div className={styles.machine}>
      <Panel className={styles.machine_panel} title={machineName}>
        <div className={styles.machine_body}>
          {exhaustersNames.map((name) => (
            <ExhausterContainer key={name} exhausterName={name} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default MachineContainer;
