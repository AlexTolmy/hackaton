import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import Button from '../Button';
import OutsideClickHandler from '../OutsideClickHandler';
import { IconName } from '../SvgIcon/SvgIcon.interface';

import PopupContainer from './components/PopupContainer';
import useCalendarButton from './hooks/useCalendarButton';
import { DateTimePickerProps } from './DateTimePicker.interface';

import styles from './DateTimePicker.module.css';

function DateTimePicker(props: DateTimePickerProps) {
  const { initialDate, onNewDateSelect, className } = props;
  const datePickerRef = useRef(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [visibleMonthDate, setVisibleMonthDate] = useState(initialDate);

  const {
    buttonTitle,
    updateCalloutVisibility,
    buttonClassName,
    iconClassName,
  } = useCalendarButton(selectedDate, isPopupVisible, setIsPopupVisible);

  const hidePopup = () => {
    if (isPopupVisible) {
      if (selectedDate.getTime() !== initialDate.getTime()) {
        onNewDateSelect(selectedDate);
      }
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    setSelectedDate(initialDate);
    setVisibleMonthDate(initialDate);
  }, [initialDate]);

  const cornerParentRef =
    datePickerRef?.current?.getElementsByTagName('svg')[0];

  return (
    <div ref={datePickerRef} className={clsx(styles.picker, className)}>
      <OutsideClickHandler onOutsideClick={hidePopup}>
        <Button
          className={buttonClassName}
          iconProps={{ iconName: IconName.Calendar, className: iconClassName }}
          onClick={updateCalloutVisibility}
        >
          {buttonTitle}
        </Button>

        {isPopupVisible && (
          <PopupContainer
            hidePopup={hidePopup}
            selectedDate={selectedDate}
            visibleMonthDate={visibleMonthDate}
            setVisibleMonthDate={setVisibleMonthDate}
            setSelectedDate={setSelectedDate}
            onNewDateSelect={onNewDateSelect}
            cornerParentElement={cornerParentRef}
          />
        )}
      </OutsideClickHandler>
    </div>
  );
}

export default React.memo(DateTimePicker);
