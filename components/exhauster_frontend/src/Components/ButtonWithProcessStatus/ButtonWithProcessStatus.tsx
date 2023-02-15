import React from 'react';
import clsx from 'clsx';

import { Button, Spinner } from '../../UIKit';

import {
  ButtonState,
  ButtonWithProcessStatusProps,
} from './ButtonWithProcessStatus.interface';

import styles from './ButtonWithProcessStatus.module.css';

function ButtonWithProcessStatus(props: ButtonWithProcessStatusProps) {
  const { title, onClick, state, primary, className } = props;

  const isButtonDisabled = state !== ButtonState.default;

  return (
    <div className={clsx(styles.start_button_container, className)}>
      <Button
        onClick={onClick}
        className={clsx(styles.button, state)}
        primary={primary}
        disabled={isButtonDisabled}
      >
        <span>{title}</span>
        {state === ButtonState.loading && <Spinner />}
      </Button>
    </div>
  );
}

export default ButtonWithProcessStatus;
