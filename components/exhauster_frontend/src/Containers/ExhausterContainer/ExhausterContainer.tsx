import React from 'react';
import { useSelector } from 'react-redux';

import Panel from '../../Components/Panel';
import { getExhausterData } from '../../Store/reducers/exhaustersMonitorReducer';

import ExhausterActivityIndicator from './ExhausterActivityIndicator';
import ExhausterForecast from './ExhausterForecast';
import ExhausterGeneralSchemeButton from './ExhausterGeneralSchemeButton';
import ExhausterSensors from './ExhausterSensorsTable';

import styles from './ExhausterContainer.module.css';

type ExhausterContainerProps = {
  exhausterName: string;
};

function ExhausterContainer(props: ExhausterContainerProps) {
  const { exhausterName } = props;
  const exhausterData = useSelector(getExhausterData(exhausterName));
  const { rotorName, rotorLastChangeDate, rotorNextChangeDate, sensors } =
    exhausterData;

  return (
    <Panel
      className={styles.exhauster}
      title={exhausterName}
      titleLeftPart={
        <ExhausterActivityIndicator isActive={exhausterData.isActive} />
      }
      titleRightPart={
        <ExhausterGeneralSchemeButton exhausterName={exhausterName} />
      }
    >
      <ExhausterForecast
        rotorName={rotorName}
        lastChangeDate={rotorLastChangeDate}
        nextChangeDate={rotorNextChangeDate}
      />
      <ExhausterSensors sensors={sensors} />
    </Panel>
  );
}

export default ExhausterContainer;
