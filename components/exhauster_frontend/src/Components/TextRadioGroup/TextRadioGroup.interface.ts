import { ReactNode } from 'react';

export type TextRadioGroupItemType = {
  id: string;
  value: string;
};

export type TextRadioGroupPropsType = {
  name: string;
  items: TextRadioGroupItemType[];
  selectedItemId: string;
  onChangeCheckedItem: (id: string) => void;
  className?: string;
  onRenderItem?: (item: TextRadioGroupItemType) => ReactNode;
};
