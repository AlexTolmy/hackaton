import React from 'react';
import clsx from 'clsx';

import './Radiobutton.css';

type RadioButtonProps = {
  name: string;
  isChecked: boolean;
  onChange: () => void;
  isDisabled?: boolean;
  className?: string;
  label?: React.ReactNode;
};

function RadioButton(props: RadioButtonProps) {
  const { name, isChecked, onChange, isDisabled, className, label } = props;

  return (
    <label htmlFor={name} className={clsx('radiobutton', className)}>
      <input
        type="radio"
        checked={isChecked}
        name={name}
        disabled={isDisabled}
        onChange={onChange}
      />
      <span className="radiobutton__checkmark" />
      {label && <span className="radiobutton__label">{label}</span>}
    </label>
  );
}

export default RadioButton;
