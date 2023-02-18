export enum TimeInterval {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Manual = 'manual',
}

export type TimeIntervalSelectorProps = {
  intervals: TimeInterval[];
  selectedInterval: TimeInterval;
  onIntervalChanged: (interval: TimeInterval) => void;
  className?: string;
};
