import React from 'react';
import clsx from 'clsx';

import ButtonWithIcon from '../../../UIKit/ButtonWithIcon';
import { ButtonCellRenderProps } from '../AdvancedTable.interface';

import styles from '../AdvancedTable.module.css';

function ButtonWithIconCellRender(props: ButtonCellRenderProps) {
  const { icon, title, className, onClick } = props;

  return function Component() {
    return (
      <div className={styles.table_cell_body}>
        <ButtonWithIcon
          glyphNameLeft={icon}
          title={title}
          className={clsx(styles.remove_button, className)}
          onClick={onClick}
        />
      </div>
    );
  };
}

export default ButtonWithIconCellRender;
