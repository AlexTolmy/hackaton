export function getDateMilliseconds(timeDates) {
  const { start, current, end } = timeDates;
  return {
    start: start.getTime(),
    current: current.getTime(),
    end: end.getTime(),
  };
}

export default {};
