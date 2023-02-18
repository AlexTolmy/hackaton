/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router';

import Panel from '../../Components/Panel';

import ExhausterGeneralScheme from './ExhausterGeneralScheme';

import styles from './ExhausterGeneralScheme.module.css';

function ExhausterGeneralSchemeContainer() {
  const { exhausterName } = useParams();

  return (
    <Panel className={styles.general_scheme_container} title={exhausterName}>
      <ExhausterGeneralScheme exhausterName={exhausterName} />
    </Panel>
  );
}

export default ExhausterGeneralSchemeContainer;
