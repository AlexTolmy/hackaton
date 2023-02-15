import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getNotifications,
  removeNotification,
} from '../../Store/reducers/notificationPanelReducer';
import { Notification } from '../../UIKit';

const CLOSE_NOTIFICATION_DELAY = 15000;

function NotificationPanelContainer() {
  const dispatch = useDispatch();
  const notifications = useSelector(getNotifications);

  const removeOnClose = useCallback(
    (notificationId: string) => {
      dispatch(removeNotification(notificationId));
    },
    [dispatch],
  );

  return (
    <Notification
      messages={notifications}
      onClose={removeOnClose}
      closeDelay={CLOSE_NOTIFICATION_DELAY}
    />
  );
}

export default NotificationPanelContainer;
