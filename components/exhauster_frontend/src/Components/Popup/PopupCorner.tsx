import React from 'react';
import clsx from 'clsx';

import { PopupCornerProps } from './Popup.interface';
import useCornerPositionCalc from './useCornerPositionCalc';

import styles from './Popup.module.css';

function PopupCorner(props: PopupCornerProps) {
  const { cornerParentElement, className, yOffset = 0 } = props;
  const { cornerRef, cornerPosition } = useCornerPositionCalc(
    cornerParentElement,
    yOffset,
  );

  return (
    <div
      ref={cornerRef}
      className={clsx(styles.corner_container, className)}
      style={cornerPosition}
    >
      <div className={styles.corner_body} />
    </div>
  );
}

export default React.memo(PopupCorner);
