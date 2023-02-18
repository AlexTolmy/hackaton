import React from 'react';

import Panel from '../../Components/Panel';
import MachinesMonitorContainer from '../../Containers/MachinesMonitorContainer';

import styles from './ExhaustersMonitorPage.module.css';

function ExhaustersMonitorPage() {
  return (
    <div className={styles.page}>
      <Panel title="Прогнозная аналитика эксгаустеров">
        <MachinesMonitorContainer />
      </Panel>
    </div>
  );
}

export default ExhaustersMonitorPage;
