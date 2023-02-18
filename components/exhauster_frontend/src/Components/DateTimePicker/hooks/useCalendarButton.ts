import clsx from 'clsx';
import { format } from 'date-fns';

import styles from '../DateTimePicker.module.css';

function useCalendarButton(
  selectedDate: Date,
  isPopupVisible: boolean,
  setIsPopupVisible: (value: boolean) => void,
) {
  const buttonTitle = format(selectedDate, 'dd.MM.yyyy, HH:mm');

  const updateCalloutVisibility = () => setIsPopupVisible(!isPopupVisible);

  const buttonClassName = clsx(
    styles.button,
    isPopupVisible && styles.button_active,
  );

  const iconClassName = clsx(styles.icon, isPopupVisible && styles.icon_active);

  return {
    buttonTitle,
    updateCalloutVisibility,
    buttonClassName,
    iconClassName,
  };
}

export default useCalendarButton;
