import { useMemo } from 'react';

import { DayType } from '../DateTimePicker.interface';

// Month can take 6 weeks, if starts from sunday
const WEEKS_NUM = 6;

function useBodyDays(activeDay: Date, activeMonth: Date) {
  const weeks = useMemo(() => {
    // Get first month day date with prefilled time
    const monthFirstDay = new Date(
      activeMonth.getFullYear(),
      activeMonth.getMonth(),
      1,
      activeDay.getHours(),
      activeDay.getMinutes(),
    );

    // Get first month week day name like number of day week
    const monthFirstWeekday = monthFirstDay.getDay(); // 0,1,2,3... where 0 is sunday
    const list: Map<number, DayType>[] = [];

    // Main cycle for 6 weeks
    for (let weekNum = 0; weekNum < WEEKS_NUM; weekNum += 1) {
      let isWeekHasCurrentMonthDays = false; // Some months like jun can have 6 weeks
      const row = new Map();

      // Secondary cycle for rows filling
      for (let i = 0; i < 7; i += 1) {
        if (i === 0 && weekNum === 0 && monthFirstWeekday === 0) {
          // If month starts from sunday
          monthFirstDay.setDate(monthFirstDay.getDate() - 6);
        } else if (i === 0 && weekNum === 0) {
          // If months starts from any except sunday and this is first iteration
          monthFirstDay.setDate(
            monthFirstDay.getDate() + (weekNum - monthFirstWeekday + 1),
          );
        } else {
          // If it is any iteration except first
          monthFirstDay.setDate(monthFirstDay.getDate() + 1);
        }

        const rowCell = {
          isCurrentMonth: monthFirstDay.getMonth() === activeMonth.getMonth(),
          dayDate: new Date(monthFirstDay),
          monthNumber: monthFirstDay.getMonth(),
          dayNumber: monthFirstDay.getDate(),
          isActiveDay:
            monthFirstDay.toDateString() === activeDay.toDateString(),
          year: monthFirstDay.getFullYear(),
        };

        if (!isWeekHasCurrentMonthDays && rowCell.isCurrentMonth) {
          // If month has only 5 weeks, we should skip 6 week
          isWeekHasCurrentMonthDays = true;
        }

        row.set(i, rowCell);
      }

      if (isWeekHasCurrentMonthDays) {
        list.push(row);
      }
    }

    return list;
  }, [activeDay, activeMonth]);

  return { weeks };
}

export default useBodyDays;
