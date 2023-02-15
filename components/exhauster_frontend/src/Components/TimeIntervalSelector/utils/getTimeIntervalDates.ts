import { addDays, subDays, subMonths } from 'date-fns';

import { TimeInterval } from '../types/TimeIntervalSelector.interface';

function getTimeIntervalDates(
  interval: TimeInterval,
  start?: Date,
  end?: Date,
) {
  const dateNow = new Date();
  const nextDay = addDays(dateNow, 1);

  switch (interval) {
    case TimeInterval.Day:
      return { start: subDays(dateNow, 1), end: nextDay };
    case TimeInterval.Week:
      return { start: subDays(dateNow, 7), end: nextDay };
    case TimeInterval.Month:
      return { start: subMonths(dateNow, 1), end: nextDay };
    default:
      return { start, end };
  }
}

export default getTimeIntervalDates;
