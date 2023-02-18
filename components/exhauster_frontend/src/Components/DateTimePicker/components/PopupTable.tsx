import React, { useMemo } from 'react';

import { PopupTableProps } from '../DateTimePicker.interface';
import { WeekDaysNames } from '../utils/dictionaries';

import PopupTableBody from './PopupTableBody';
import PopupTableCell from './PopupTableCell';

import styles from './Popup.module.css';

function PopupTable(props: PopupTableProps) {
  const { activeDay, activeMonth, setActiveDay } = props;

  const weekDays = useMemo(
    () =>
      Array.from(WeekDaysNames.values()).map((dayName) => (
        <th key={dayName}>
          <PopupTableCell className={styles.header_cell} value={dayName} />
        </th>
      )),
    [],
  );

  return (
    <table>
      <thead>
        <tr>{weekDays}</tr>
      </thead>
      <PopupTableBody
        activeDay={activeDay}
        activeMonth={activeMonth}
        setActiveDay={setActiveDay}
      />
    </table>
  );
}

export default React.memo(PopupTable);
