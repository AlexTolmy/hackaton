import {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import stopPropagation from '../../../Utils/stopPropagation';
import { ItemProps } from '../EditableSideMenu.interface';

const STORAGE_KEY = 'MENU_ITEM';

function useItemActions(
  item,
  children,
  actions,
  expandStatuses: Record<string, boolean>,
  toggleChildExpandState: (itemKey: string) => void,
) {
  const [childrenLength, setChildrenLength] = useState(children.length);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isEditMode, setIsEditMode] = useState(!item.displayName);
  const key = `${STORAGE_KEY}-${item.uniqueId}`;
  const isExpanded = expandStatuses[key];

  const changeEditMode = (event: SyntheticEvent) => {
    setIsEditMode(!isEditMode);
    stopPropagation(event);
  };

  const addChildItem = (event: SyntheticEvent) => {
    actions.addItem(item?.uniqueId);
    stopPropagation(event);
  };

  const showChildren = (event: SyntheticEvent) => {
    toggleChildExpandState(key);
    stopPropagation(event);
  };

  const openItem = (event) => {
    const isReadOnly = item?.isReadonly;
    const isNotEnterPress = event.key && event.key !== 'Enter';
    if (isEditMode || isReadOnly || isNotEnterPress) {
      return;
    }

    actions.clickItem(item.uniqueId);
    stopPropagation(event);
  };

  useEffect(() => {
    if (isExpanded === undefined) {
      toggleChildExpandState(key);
    }
  }, [isExpanded, key, toggleChildExpandState]);

  const showSelectedChild = useCallback(
    (elements: ReactElement<ItemProps>[]) => {
      elements.forEach((element) => {
        if (element.props.isSelected && !isExpanded) {
          toggleChildExpandState(key);
        }

        showSelectedChild(element.props.children);
      });
    },
    [isExpanded, key, toggleChildExpandState],
  );

  useEffect(() => {
    if (isFirstRender || childrenLength !== children.length) {
      showSelectedChild(children);
      setIsFirstRender(false);
      setChildrenLength(children.length);
    }
  }, [children, childrenLength, isFirstRender, showSelectedChild]);

  return {
    isEditMode,
    areChildrenVisible: isExpanded,
    changeEditMode,
    addChildItem,
    showChildren,
    openItem,
  };
}

export default useItemActions;
