/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';

import Icon from '../SvgIcon';
import { IconProps } from '../SvgIcon/SvgIcon.interface';

import styles from './Button.module.css';

type ButtonWithIconProps = {
  iconProps?: IconProps;
  onClick: () => void;
  children?: React.ReactNode;
  isPrimary?: boolean;
  className?: string;
};

function Button(props: ButtonWithIconProps) {
  const { iconProps, onClick, children, isPrimary, className } = props;
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, className, {
        [styles.primary_button]: isPrimary,
      })}
      type="button"
    >
      {iconProps && <Icon {...iconProps} />}
      {children}
    </button>
  );
}

export default Button;
