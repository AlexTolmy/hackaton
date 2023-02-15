import React, { ChangeEvent } from 'react';

import { Spinner, Textbox } from '../../../UIKit';
import { InputCellRenderProps } from '../AdvancedTable.interface';
import { inputTypes } from '../constants';

import styles from '../AdvancedTable.module.css';

function InputCellRender(props: InputCellRenderProps) {
  const { onChangeValue, inputType, placeholder, isLoading } = props;

  const changeValue = (event: ChangeEvent<HTMLInputElement>) =>
    onChangeValue(event.target.value);

  return function Component(cellValue: string) {
    return (
      <div className={styles.table_cell_body}>
        <Textbox
          pattern={inputTypes[inputType].pattern}
          type={inputTypes[inputType].type}
          defaultValue={cellValue}
          onBlur={changeValue}
          autoComplete="off"
          placeholder={placeholder}
          disabled={isLoading}
        />
        {isLoading && <Spinner className={styles.input_cell_spinner} />}
      </div>
    );
  };
}

export default InputCellRender;
