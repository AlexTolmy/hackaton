import React from 'react';

import Text from '../TextTitle';

import { EditableTextItemProps } from './EditableText.interface';

import styles from './EditableText.module.css';

function EditableTextItem(props: EditableTextItemProps) {
  const { textValue } = props;

  return <Text className={styles.text} textContent={textValue} />;
}

export default EditableTextItem;
