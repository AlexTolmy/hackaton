import { createSelector } from '@reduxjs/toolkit';

import getTimeIntervalDates from '../../Components/TimeIntervalSelector/utils/getTimeIntervalDates';
import {
  getDatesPeriod,
  getTimeInterval,
} from '../reducers/datesPeriodSelectorReducer';

const selectorDatesPeriod = createSelector(
  getDatesPeriod,
  getTimeInterval,
  (datesPeriod, timeInterval) => {
    const { from, to } = datesPeriod;
    const { start, end } = getTimeIntervalDates(timeInterval, from, to);

    return { from: start, to: end };
  },
);

export default selectorDatesPeriod;
