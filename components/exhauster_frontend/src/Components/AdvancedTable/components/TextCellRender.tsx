import React from 'react';

import breakStringWithBrTag from '../../../Utils/breakStringWithBrTag';

import styles from '../AdvancedTable.module.css';

function TextCellRender() {
  return function Component(cellValue: string) {
    const text = breakStringWithBrTag(cellValue);

    return (
      <div className={styles.table_cell_body}>
        <p>{text}</p>
      </div>
    );
  };
}

export default TextCellRender;
