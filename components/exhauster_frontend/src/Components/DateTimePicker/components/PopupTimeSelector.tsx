import React from 'react';

import TextRadioGroup from '../../TextRadioGroup';
import { PopupTimeSelectorProps } from '../DateTimePicker.interface';
import useTimeSelector from '../hooks/useTimeSelector';
import getDateTimePickerTranslation from '../utils/getDateTimePickerTranslation';

import styles from './PopupTimeSelector.module.css';

function PopupTimeSelector(props: PopupTimeSelectorProps) {
  const { activeDay, setActiveDay } = props;
  const { timesList, activeTime, changeActiveTime } = useTimeSelector(
    activeDay,
    setActiveDay,
  );

  return (
    <div className={styles.time_selector}>
      <p className={styles.title}>{getDateTimePickerTranslation('time')}</p>
      <div className={styles.content_wrapper}>
        <div className={styles.content}>
          <TextRadioGroup
            name="timeSelector"
            items={timesList}
            selectedItemId={activeTime}
            onChangeCheckedItem={changeActiveTime}
            className={styles.group}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(PopupTimeSelector);
