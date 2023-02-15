import React, { useCallback, useState } from 'react';

import { Button, Glyph } from '../../../UIKit';
import Text from '../TextTitle';

import { TextDuplicateProps } from './TextDuplicate.interface';

import styles from './TextDuplicate.module.css';

function TextDuplicate(props: TextDuplicateProps) {
  const { textContent, className } = props;
  const [isCopied, setIsCopied] = useState(false);

  const copyOnClick = useCallback(() => {
    const textArea = document.createElement('textarea');
    textArea.value = textContent;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }, [textContent]);

  return (
    <div className={styles.container}>
      <Button
        type="button"
        className={`${styles.button} ${className}`}
        onClick={copyOnClick}
      >
        <figure className={styles.group}>
          <Glyph name="Copy" />
          <Text textContent={textContent} className={styles.text} />
        </figure>
      </Button>
      {isCopied && <Glyph name="Checkmark" className={styles.check_icon} />}
    </div>
  );
}

export default TextDuplicate;
