import React from 'react';
import clsx from 'clsx';

import DateTimePicker from '../DateTimePicker';

import { DatesPeriodSelectorProps } from './DatesPeriodSelector.interface';

import styles from './DatesPeriodSelector.module.css';

function DatesPeriodSelector(props: DatesPeriodSelectorProps) {
  const {
    initialStartDate,
    initialEndDate,
    onStartDateChange,
    onEndDateChange,
    className,
    datePickerClassName,
  } = props;

  const updateStartDate = (newDate: Date) => {
    const newDateTime = newDate.getTime();
    const endDateTime = initialEndDate.getTime();

    if (newDateTime > endDateTime) {
      onEndDateChange(new Date(newDate));
    }

    onStartDateChange(newDate);
  };

  const updateEndDate = (newDate: Date) => {
    const newDateTime = newDate.getTime();
    const startDateTime = initialStartDate.getTime();

    if (newDateTime < startDateTime) {
      onStartDateChange(new Date(newDate));
    }

    onEndDateChange(newDate);
  };

  return (
    <div className={clsx(styles.dates_period_selector, className)}>
      <DateTimePicker
        className={clsx(datePickerClassName, styles.left_date_picker)}
        initialDate={initialStartDate}
        onNewDateSelect={updateStartDate}
      />
      <div className={styles.separator}>–</div>
      <DateTimePicker
        className={clsx(datePickerClassName, styles.right_date_picker)}
        initialDate={initialEndDate}
        onNewDateSelect={updateEndDate}
      />
    </div>
  );
}

export default React.memo(DatesPeriodSelector);
