/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import clsx from 'clsx';

import AdvancedIcon from '../../AdvancedIcon/AdvancedIcon';
import Text from '../../TextTitle/TextTitle';
import { ItemProps } from '../EditableSideMenu.interface';
import useItemActions from '../hooks/useItemActions';

import ItemControlButtons from './ItemControlButtons';
import ItemInputField from './ItemInputField';

import styles from '../EditableSideMenu.module.css';

function Item(props: ItemProps) {
  const {
    item,
    isSelected,
    children,
    actions,
    configuration,
    currentDepthLevel,
    expandStatuses,
    toggleChildExpandState,
    events,
    className,
    isDraggable,
    ordinalNumber,
  } = props;

  const { item: itemConfig, maxDepthLevel, isMenuReadOnly } = configuration;

  const isChild = !!item.parent;

  const {
    isEditMode,
    areChildrenVisible,
    changeEditMode,
    addChildItem,
    showChildren,
    openItem,
  } = useItemActions(
    item,
    children,
    actions,
    expandStatuses,
    toggleChildExpandState,
  );

  const containerClass = clsx(
    styles.item_container,
    {
      isSelected,
      isChild,
      areChildrenVisible: areChildrenVisible && children?.length > 0,
    },
    className,
  );

  const itemIconName =
    itemConfig.iconName[currentDepthLevel] || itemConfig.iconName[0];

  return (
    <div className={containerClass}>
      <div
        role="button"
        tabIndex={0}
        onClick={openItem}
        onKeyDown={openItem}
        title={itemConfig.hoverTooltip}
        className={styles.item}
        onDragStart={events?.onDragStart}
        onDragOver={events?.onDragOver}
        onDragEnd={events?.onDragEnd}
        draggable={isDraggable && !isEditMode}
      >
        {isEditMode ? (
          <ItemInputField
            item={item}
            inputFieldConfig={itemConfig.inputField}
            actions={{ ...actions, changeEditMode }}
            isSelected={isSelected}
            depthLevel={currentDepthLevel}
            ordinalNumber={ordinalNumber}
          />
        ) : (
          <>
            <div className={styles.item_title_container}>
              {itemIconName && (
                <AdvancedIcon
                  iconName={itemIconName}
                  iconText={ordinalNumber?.toString()}
                />
              )}
              <Text textContent={item.displayName} className={styles.text} />
            </div>
            <ItemControlButtons
              buttonsConfig={itemConfig}
              depthLevel={currentDepthLevel}
              actions={{ changeEditMode, addChildItem, showChildren }}
              blockChildrenAdding={maxDepthLevel === currentDepthLevel}
              isChildrenBtnVisible={children?.length > 0}
              isMenuReadOnly={isMenuReadOnly}
            />
          </>
        )}
      </div>
      {areChildrenVisible && <div className={styles.children}>{children}</div>}
    </div>
  );
}

export default React.memo(Item);
