import React from 'react';
import clsx from 'clsx';

import { Button, Modal } from '../../UIKit';
import getTranslation from '../../Utils/getTranslation';

import ModalDialogProps from './ModalDialog.interface';

import styles from './ModalDialog.module.css';

function ModalDialog(props: ModalDialogProps) {
  const { className, children, acceptButton, setIsVisible } = props;
  const hideModalWindow = () => setIsVisible(false);
  const acceptAction = () => {
    hideModalWindow();
    acceptButton.action();
  };

  return (
    <Modal
      onModalClose={hideModalWindow}
      className={clsx(styles.modal, className)}
    >
      {children}
      <div className={styles.modal_buttons}>
        <Button
          className={styles.modal_button}
          onClick={acceptAction}
          primary={acceptButton.primary}
        >
          {acceptButton.title}
        </Button>
        <Button onClick={hideModalWindow}>{getTranslation('cancel')}</Button>
      </div>
    </Modal>
  );
}

export default React.memo(ModalDialog);
