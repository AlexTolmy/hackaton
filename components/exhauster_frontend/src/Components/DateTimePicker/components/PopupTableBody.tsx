import React, { useMemo } from 'react';
import clsx from 'clsx';

import Button from '../../Button';
import { DayType, PopupTableProps } from '../DateTimePicker.interface';
import useBodyDays from '../hooks/useBodyDays';

import PopupTableCell from './PopupTableCell';

import styles from './Popup.module.css';

function PopupTableBody(props: PopupTableProps) {
  const { activeDay, activeMonth, setActiveDay } = props;
  const { weeks } = useBodyDays(activeDay, activeMonth);

  const monthRender = useMemo(() => {
    const weekRender = (week: Map<number, DayType>) =>
      Array.from(week.values()).map((day) => {
        const updateDate = () => setActiveDay(day.dayDate);
        const className = clsx(
          styles.cell,
          !day.isCurrentMonth && styles.not_current,
          day.isActiveDay && styles.active_day,
        );

        return (
          <td key={day.dayNumber}>
            <Button className={styles.button} onClick={updateDate}>
              <PopupTableCell
                className={className}
                value={day.dayNumber.toString()}
              />
            </Button>
          </td>
        );
      });

    const weeksIterator = weeks.keys();
    return weeks.map((week) => (
      <tr key={weeksIterator.next().value}>{weekRender(week)}</tr>
    ));
  }, [setActiveDay, weeks]);

  return <tbody>{monthRender}</tbody>;
}

export default React.memo(PopupTableBody);
