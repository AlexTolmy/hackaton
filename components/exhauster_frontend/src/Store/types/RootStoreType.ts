import { AppThemeReducerType } from './AppThemeReducerType';
import DatesPeriodSelectorReducerType from './DatesPeriodSelectorReducerType';
import { ExhausterChartDataReducerType } from './ExhausterChartDataReducerType';
import { ExhausterMnemoSchemeReducerType } from './ExhausterMnemoSchemeReducerType';
import { ExhaustersMonitorReducerType } from './ExhaustersMonitorReducerType';

type RootStoreType = {
  requests: any;
  appTheme: AppThemeReducerType;
  exhaustersMonitor: ExhaustersMonitorReducerType;
  exhausterMnemoScheme: ExhausterMnemoSchemeReducerType;
  exhausterChart: ExhausterChartDataReducerType;
  timePeriod: DatesPeriodSelectorReducerType;
};

export default RootStoreType;
