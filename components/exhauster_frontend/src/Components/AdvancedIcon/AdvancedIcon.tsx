import React from 'react';

import { Glyph } from '../../UIKit';

import { AdvancedIconProps } from './AdvancedIcon.interface';

import styles from './AdvancedIcon.module.css';

function AdvancedIcon(props: AdvancedIconProps) {
  const { iconName, iconText } = props;

  return (
    <div className={styles.icon_container}>
      <Glyph name={iconName} className={styles.icon} />
      {iconText !== undefined && (
        <span className={styles.icon_text}>{iconText}</span>
      )}
    </div>
  );
}

export default AdvancedIcon;
