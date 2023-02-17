import React from 'react';
import clsx from 'clsx';

import Text from '../TextTitle';

import { TextLabelProps } from './TextLabel.interface';

import styles from './TextLabel.module.css';

function TextLabel(props: TextLabelProps) {
  const { textContent, className } = props;

  return (
    <div className={clsx(styles.label, className)}>
      <Text textContent={textContent} className={styles.text} />
    </div>
  );
}

export default React.memo(TextLabel);
