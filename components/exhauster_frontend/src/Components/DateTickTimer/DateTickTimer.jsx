import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { TIME_MULTIPLIER } from './constants';
import { getDateMilliseconds } from './utils';

import './DateTickTimer.css';

function DateTickTimer(props) {
  const { timeDates, tickInterval, isIncreasing, className } = props;
  const { start, current, end } = getDateMilliseconds(timeDates);

  const initialTimerValue = isIncreasing ? current - start : end - current;
  const isIncreaseRef = useRef(isIncreasing || initialTimerValue < 0);
  const counterRef = useRef(
    initialTimerValue >= 0 ? initialTimerValue : initialTimerValue * -1,
  );
  const [currentTime, setCurrentTime] = useState(counterRef.current);

  useEffect(() => {
    const fixedTick = tickInterval * TIME_MULTIPLIER;

    const interval = setInterval(() => {
      if (counterRef.current <= 0 && !isIncreaseRef.current) {
        isIncreaseRef.current = true;
      }

      counterRef.current = isIncreaseRef.current
        ? counterRef.current + fixedTick
        : counterRef.current - fixedTick;
      setCurrentTime(counterRef.current);
    }, fixedTick);

    return () => clearInterval(interval);
  }, [tickInterval]);

  useEffect(() => {
    const initialTimerValueNew = isIncreasing ? current - start : end - current;
    isIncreaseRef.current = isIncreasing || initialTimerValueNew < 0;
    counterRef.current =
      initialTimerValueNew >= 0
        ? initialTimerValueNew
        : initialTimerValueNew * -1;
    setCurrentTime(counterRef.current);
  }, [current, end, isIncreasing, start]);

  return (
    <div className={clsx('date-tick-timer', className)}>
      <span>{Math.round(currentTime / TIME_MULTIPLIER)}</span>
    </div>
  );
}

DateTickTimer.propTypes = {
  timeDates: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    current: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }),
  tickInterval: PropTypes.number,
  isIncreasing: PropTypes.bool,

  className: PropTypes.string,
};

DateTickTimer.defaultProps = {
  timeDates: {
    start: new Date(),
    current: new Date(),
    end: new Date(),
  },
  tickInterval: 1, // Секунды
  isIncreasing: true,
  className: '',
};

export default DateTickTimer;
