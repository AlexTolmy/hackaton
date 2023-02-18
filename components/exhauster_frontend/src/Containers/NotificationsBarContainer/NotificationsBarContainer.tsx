import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Notification from '../../Components/Notification';
import {
  getNotifications,
  removeNotification,
} from '../../Store/reducers/notificationReducer';

import styles from './NotificationsBarContainer.module.css';

function NotificationsBarContainer() {
  const dispatch = useDispatch();
  const notifications = useSelector(getNotifications);

  const removeOnClose = useCallback(
    (notificationId: string) => {
      dispatch(removeNotification(notificationId));
    },
    [dispatch],
  );

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.bar}>
      {notifications.map((item) => (
        <Notification
          key={JSON.stringify(item)}
          message={item.message}
          type={item.type}
          id={item.notificationId}
          removeOnClose={removeOnClose}
        />
      ))}
    </div>
  );
}

export default NotificationsBarContainer;
