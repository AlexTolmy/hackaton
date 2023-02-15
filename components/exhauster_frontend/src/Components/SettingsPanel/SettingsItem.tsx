import React, { ChangeEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

import Checkbox from '../Checkbox';
import SearchBox from '../SearchBox/SearchBox';
import { SearchBoxItemType } from '../SearchBox/SearchBox.interface';
import Selector from '../Selector';
import SelectorItemType from '../Selector/Selector.interface';
import Textbox from '../Textbox';
import TextRadioGroup from '../TextRadioGroup';
import Text from '../TextTitle/TextTitle';

import {
  ItemRenderType,
  SettingsItemPropsType,
} from './SettingsPanel.interface';

import styles from './SettingsPanel.module.css';

function SettingsItem(props: SettingsItemPropsType) {
  const { item, changeExternalValue } = props;
  const [value, setValue] = useState(item.initialValue);
  const isRequired = item.isRequired && !value;

  const commonClassName = clsx(styles.item, {
    [styles.item_required]: isRequired,
  });

  const changeLocalValue = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  const saveToExternalStorage = () => changeExternalValue(item, value);
  const changeSelectorValue = (event: ChangeEvent<HTMLInputElement>) => {
    const selectorValue = item.list.find(
      (element) => element.value === event.target.value,
    );
    setValue(selectorValue);
    changeExternalValue(item, selectorValue);
  };
  const changeRadioGroupValue = (itemValue: string) => {
    const radioGroupValue = item.list.find(
      (element) => element.value === itemValue,
    );
    setValue(radioGroupValue);
    changeExternalValue(item, radioGroupValue);
  };
  const changeSearchBoxValue = (searchBoxItem: SearchBoxItemType) => {
    setValue(searchBoxItem);
    changeExternalValue(item, searchBoxItem);
  };
  const changeCheckboxValue = () => {
    setValue(!value);
    changeExternalValue(item, !value);
  };

  useEffect(() => {
    setValue(item.initialValue);
  }, [item.initialValue]);

  switch (item.type) {
    case ItemRenderType.Text: {
      return (
        <>
          <Text className={styles.text} textContent={item.name} />
          <Textbox
            value={value || ''}
            className={commonClassName}
            onChange={changeLocalValue}
            onBlur={saveToExternalStorage}
          />
        </>
      );
    }
    case ItemRenderType.Number: {
      return (
        <>
          <Text className={styles.text} textContent={item.name} />
          <Textbox
            pattern="^[0-9]+$"
            value={value || ''}
            className={commonClassName}
            onChange={changeLocalValue}
            onBlur={saveToExternalStorage}
            type="number"
          />
        </>
      );
    }
    case ItemRenderType.Dropdown: {
      return (
        <>
          <Text className={styles.text} textContent={item.name} />
          <Selector
            items={item.list}
            selectedItem={value as SelectorItemType}
            className={commonClassName}
            onChange={changeSelectorValue}
          />
        </>
      );
    }
    case ItemRenderType.Checkbox: {
      return (
        <Checkbox
          className={clsx(commonClassName, styles.checkbox)}
          checked={value}
          onChange={changeCheckboxValue}
          label={item.name}
          name={item.id}
        />
      );
    }
    case ItemRenderType.Color: {
      return (
        <>
          <Text className={styles.text} textContent={item.name} />
          <Textbox
            value={value || ''}
            className={clsx(commonClassName, styles.color_picker)}
            onChange={changeLocalValue}
            onBlur={saveToExternalStorage}
            type="color"
          />
        </>
      );
    }
    case ItemRenderType.RadioGroup: {
      const radioValue = value as SelectorItemType;
      const items = item.list.map((element) => ({
        id: element.value,
        value: element.displayValue,
      }));

      return (
        <>
          <Text className={styles.text} textContent={item.name} />
          <TextRadioGroup
            name={item.id}
            items={items}
            selectedItemId={radioValue?.value}
            onChangeCheckedItem={changeRadioGroupValue}
            className={clsx(commonClassName, styles.radio_group)}
          />
        </>
      );
    }
    case ItemRenderType.SearchBox: {
      return (
        <>
          <Text className={styles.text} textContent={item.name} />
          <SearchBox
            items={item.list}
            selectedItem={value as SearchBoxItemType}
            className={commonClassName}
            changeSelectedItem={changeSearchBoxValue}
          />
        </>
      );
    }
    default: {
      return <p>{item.name}</p>;
    }
  }
}

export default React.memo(SettingsItem);
