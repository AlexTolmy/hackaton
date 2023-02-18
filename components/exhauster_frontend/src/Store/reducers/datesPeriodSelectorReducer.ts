import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addHours, subDays } from 'date-fns';

import { TimeInterval } from '../../Components/TimeIntervalSelector/types/TimeIntervalSelector.interface';
import DatesPeriodSelectorReducerType, {
  DatesPeriodType,
} from '../types/DatesPeriodSelectorReducerType';
import RootStoreType from '../types/RootStoreType';
import {
  getDatesPeriodFromCache,
  saveDatesPeriodToCache,
} from '../utils/datesPeriodSelectorCache';

const initialState: DatesPeriodSelectorReducerType = {
  cacheKey: '',
  period: {
    from: subDays(Date.now(), 1),
    to: addHours(Date.now(), 1),
  },
  timeInterval: TimeInterval.Day,
  isInitialized: false,
};

const slice = createSlice({
  name: 'datesPeriodSelectorReducer',
  initialState,
  reducers: {
    setTimeInterval: (state, action: PayloadAction<TimeInterval>) => {
      state.timeInterval = action.payload;
      saveDatesPeriodToCache(state);
    },
    setPeriodDates: (state, action: PayloadAction<DatesPeriodType>) => {
      const { from, to } = action.payload;
      state.period.to = to;
      state.period.from = from;
      saveDatesPeriodToCache(state);
    },
    setPeriodFromDate: (state, action: PayloadAction<Date>) => {
      state.period.from = action.payload;
      saveDatesPeriodToCache(state);
    },
    setPeriodToDate: (state, action: PayloadAction<Date>) => {
      state.period.to = addHours(action.payload, 1);
      saveDatesPeriodToCache(state);
    },
    initializeDatePeriodSelector: (state, action: PayloadAction<string>) => {
      state.cacheKey = action.payload;
      const cachedPeriod = getDatesPeriodFromCache(state.cacheKey);

      if (cachedPeriod) {
        const { timeInterval, period } = cachedPeriod;
        state.timeInterval = timeInterval;
        state.period = period;
      }

      state.isInitialized = true;
    },
  },
});

// Selectors
export const getDatesPeriod = (store: RootStoreType) => store.timePeriod.period;
export const getTimeInterval = (store: RootStoreType) =>
  store.timePeriod.timeInterval;
export const getIsInitialized = (store: RootStoreType) =>
  store.timePeriod.isInitialized;

// Actions
export const {
  setTimeInterval,
  setPeriodDates,
  setPeriodFromDate,
  setPeriodToDate,
  initializeDatePeriodSelector,
} = slice.actions;

export default slice.reducer;
