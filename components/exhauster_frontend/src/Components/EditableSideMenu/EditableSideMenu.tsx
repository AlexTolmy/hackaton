import React, { ReactElement } from 'react';
import clsx from 'clsx';

import { Spinner } from '../../UIKit';
import useExpandCollapseFeature from '../../Utils/useExpandCollapseFeature';
import DragAndDropArea from '../DragAndDropArea';
import { DropPosition } from '../DragAndDropArea/DragAndDropArea.interface';

import ControlButtons from './components/ControlButtons';
import useMenuElements from './hooks/useMenuElements';
import defaultConfiguration from './defaultConfiguration';
import {
  EditableSideMenuPropsType,
  ItemProps,
} from './EditableSideMenu.interface';

import styles from './EditableSideMenu.module.css';

function EditableSideMenu(props: EditableSideMenuPropsType) {
  const {
    itemsList,
    selectedItemId,
    actions,
    configuration = defaultConfiguration,
    className,
    isLoading,
  } = props;

  const {
    uniqueMenuKey,
    expandAllByDefault,
    enableDragAndDrop,
    mainPlusButton,
    isMenuReadOnly,
  } = configuration;

  const {
    isAllExpanded,
    expandStatuses,
    toggleAllExpandStates,
    toggleChildExpandState,
  } = useExpandCollapseFeature(uniqueMenuKey, expandAllByDefault);

  const { menuElements } = useMenuElements(
    itemsList,
    selectedItemId,
    actions,
    configuration,
    expandStatuses,
    toggleChildExpandState,
  );

  const changeItemPosition = (
    drag: ReactElement<ItemProps>,
    drop: ReactElement<ItemProps>,
    dropPosition: DropPosition,
  ) => {
    const dragItemId = drag?.props?.item.uniqueId;
    const dropItemId = drop?.props?.item.uniqueId;

    if (dragItemId && dropItemId) {
      actions.changeItemPosition(dragItemId, dropItemId, dropPosition);
    }
  };

  return (
    <div className={clsx(styles.editable_side_menu, className)}>
      {isLoading ? (
        <Spinner />
      ) : (
        <ControlButtons
          itemsList={itemsList}
          isAllExpanded={isAllExpanded}
          mainPlusButtonConfig={mainPlusButton}
          addItem={actions.addItem}
          setIsListExpanded={toggleAllExpandStates}
          isMenuReadOnly={isMenuReadOnly}
        />
      )}
      {enableDragAndDrop && !isMenuReadOnly ? (
        <DragAndDropArea
          changeItemPosition={changeItemPosition}
          dropItemClassName={styles.drop_item}
        >
          {menuElements}
        </DragAndDropArea>
      ) : (
        menuElements
      )}
    </div>
  );
}

export default React.memo(EditableSideMenu);
