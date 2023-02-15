import React from 'react';

import getTranslation from '../../../Utils/getTranslation';

import { EditableTextControlProps } from './EditableText.interface';
import EditableTextButton from './EditableTextButton';

import styles from './EditableText.module.css';

function EditableTextControl(props: EditableTextControlProps) {
  const { onEdit } = props;

  return (
    <div className={styles.control_panel}>
      <EditableTextButton
        iconName="Edit"
        title={getTranslation('edit')}
        onClick={onEdit}
      />
    </div>
  );
}

export default EditableTextControl;
