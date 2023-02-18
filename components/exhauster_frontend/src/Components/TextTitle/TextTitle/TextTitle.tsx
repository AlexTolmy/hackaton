import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { TextTitleProps } from './TextTitle.interface';

import styles from './TextTitle.module.css';

function TextTitle(props: TextTitleProps) {
  const { textContent, className } = props;
  const textRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const textEl = textRef.current;
    setIsOverflow(textEl.offsetWidth < textEl.scrollWidth);
  }, [textRef]);

  return (
    <div className={clsx(styles.container, className)}>
      <p
        ref={textRef}
        title={isOverflow ? textContent : undefined}
        className={styles.text}
      >
        {textContent}
      </p>
    </div>
  );
}

export default React.memo(TextTitle);
