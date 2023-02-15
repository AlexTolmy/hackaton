import SelectorItemType from '../Selector/Selector.interface';

export enum ItemRenderType {
  Text = 'text',
  Number = 'number',
  Dropdown = 'dropdown',
  Checkbox = 'checkbox',
  Color = 'color',
  RadioGroup = 'radioGroup',
  SearchBox = 'searchBox',
}

export enum SettingsItemStackDirection {
  Row = 'row',
  Column = 'column',
}

export type SettingsItemStackType = {
  id: string;
  direction?: SettingsItemStackDirection;
};

export type SettingsItemType = {
  id: string;
  name: string;
  type: ItemRenderType;
  initialValue: boolean | string | SelectorItemType;
  list?: SelectorItemType[];
  stack?: SettingsItemStackType;
  isRequired?: boolean;
};

export type SettingsItemPropsType = {
  item: SettingsItemType;
  changeExternalValue: (
    item: SettingsItemType,
    value: boolean | string | SelectorItemType,
  ) => void;
};

export type SettingsPanelPropsType = {
  title: string;
  settings: SettingsItemType[];
  onChangeCallback: (value: Object) => void;
  className?: string;
};
