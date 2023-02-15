import React from 'react';
import clsx from 'clsx';

import { ButtonWithIcon } from '../../../UIKit';

import { EditableTextButtonProps } from './EditableText.interface';

import styles from './EditableText.module.css';

function EditableTextButton(props: EditableTextButtonProps) {
  const { iconName, title, onClick, iconClass, textContent, className } = props;

  return (
    <ButtonWithIcon
      glyphNameLeft={iconName}
      className={clsx(styles.button, className)}
      glyphClassName={clsx(styles.button_icon, iconClass)}
      title={title}
      onClick={onClick}
    >
      {textContent}
    </ButtonWithIcon>
  );
}

export default React.memo(EditableTextButton);
