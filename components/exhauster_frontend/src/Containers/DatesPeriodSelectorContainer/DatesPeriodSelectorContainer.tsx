import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import DatesPeriodSelector from '../../Components/DatesPeriodSelector';
import TimeIntervalSelector from '../../Components/TimeIntervalSelector';
import { TimeInterval } from '../../Components/TimeIntervalSelector/types/TimeIntervalSelector.interface';
import {
  getTimeInterval,
  initializeDatePeriodSelector,
  setPeriodFromDate,
  setPeriodToDate,
  setTimeInterval,
} from '../../Store/reducers/datesPeriodSelectorReducer';
import selectorDatesPeriod from '../../Store/utils/selectorDatesPeriod';

import { DatesPeriodSelectorContainerProps } from './DatesPeriodSelectorContainer.interface';

import styles from './DatesPeriodSelectorContainer.module.css';

function DatesPeriodSelectorContainer(
  props: DatesPeriodSelectorContainerProps,
) {
  const { cacheKey, className } = props;

  const dispatch = useDispatch();
  const { from, to } = useSelector(selectorDatesPeriod);
  const timeInterval = useSelector(getTimeInterval);
  const onStartDateChange = (date) => dispatch(setPeriodFromDate(date));
  const onEndDateChange = (date) => dispatch(setPeriodToDate(date));

  const intervals = useMemo(
    () => [
      TimeInterval.Day,
      TimeInterval.Week,
      TimeInterval.Month,
      TimeInterval.Manual,
    ],
    [],
  );

  const changeTimeInterval = (interval: TimeInterval) => {
    dispatch(setTimeInterval(interval));
  };

  useEffect(() => {
    if (cacheKey) {
      dispatch(initializeDatePeriodSelector(cacheKey));
    }
  }, [cacheKey, dispatch]);

  return (
    <div className={clsx(styles.period_selector_container, className)}>
      <TimeIntervalSelector
        intervals={intervals}
        selectedInterval={timeInterval}
        onIntervalChanged={changeTimeInterval}
      />
      {timeInterval === TimeInterval.Manual && (
        <DatesPeriodSelector
          initialStartDate={from}
          initialEndDate={to}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          className={styles.period_selector}
        />
      )}
    </div>
  );
}

export default React.memo(DatesPeriodSelectorContainer);
