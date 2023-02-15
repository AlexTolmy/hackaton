import React, { ReactElement, useCallback, useMemo } from 'react';

import Item from '../components/Item';
import {
  ConfigurationType,
  EditableSideMenuActions,
  ItemProps,
  ItemType,
} from '../EditableSideMenu.interface';

function useMenuElements(
  itemsList: ItemType[],
  selectedItemId: string,
  actions: EditableSideMenuActions,
  configuration: ConfigurationType,
  expandStatuses: Record<string, boolean>,
  toggleChildExpandState: (itemKey: string) => void,
) {
  const getMenuElement = useCallback(
    (item: ItemType, currentDepthLevel: number, ordinalNumber: number) => (
      <Item
        key={item.uniqueId}
        item={item}
        isSelected={item.uniqueId === selectedItemId}
        actions={actions}
        configuration={configuration}
        currentDepthLevel={currentDepthLevel}
        expandStatuses={expandStatuses}
        toggleChildExpandState={toggleChildExpandState}
        ordinalNumber={ordinalNumber}
      >
        {[]}
      </Item>
    ),
    [
      actions,
      configuration,
      expandStatuses,
      selectedItemId,
      toggleChildExpandState,
    ],
  );

  const menuElements = useMemo(() => {
    const elementsList: ReactElement<ItemProps>[] = [];

    if (itemsList && itemsList.length > 0) {
      // That variable save references to elements
      // for pushing children elements without long searching
      const reactNodesRefs = {};
      // We should calculate depth for disabling possibility
      // add children to children which were placed on max depth level
      const reactNodesDepthLevel = {};

      // Storage for calculate item ordinary number, depends on parent and depth
      // 1 -> 1,2,3  2 -> 1,2 etc
      // Currently it only for display visually item position
      // (number close to icon)
      const ordinaryNumbers = {};

      itemsList.forEach((item) => {
        const isChild = Boolean(item.parent);

        // If current element is child
        // we should take parent depth level and add 1
        if (isChild && reactNodesRefs[item.parent.uniqueId]) {
          reactNodesDepthLevel[item.uniqueId] =
            reactNodesDepthLevel[item.parent.uniqueId] + 1;
        } else {
          // if item does not have parent it is 1 level
          reactNodesDepthLevel[item.uniqueId] = 1;
        }

        // Take item depth (it can be 1, 2, 3 etc)
        const itemDepth = reactNodesDepthLevel[item.uniqueId];
        // Take parent
        const itemParentId = item.parent?.uniqueId;
        // Create unique key for items from the same depth level and parent
        // We will increase that value, for ordinary on the same level
        const itemOrdinaryKey = `${itemParentId}-${itemDepth}`;

        // If item ordinary does not exist create it is ordinary 1
        if (ordinaryNumbers[itemOrdinaryKey] === undefined) {
          ordinaryNumbers[itemOrdinaryKey] = 1;
        } else {
          // Otherwise take previous number
          ordinaryNumbers[itemOrdinaryKey] += 1;
        }

        // Create element and add it to elements ref
        // for adding children in the future
        reactNodesRefs[item.uniqueId] = getMenuElement(
          item,
          reactNodesDepthLevel[item.uniqueId],
          ordinaryNumbers[itemOrdinaryKey],
        );

        // If current element has parent element and parent exists in the refs
        if (isChild && reactNodesRefs[item.parent.uniqueId]) {
          // Take parent element by name from refs list and
          // push child element to parent children array
          reactNodesRefs[item.parent.uniqueId].props.children.push(
            reactNodesRefs[item.uniqueId],
          );
        } else {
          // If element does not have parent element, just add
          // that element to elements array from refs list
          elementsList.push(reactNodesRefs[item.uniqueId]);
        }
      });
    }

    return elementsList;
  }, [getMenuElement, itemsList]);

  return { menuElements };
}

export default useMenuElements;
