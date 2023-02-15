/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';

import './Checkbox.css';

function Checkbox(props) {
  const { className, disabled, checked, name, onChange, label, markType } =
    props;

  return (
    <label htmlFor={name} className={clsx('checkbox', className)}>
      <input
        type="checkbox"
        checked={checked}
        name={name}
        disabled={disabled}
        onChange={onChange}
        id={name}
      />
      {markType === 'line' ? (
        <span className="checkbox__line" />
      ) : (
        <span className="checkbox__checkmark" />
      )}
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
}

export default Checkbox;
