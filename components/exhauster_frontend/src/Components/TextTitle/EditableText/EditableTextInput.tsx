import React, { useState } from 'react';

import getTranslation from '../../../Utils/getTranslation';
import AdvancedTextbox from '../../AdvancedTextbox';

import { EditableTextInputProps } from './EditableText.interface';
import EditableTextButton from './EditableTextButton';

import styles from './EditableText.module.css';

function EditableTextInput(props: EditableTextInputProps) {
  const { textValue, onSaveValue, onCancel, placeholder } = props;
  const [value, setValue] = useState(textValue);

  const handleSaveValue = () => {
    if (value && value !== textValue) {
      onSaveValue(value);
    } else {
      onCancel();
    }
  };

  return (
    <div className={styles.edit_form}>
      <AdvancedTextbox
        initialValue={value}
        onEnterPress={handleSaveValue}
        className={styles.textbox}
        placeholder={placeholder}
        onBlur={handleSaveValue}
        onChange={setValue}
        containerClassName={styles.container}
        isAutoFocusEnabled
      >
        <EditableTextButton
          iconName="Cross"
          title={getTranslation('Cancel')}
          onClick={onCancel}
        />
        <EditableTextButton
          iconName="Check"
          title={getTranslation('Save')}
          onClick={handleSaveValue}
        />
      </AdvancedTextbox>
    </div>
  );
}

export default EditableTextInput;
