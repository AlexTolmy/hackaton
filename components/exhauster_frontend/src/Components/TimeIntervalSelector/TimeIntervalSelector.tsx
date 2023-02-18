import React, { useMemo } from 'react';

import getTranslation from '../../Utils/getTranslation';
import TextRadioGroup from '../TextRadioGroup';

import {
  TimeInterval,
  TimeIntervalSelectorProps,
} from './types/TimeIntervalSelector.interface';

function TimeIntervalSelector(props: TimeIntervalSelectorProps) {
  const { intervals, selectedInterval, onIntervalChanged, className } = props;

  const intervalsList = useMemo(
    () =>
      intervals.map((time) => ({
        id: time,
        value: getTranslation(time),
      })),
    [intervals],
  );

  const changeInterval = (itemId: string) => {
    onIntervalChanged(itemId as TimeInterval);
  };

  return (
    <TextRadioGroup
      name="periodSelector"
      items={intervalsList}
      selectedItemId={selectedInterval}
      onChangeCheckedItem={changeInterval}
      className={className}
    />
  );
}

export default TimeIntervalSelector;
