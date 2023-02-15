import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Textbox } from '../../UIKit';
import OutsideClickHandler from '../OutsideClickHandler';

import { AdvancedTextboxProps } from './AdvancedTextbox.interface';

import styles from './AdvancedTextbox.module.css';

function AdvancedTextbox(props: AdvancedTextboxProps) {
  const {
    onChange,
    onEnterPress,
    onBlur,
    initialValue,
    isAutoFocusEnabled,
    placeholder,
    containerClassName,
    className,
    children,
  } = props;
  const [value, setValue] = useState(initialValue || '');
  const ref = useRef<HTMLInputElement>(null);

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const pressEnter = (event: KeyboardEvent) => {
    const isEnterPress = event.key && event.key === 'Enter';
    if (isEnterPress && onEnterPress) {
      onEnterPress(value);
    }
  };

  useEffect(() => {
    if (isAutoFocusEnabled) {
      ref?.current?.focus();
    }
  }, [isAutoFocusEnabled, ref]);

  return (
    <OutsideClickHandler
      className={clsx(styles.wrapper, containerClassName)}
      onOutsideClick={onBlur}
    >
      <Textbox
        inputRef={ref}
        className={className}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={changeValue}
        onKeyPress={pressEnter}
      />
      {children}
    </OutsideClickHandler>
  );
}

export default AdvancedTextbox;
