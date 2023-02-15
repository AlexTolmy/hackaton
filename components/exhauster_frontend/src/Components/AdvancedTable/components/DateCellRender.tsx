import React from 'react';

import { formatDateToString } from '../../../Utils/dateUtils';

import styles from '../AdvancedTable.module.css';

function DateCellRender() {
  return function Component(cellValue: string) {
    const date = formatDateToString(cellValue);

    return (
      <div className={styles.table_cell_body}>
        <p>{date}</p>
      </div>
    );
  };
}

export default DateCellRender;
