import { AppThemeReducerType } from './AppThemeReducerType';
import DatesPeriodSelectorReducerType from './DatesPeriodSelectorReducerType';
import NotificationReducerType from './NotificationReducerType';
import UserDataReducerType from './UserDataReducerType';

type RootStoreType = {
  requests: any;
  notificationPanel: NotificationReducerType;
  timePeriod: DatesPeriodSelectorReducerType;
  userData: UserDataReducerType;
  appTheme: AppThemeReducerType;
};

export default RootStoreType;
