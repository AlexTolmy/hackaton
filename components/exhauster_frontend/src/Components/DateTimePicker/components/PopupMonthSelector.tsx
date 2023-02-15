import React, { useMemo } from 'react';

import { ButtonWithIcon } from '../../../UIKit';
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
      <ButtonWithIcon
        className={styles.ms_button}
        glyphNameRight="ArrowLeft"
        onClick={changeMonth(-1)}
      />
      <p className={styles.title}>{monthTitle}</p>
      <ButtonWithIcon
        className={styles.ms_button}
        glyphNameRight="ArrowRight"
        onClick={changeMonth(1)}
      />
    </div>
  );
}

export default React.memo(PopupMonthSelector);
