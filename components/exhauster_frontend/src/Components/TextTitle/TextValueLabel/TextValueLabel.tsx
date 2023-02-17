import React from 'react';
import clsx from 'clsx';

import Text from '../TextTitle';

import { TextValueLabelProps } from './TextValueLabel.interface';

import styles from './TextValueLabel.module.css';

function TextValueLabel(props: TextValueLabelProps) {
  const { textContent, valueContent, className } = props;

  return (
    <div className={clsx(styles.label, className)}>
      <Text textContent={textContent} className={styles.text} />:
      <Text textContent={valueContent} className={styles.text_value} />
    </div>
  );
}

export default React.memo(TextValueLabel);
