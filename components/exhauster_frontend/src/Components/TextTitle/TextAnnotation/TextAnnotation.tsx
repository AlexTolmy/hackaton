import React from 'react';
import clsx from 'clsx';

import Text from '../TextTitle';

import { TextAnnotationProps } from './TextAnnotation.interface';

import styles from './TextAnnotation.module.css';

function TextAnnotation(props: TextAnnotationProps) {
  const { value, description, className } = props;
  return (
    <div className={clsx(styles.container, className)}>
      <Text className={styles.value} textContent={value} />
      <span>&mdash;</span>
      <Text
        className={styles.description}
        textContent={description.toString()}
      />
    </div>
  );
}

export default React.memo(TextAnnotation);
