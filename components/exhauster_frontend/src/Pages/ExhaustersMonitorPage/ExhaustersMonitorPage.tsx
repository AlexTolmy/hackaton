import React from 'react';

import Panel from '../../Components/Panel';
import MachinesMonitorContainer from '../../Containers/MachinesMonitorContainer';

function ExhaustersMonitorPage() {
  return (
    <div>
      <Panel title="Прогнозная аналитика эксгаустеров">
        <MachinesMonitorContainer />
      </Panel>
    </div>
  );
}

export default ExhaustersMonitorPage;
