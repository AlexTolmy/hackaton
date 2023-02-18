import { TimeInterval } from '../../Components/TimeIntervalSelector/types/TimeIntervalSelector.interface';

export type DatesPeriodType = {
  from: Date;
  to: Date;
};

type DatesPeriodSelectorReducerType = {
  cacheKey: string;
  period: DatesPeriodType;
  timeInterval: TimeInterval;
  isInitialized: boolean;
};

export default DatesPeriodSelectorReducerType;
