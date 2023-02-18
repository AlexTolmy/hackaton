import React from 'react';
import { useNavigate } from 'react-router-dom';

import { NavigationEndpoint, NavigationParams } from '../../App/App.interface';
import { getRoute } from '../../App/utils';
import Button from '../../Components/Button';

import styles from './ExhausterContainer.module.css';

type ExhausterGeneralSchemeButtonProps = { exhausterName: string };

function ExhausterGeneralSchemeButton(
  props: ExhausterGeneralSchemeButtonProps,
) {
  const { exhausterName } = props;
  const navigate = useNavigate();

  const handleOpenScheme = () => {
    navigate(
      getRoute(
        NavigationEndpoint.ExhausterScheme,
        NavigationParams.ExhausterName,
        exhausterName,
      ),
    );
  };

  return (
    <Button className={styles.scheme_button} onClick={handleOpenScheme}>
      Состояние
    </Button>
  );
}

export default ExhausterGeneralSchemeButton;
