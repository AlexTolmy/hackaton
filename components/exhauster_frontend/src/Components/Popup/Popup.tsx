import React from 'react';
import clsx from 'clsx';

import { PopupProps } from './Popup.interface';
import PopupCorner from './PopupCorner';

import styles from './Popup.module.css';

function Popup(props: PopupProps) {
  const { cornerConfiguration, children, width, className } = props;

  return (
    <div className={clsx(styles.popup, className)} style={{ width }}>
      {cornerConfiguration?.isCornerEnabled && (
        <PopupCorner
          yOffset={cornerConfiguration.cornerYOffset}
          cornerParentElement={cornerConfiguration.cornerParentElement}
        />
      )}
      {children}
    </div>
  );
}

export default React.memo(Popup);
