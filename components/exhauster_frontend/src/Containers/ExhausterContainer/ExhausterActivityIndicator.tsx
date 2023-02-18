import React from 'react';
import clsx from 'clsx';

import styles from './ExhausterContainer.module.css';

type ExhausterActivityIndicatorProps = {
  isActive: boolean;
};

function ExhausterActivityIndicator(props: ExhausterActivityIndicatorProps) {
  const { isActive } = props;

  return <div className={clsx(styles.activity_indicator, { isActive })} />;
}

export default ExhausterActivityIndicator;
