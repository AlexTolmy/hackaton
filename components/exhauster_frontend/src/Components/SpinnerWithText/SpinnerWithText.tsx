import React from 'react';

import { Spinner } from '../../UIKit';
import getTranslation from '../../Utils/getTranslation';

import styles from './SpinnerWithText.module.css';

function SpinnerWithText() {
  return (
    <div className={styles.container}>
      <Spinner />
      <p>{getTranslation('loading')}</p>
    </div>
  );
}

export default SpinnerWithText;
