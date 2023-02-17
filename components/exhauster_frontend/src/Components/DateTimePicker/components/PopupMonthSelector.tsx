import React, { useMemo } from 'react';

import Button from '../../Button';
import { IconName } from '../../SvgIcon/SvgIcon.interface';
import { PopupMonthSelectorProps } from '../DateTimePicker.interface';
import { MonthsNames } from '../utils/dictionaries';

import styles from './Popup.module.css';

function PopupMonthSelector(props: PopupMonthSelectorProps) {
  const { visibleMonthDate, setVisibleMonthDate } = props;

  const changeMonth = (direction: number) => () => {
    const date = new Date(visibleMonthDate);
    date.setMonth(date.getMonth() + direction);
    setVisibleMonthDate(date);
  };

  const monthTitle = useMemo(() => {
    const month = MonthsNames.get(visibleMonthDate.getMonth());
    const year = visibleMonthDate.getFullYear();
    return `${month} ${year}`;
  }, [visibleMonthDate]);

  return (
    <div className={styles.selector}>
      <Button
        className={styles.ms_button}
        iconProps={{ iconName: IconName.ArrowLeft }}
        onClick={changeMonth(-1)}
      />
      <p className={styles.title}>{monthTitle}</p>
      <Button
        className={styles.ms_button}
        iconProps={{ iconName: IconName.ArrowRight }}
        onClick={changeMonth(1)}
      />
    </div>
  );
}

export default React.memo(PopupMonthSelector);
