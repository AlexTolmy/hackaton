import React from 'react';

import styles from '../Table.module.css';

function renderCheckboxText(
  text: string,
  isChecked: boolean,
  onToggle: () => void,
) {
  return function Component() {
    return (
      <div className={styles.checkbox_text}>
        <input checked={isChecked} type="checkbox" onChange={onToggle} />
        <p>{text}</p>
      </div>
    );
  };
}

export default renderCheckboxText;
