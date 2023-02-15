import React, { useState } from 'react';

import AdvancedTextbox from '../../AdvancedTextbox';
import { ItemInputFieldProps } from '../EditableSideMenu.interface';

import ItemButton from './ItemButton';

import styles from '../EditableSideMenu.module.css';

function ItemInputField(props: ItemInputFieldProps) {
  const { item, inputFieldConfig, actions, depthLevel, ordinalNumber } = props;
  const inputField = inputFieldConfig[depthLevel] || inputFieldConfig[0];
  const [value, setValue] = useState(
    item.displayName || `${inputField.defaultItemName}-${ordinalNumber}`,
  );

  const saveValue = () => {
    if (value && value !== item.displayName) {
      actions.updateItem(item.uniqueId, value);
    } else if (!value) {
      actions.removeItem(item.uniqueId);
    }

    actions.changeEditMode();
  };

  const closeChanges = () => {
    if (!item.displayName) {
      actions.removeItem(item.uniqueId);
    }

    actions.changeEditMode();
  };

  return (
    <div className={styles.edit_form}>
      <AdvancedTextbox
        initialValue={value}
        onChange={setValue}
        onEnterPress={saveValue}
        className={styles.textbox}
        placeholder={inputField.inputPlaceholder}
        onBlur={saveValue}
        containerClassName={styles.containerClassName}
        isAutoFocusEnabled
      >
        <ItemButton
          iconName={inputField.saveButton.glyphIconName}
          title={inputField.saveButton.hoverTooltip}
          onClick={saveValue}
        />
        <ItemButton
          iconName={inputField.cancelButton.glyphIconName}
          title={inputField.cancelButton.hoverTooltip}
          onClick={closeChanges}
        />
      </AdvancedTextbox>
    </div>
  );
}

export default React.memo(ItemInputField);
