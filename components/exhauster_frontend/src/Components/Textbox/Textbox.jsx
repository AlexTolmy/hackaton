/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';

import './Textbox.css';

function Textbox(props) {
  const {
    className,
    value,
    name,
    defaultValue,
    type,
    list,
    min,
    max,
    step,
    onChange,
    onBlur,
    placeholder,
    disabled = false,
    onFocus,
    pattern,
    onKeyPress,
    autoComplete,
    readOnly,
    inputRef,
  } = props;

  return (
    <input
      pattern={pattern}
      className={clsx(['textbox', className])}
      type={type}
      list={list}
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      autoComplete={autoComplete}
      readOnly={readOnly}
      ref={inputRef}
    />
  );
}

export default Textbox;
