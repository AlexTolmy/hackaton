import React, { useMemo } from 'react';
import clsx from 'clsx';

import RadioButton from '../RadioButton';

import { TextRadioGroupPropsType } from './TextRadioGroup.interface';

import './TextRadioGroup.css';
import styles from './TextRadioGroup.module.css';

function TextRadioGroup(props: TextRadioGroupPropsType) {
  const {
    name,
    items,
    selectedItemId,
    onChangeCheckedItem,
    className,
    onRenderItem,
  } = props;

  const renderButtons = useMemo(() => {
    const changeItem = (id: string) => () => onChangeCheckedItem(id);

    return items.map((item) => {
      return (
        <RadioButton
          key={item.id}
          label={onRenderItem ? onRenderItem(item) : item.value}
          isChecked={item.id === selectedItemId}
          onChange={changeItem(item.id)}
          name={name}
          className={styles.radio_button}
        />
      );
    });
  }, [items, name, onChangeCheckedItem, onRenderItem, selectedItemId]);

  return <div className={clsx(styles.group, className)}>{renderButtons}</div>;
}

export default React.memo(TextRadioGroup);
