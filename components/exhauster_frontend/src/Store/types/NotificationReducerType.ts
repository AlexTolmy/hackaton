export enum NotificationType {
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

type NotificationItemType = {
  notificationId: string;
  message: string;
  type: NotificationType;
};

type NotificationReducerType = {
  notifications: NotificationItemType[];
};

export default NotificationReducerType;
