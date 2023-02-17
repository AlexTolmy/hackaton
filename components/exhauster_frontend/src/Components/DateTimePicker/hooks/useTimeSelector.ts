import { useMemo } from 'react';
import { format } from 'date-fns';

import addZeroPad from '../utils/addZeroPad';

const HOURS = 24;

function useTimeSelector(
  activeDay: Date,
  setActiveDay: (newDate: Date) => void,
) {
  const timesList = useMemo(() => {
    const list = [];

    for (let hour = 0; hour < HOURS; hour += 1) {
      const value = `${addZeroPad(hour, 2)}:00`;
      list.push({ id: value, value });
    }

    return list;
  }, []);

  const activeTime = format(activeDay, 'HH:mm');

  const changeActiveTime = (time) => {
    const timeList = time.split(':');
    const hours = Number(timeList[0]);
    const mins = Number(timeList[1]);
    setActiveDay(new Date(activeDay.setHours(hours, mins, 0)));
  };

  return { timesList, activeTime, changeActiveTime };
}

export default useTimeSelector;
