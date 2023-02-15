import React, { ChangeEvent } from 'react';
import clsx from 'clsx';

import './Selector.css';

type SelectorProps = {
  items: { value: string; displayValue: string }[];
  selectedItem: { value: string; displayValue: string };
  className: string;
  onChange: (event: ChangeEvent) => void;
};

function Selector(props: SelectorProps) {
  const { items, selectedItem, className, onChange } = props;

  return (
    <select
      className={clsx(['selector', className])}
      onChange={onChange}
      value={selectedItem.value}
    >
      {items.map(({ value, displayValue }) => (
        <option key={value} value={value}>
          {displayValue}
        </option>
      ))}
    </select>
  );
}

export default Selector;
