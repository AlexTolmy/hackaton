/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router';

import Panel from '../../Components/Panel';

import ExhausterGeneralScheme from './ExhausterGeneralScheme';

function ExhausterGeneralSchemeContainer() {
  const { exhausterName } = useParams();

  return (
    <Panel title={exhausterName}>
      <ExhausterGeneralScheme exhausterName={exhausterName} />
    </Panel>
  );
}

export default ExhausterGeneralSchemeContainer;
