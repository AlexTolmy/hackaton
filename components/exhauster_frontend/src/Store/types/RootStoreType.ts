import { AppThemeReducerType } from './AppThemeReducerType';
import DatesPeriodSelectorReducerType from './DatesPeriodSelectorReducerType';
import { ExhausterChartDataReducerType } from './ExhausterChartDataReducerType';
import { ExhausterMnemoSchemeReducerType } from './ExhausterMnemoSchemeReducerType';
import { ExhaustersMonitorReducerType } from './ExhaustersMonitorReducerType';
import NotificationReducerType from './NotificationReducerType';

type RootStoreType = {
  requests: any;
  appTheme: AppThemeReducerType;
  exhaustersMonitor: ExhaustersMonitorReducerType;
  exhausterMnemoScheme: ExhausterMnemoSchemeReducerType;
  exhausterChart: ExhausterChartDataReducerType;
  timePeriod: DatesPeriodSelectorReducerType;
  notificationBar: NotificationReducerType;
};

export default RootStoreType;
