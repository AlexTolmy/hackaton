import React from 'react';
import clsx from 'clsx';

import { Glyph } from '../../UIKit';

import styles from './IconWithTooltip.module.css';

type IconWithTooltipProps = {
  iconName: string;
  tooltipText: string;
  className?: string;
};

function IconWithTooltip(props: IconWithTooltipProps) {
  const { iconName, tooltipText, className } = props;

  return (
    <div title={tooltipText} className={clsx(styles.container, className)}>
      <Glyph name={iconName} className={styles.icon} />
    </div>
  );
}

export default IconWithTooltip;
