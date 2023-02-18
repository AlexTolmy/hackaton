import React from 'react';
import { useParams } from 'react-router';

import Panel from '../../Components/Panel';

import ExhausterChart from './ExhausterChart';
import ExhausterChartSensorsTable from './ExhausterChartSensorsTable';

import styles from './ExhausterChartContainer.module.css';

function ExhausterChartContainer() {
  const { exhausterName } = useParams();

  return (
    <div className={styles.exhauster_chart}>
      <ExhausterChartSensorsTable />
      <Panel title={exhausterName} className={styles.panel}>
        <ExhausterChart />
      </Panel>
    </div>
  );
}

export default ExhausterChartContainer;
