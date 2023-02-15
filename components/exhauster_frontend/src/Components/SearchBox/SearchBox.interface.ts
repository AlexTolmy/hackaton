export type SearchBoxItemType = {
  value: string;
  displayValue: string;
};

export type SearchBoxItemProps = {
  item: SearchBoxItemType;
  selectItem: () => void;
};

export type SearchBoxProps = {
  items: SearchBoxItemType[];
  selectedItem?: SearchBoxItemType;
  changeSelectedItem: (item: SearchBoxItemType) => void;
  className?: string;
};
