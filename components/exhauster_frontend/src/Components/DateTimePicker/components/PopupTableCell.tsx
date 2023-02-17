import React from 'react';
import clsx from 'clsx';

import { PopupTableCellProps } from '../DateTimePicker.interface';

import styles from './Popup.module.css';

function PopupTableCell(props: PopupTableCellProps) {
  const { value, className } = props;
  return (
    <div className={clsx(styles.cell, className)}>
      <p className={styles.text}>{value}</p>
    </div>
  );
}

export default PopupTableCell;
