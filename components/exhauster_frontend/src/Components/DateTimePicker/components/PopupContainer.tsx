import React from 'react';
import clsx from 'clsx';

import Button from '../../Button';
import Popup from '../../Popup';
import { PopupContainerProps } from '../DateTimePicker.interface';
import getDateTimePickerTranslation from '../utils/getDateTimePickerTranslation';

import PopupMonthSelector from './PopupMonthSelector';
import PopupTable from './PopupTable';
import PopupTimeSelector from './PopupTimeSelector';

import styles from './Popup.module.css';

const CORNER_Y_OFFSET = 15;

function PopupContainer(props: PopupContainerProps) {
  const {
    cornerParentElement,
    selectedDate,
    visibleMonthDate,
    setVisibleMonthDate,
    setSelectedDate,
    onNewDateSelect,
    hidePopup,
  } = props;

  const selectDate = () => {
    hidePopup();
    onNewDateSelect(selectedDate);
  };

  return (
    <Popup
      cornerConfiguration={{
        isCornerEnabled: true,
        cornerParentElement,
        cornerYOffset: CORNER_Y_OFFSET,
      }}
      className={styles.popup}
    >
      <div className={clsx(styles.row, styles.table)}>
        <div className={styles.column}>
          <PopupMonthSelector
            visibleMonthDate={visibleMonthDate}
            setVisibleMonthDate={setVisibleMonthDate}
          />
          <PopupTable
            activeDay={selectedDate}
            activeMonth={visibleMonthDate}
            setActiveDay={setSelectedDate}
          />
        </div>
        <div className={styles.column}>
          <PopupTimeSelector
            activeDay={selectedDate}
            setActiveDay={setSelectedDate}
          />
        </div>
      </div>
      <div className={styles.row}>
        <Button onClick={selectDate} isPrimary>
          {getDateTimePickerTranslation('select')}
        </Button>
      </div>
    </Popup>
  );
}

export default React.memo(PopupContainer);
