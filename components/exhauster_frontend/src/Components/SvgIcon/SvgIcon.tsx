import React, { useMemo } from 'react';
import clsx from 'clsx';

import ArrowLeft from './components/ArrowLeft';
import ArrowRight from './components/ArrowRight';
import Calendar from './components/Calendar';
import { IconName, IconProps } from './SvgIcon.interface';

import styles from './SvgIcon.module.css';

function SvgIcon(props: IconProps) {
  const { iconName, className } = props;

  const icon = useMemo(() => {
    switch (iconName) {
      case IconName.Calendar:
        return <Calendar />;
      case IconName.ArrowRight:
        return <ArrowRight />;
      case IconName.ArrowLeft:
        return <ArrowLeft />;
      default:
        return null;
    }
  }, [iconName]);

  return <div className={clsx(styles.icon, className)}>{icon}</div>;
}

export default SvgIcon;
