import React, { useState } from 'react';
import clsx from 'clsx';

import { EditableTextProps } from './EditableText.interface';
import EditableTextControl from './EditableTextControl';
import EditableTextInput from './EditableTextInput';
import EditableTextItem from './EditableTextItem';

import styles from './EditableText.module.css';

function EditableText(props: EditableTextProps) {
  const { textValue, onTextValueChanged, isReadOnly, className } = props;
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSave = (value: string) => {
    if (value) {
      onTextValueChanged(value);
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <div className={clsx(styles.editable_text, className)}>
      {isEditMode ? (
        <EditableTextInput
          textValue={textValue}
          onSaveValue={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className={styles.item_text_content}>
          <EditableTextItem textValue={textValue} />
          {!isReadOnly && <EditableTextControl onEdit={handleEdit} />}
        </div>
      )}
    </div>
  );
}

export default EditableText;
