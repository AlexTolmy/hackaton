import React from 'react';

import { ItemControlButtonsProps } from '../EditableSideMenu.interface';

import ItemButton from './ItemButton';

import styles from '../EditableSideMenu.module.css';

function ItemControlButtons(props: ItemControlButtonsProps) {
  const {
    buttonsConfig,
    depthLevel,
    actions,
    blockChildrenAdding,
    isChildrenBtnVisible,
    isMenuReadOnly,
  } = props;

  const { editItemNameButton, addChildButton, showChildrenButton } =
    buttonsConfig;
  const editBtnConfig = editItemNameButton[depthLevel] || editItemNameButton[0];
  const addBtnConfig = addChildButton[depthLevel] || addChildButton[0];
  const showBtnConfig = showChildrenButton[depthLevel] || showChildrenButton[0];

  return (
    <div className={styles.control_buttons_container}>
      <div className={styles.control_buttons}>
        {!isMenuReadOnly && (
          <ItemButton
            iconName={editBtnConfig.glyphIconName}
            title={editBtnConfig.hoverTooltip}
            onClick={actions.changeEditMode}
          />
        )}
        {!blockChildrenAdding && !isMenuReadOnly && (
          <ItemButton
            iconName={addBtnConfig.glyphIconName}
            title={addBtnConfig.hoverTooltip}
            onClick={actions.addChildItem}
          />
        )}
        {isChildrenBtnVisible && (
          <ItemButton
            iconName={showBtnConfig.glyphIconName}
            title={showBtnConfig.hoverTooltip}
            className={styles.button_chevron}
            iconClass={styles.button_icon_chevron}
            onClick={actions.showChildren}
          />
        )}
      </div>
    </div>
  );
}

export default React.memo(ItemControlButtons);
