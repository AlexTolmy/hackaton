import React, { useEffect } from 'react';
import clsx from 'clsx';

import { NotificationType } from '../../Store/types/NotificationReducerType';
import Button from '../Button';
import { IconName } from '../SvgIcon/SvgIcon.interface';

import styles from './Notification.module.css';

const CLOSE_DELAY = 10000;

type NotificationProps = {
  message: string;
  type: NotificationType;
  id: string;
  removeOnClose: (id: string) => void;
};

function Notification(props: NotificationProps) {
  const { message, type, id, removeOnClose } = props;

  const handleClose = () => removeOnClose(id);

  useEffect(() => {
    setTimeout(() => removeOnClose(id), CLOSE_DELAY);
  }, [id, removeOnClose]);

  return (
    <div className={clsx(styles.notification, type)}>
      <Button
        className={styles.button}
        onClick={handleClose}
        iconProps={{ iconName: IconName.Cross, className: styles.icon }}
      />
      <div className={styles.notification_body}>{message}</div>
    </div>
  );
}

export default Notification;
