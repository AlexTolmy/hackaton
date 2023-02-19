import React from 'react';

import styles from '../Table.module.css';

function renderDefaultText(
  text: string,
  onMouseEnter?: () => {},
  onMouseLeave?: () => {},
) {
  return function TextRender() {
    if (onMouseEnter && onMouseLeave) {
      return (
        <p
          className={styles.interaction}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {text}
        </p>
      );
    }

    return <p>{text}</p>;
  };
}

export default renderDefaultText;
