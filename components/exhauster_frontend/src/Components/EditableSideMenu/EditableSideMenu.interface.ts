import { ReactElement, SyntheticEvent } from 'react';

import { IconName } from '../AdvancedIcon/AdvancedIcon.interface';
import { DropPosition } from '../DragAndDropArea/DragAndDropArea.interface';

export type EditableSideMenuActions = {
  addItem: (parentId?: string) => void;
  updateItem: (itemId: string, value: string) => void;
  removeItem: (itemId: string) => void;
  clickItem: (itemId: string) => void;
  changeItemPosition?: (
    draggableItemId: string,
    dropItemId: string,
    dropPosition: DropPosition,
  ) => void;
};

type ConfigurationButtonType = {
  hoverTooltip: string;
  glyphIconName: string;
};

type ConfigurationInputFieldType = {
  inputPlaceholder: string;
  defaultItemName: string;
  saveButton: ConfigurationButtonType;
  cancelButton: ConfigurationButtonType;
};

type ConfigurationMainPlusButtonType = {
  textContent: string;
  hoverTooltip: string;
  glyphIconName: string;
};

export type ConfigurationType = {
  uniqueMenuKey?: string;
  maxDepthLevel?: number;
  expandAllByDefault?: boolean;
  enableDragAndDrop?: boolean;
  isMenuReadOnly?: boolean;
  mainPlusButton: ConfigurationMainPlusButtonType;
  item: {
    hoverTooltip: string;
    iconName: IconName[];
    editItemNameButton: ConfigurationButtonType[];
    addChildButton: ConfigurationButtonType[];
    showChildrenButton: ConfigurationButtonType[];
    inputField: ConfigurationInputFieldType[];
  };
};

export type ItemType = {
  uniqueId: string;
  displayName: string;
  isReadonly: boolean;
  parent: {
    uniqueId: string;
    displayName: string;
  };
};

export type EditableSideMenuPropsType = {
  itemsList: ItemType[];
  selectedItemId: string;
  actions: EditableSideMenuActions;
  configuration?: ConfigurationType;
  className?: string;
  isLoading?: boolean;
};

export type ItemProps = {
  item: ItemType;
  isSelected: boolean;
  children: ReactElement<ItemProps>[];
  actions: EditableSideMenuActions;
  configuration: ConfigurationType;
  currentDepthLevel: number;
  expandStatuses: Record<string, boolean>;
  ordinalNumber: number;
  toggleChildExpandState: (itemKey: string) => void;
  events?: {
    onDragStart: (event: SyntheticEvent) => void;
    onDragOver: (event: SyntheticEvent) => void;
    onDragEnd: (event: SyntheticEvent) => void;
  };
  className?: string;
  isDraggable?: boolean;
};

export type ItemInputFieldProps = {
  item: ItemType;
  actions: {
    changeEditMode: (event?: SyntheticEvent) => void;
    addItem: (parentId?: string) => void;
    updateItem: (itemId: string, value: string) => void;
    removeItem: (itemId: string) => void;
  };
  inputFieldConfig: ConfigurationInputFieldType[];
  isSelected: boolean;
  depthLevel: number;
  ordinalNumber: number;
};

export type ItemButtonProps = {
  iconName: string;
  title: string;
  textContent?: string;
  className?: string;
  iconClass?: string;
  onClick: (event: SyntheticEvent) => void;
};

export type ItemControlButtonsProps = {
  buttonsConfig: {
    editItemNameButton: ConfigurationButtonType[];
    addChildButton: ConfigurationButtonType[];
    showChildrenButton: ConfigurationButtonType[];
  };
  depthLevel: number;
  actions: {
    changeEditMode: (event?: SyntheticEvent) => void;
    addChildItem: (event?: SyntheticEvent) => void;
    showChildren: (event?: SyntheticEvent) => void;
  };
  blockChildrenAdding: boolean;
  isChildrenBtnVisible: boolean;
  isMenuReadOnly: boolean;
};

export type ControlButtonsProps = {
  itemsList: ItemType[];
  mainPlusButtonConfig: ConfigurationMainPlusButtonType;
  isAllExpanded: boolean;
  isMenuReadOnly: boolean;
  setIsListExpanded: () => void;
  addItem: (parentId?: string) => void;
};
