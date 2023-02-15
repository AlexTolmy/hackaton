import React from 'react';
import clsx from 'clsx';

import { ButtonWithIcon } from '../../../UIKit';
import { ItemButtonProps } from '../EditableSideMenu.interface';

import styles from '../EditableSideMenu.module.css';

function ItemButton(props: ItemButtonProps) {
  const { iconName, className, iconClass, title, textContent, onClick } = props;

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

export default React.memo(ItemButton);
