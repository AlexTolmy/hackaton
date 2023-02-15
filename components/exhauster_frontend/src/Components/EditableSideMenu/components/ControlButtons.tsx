import React, { useMemo } from 'react';
import clsx from 'clsx';

import getTranslation from '../../../Utils/getTranslation';
import { ControlButtonsProps } from '../EditableSideMenu.interface';

import ItemButton from './ItemButton';

import styles from '../EditableSideMenu.module.css';

function ControlButtons(props: ControlButtonsProps) {
  const {
    mainPlusButtonConfig,
    isAllExpanded,
    itemsList,
    isMenuReadOnly,
    addItem,
    setIsListExpanded,
  } = props;

  const expandTitle = getTranslation(
    isAllExpanded ? 'collapseAll' : 'expandAll',
  );
  const hasChildItems = useMemo(
    () => itemsList.some((item) => item.parent),
    [itemsList],
  );

  const showChildrenButtonClass = clsx(
    styles.button_chevron,
    { expanded: isAllExpanded },
    styles.show_children_button,
  );

  const addItemAction = () => addItem();

  return (
    <div className={clsx(styles.main_plus_button, { hasChildItems })}>
      <ItemButton
        iconName="Chevron"
        onClick={setIsListExpanded}
        className={showChildrenButtonClass}
        iconClass={styles.button_icon_chevron}
        title={expandTitle}
      />
      {!isMenuReadOnly && (
        <ItemButton
          iconName={mainPlusButtonConfig.glyphIconName}
          onClick={addItemAction}
          title={mainPlusButtonConfig.hoverTooltip}
          textContent={mainPlusButtonConfig.textContent}
        />
      )}
    </div>
  );
}

export default React.memo(ControlButtons);
