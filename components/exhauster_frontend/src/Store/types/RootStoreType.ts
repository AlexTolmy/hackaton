import { AppThemeReducerType } from './AppThemeReducerType';
import { ExhausterMnemoSchemeReducerType } from './ExhausterMnemoSchemeReducerType';
import { ExhaustersMonitorReducerType } from './ExhaustersMonitorReducerType';

type RootStoreType = {
  requests: any;
  appTheme: AppThemeReducerType;
  exhaustersMonitor: ExhaustersMonitorReducerType;
  exhausterMnemoScheme: ExhausterMnemoSchemeReducerType;
};

export default RootStoreType;
