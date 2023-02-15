import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import clsx from 'clsx';

import SelectorItemType from '../Selector/Selector.interface';

import SettingsItem from './SettingsItem';
import {
  SettingsItemStackDirection,
  SettingsItemType,
  SettingsPanelPropsType,
} from './SettingsPanel.interface';

import styles from './SettingsPanel.module.css';

const NONE_STACK = 'none';

function SettingsPanel(props: SettingsPanelPropsType) {
  const { title, settings, onChangeCallback, className } = props;
  const [changedValues, setChangedValues] = useState<Object>(null);

  const changeExternalValue = useCallback(
    (item: SettingsItemType, value: boolean | string | SelectorItemType) => {
      const updatedSettings = changedValues ? { ...changedValues } : {};
      updatedSettings[item.id] = value;
      setChangedValues(updatedSettings);
      onChangeCallback(updatedSettings);
    },
    [changedValues, onChangeCallback],
  );

  const configList = useMemo(() => {
    const list: Record<
      string,
      { direction: SettingsItemStackDirection; items: ReactNode[] }
    > = {};

    settings.forEach((item) => {
      const { stack } = item;

      const stackId = stack?.id || NONE_STACK;
      const stackDirection =
        stack?.direction || SettingsItemStackDirection.Column;

      if (!list[stackId]) {
        list[stackId] = { direction: stackDirection, items: [] };
      }

      list[stackId].items.push(
        <span key={item.id}>
          <SettingsItem item={item} changeExternalValue={changeExternalValue} />
        </span>,
      );
    });

    const stacks: ReactNode[] = [];

    Object.keys(list).forEach((key) => {
      const { items, direction } = list[key];

      const isStack = items.length > 1 && key !== NONE_STACK;
      const isRow = direction === SettingsItemStackDirection.Row;

      const stackClass = clsx({
        [styles.stack]: isStack,
        [styles.stack_row]: isStack && isRow,
      });

      stacks.push(
        <li key={key} className={stackClass}>
          {list[key].items}
        </li>,
      );
    });

    return stacks;
  }, [changeExternalValue, settings]);

  useEffect(() => {
    setChangedValues(null);
  }, [title]);

  return (
    <div className={clsx(styles.config, className)}>
      {title && <h4>{title}</h4>}
      <ul>{configList}</ul>
    </div>
  );
}

export default React.memo(SettingsPanel);
