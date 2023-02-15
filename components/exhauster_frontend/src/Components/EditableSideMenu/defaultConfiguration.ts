const defaultConfiguration = {
  uniqueMenuKey: 'SIDE_MENU',
  maxDepthLevel: 2,
  expandAllByDefault: false,
  enableDragAndDrop: true,
  isMenuReadOnly: false,
  mainPlusButton: {
    textContent: null,
    hoverTooltip: 'Добавить',
    glyphIconName: 'Plus',
  },
  item: {
    iconName: [],
    hoverTooltip: 'Открыть',
    // Array used for editItemNameButton, addChildButton, showChildrenButton
    // for possibility to style action buttons differently for different
    // levels of the list, if you don't need to style buttons differently
    // just create 1 element for array, like here
    // levels which do not have own option will use 0 element as default
    editItemNameButton: [
      {
        hoverTooltip: 'Редактировать',
        glyphIconName: 'Edit',
      },
    ],
    addChildButton: [
      {
        hoverTooltip: 'Добавить',
        glyphIconName: 'Plus',
      },
    ],
    showChildrenButton: [
      {
        hoverTooltip: 'Развернуть',
        glyphIconName: 'Chevron',
      },
    ],
    inputField: [
      {
        inputPlaceholder: 'Введите название',
        defaultItemName: 'Элемент',
        saveButton: {
          hoverTooltip: 'Сохранить',
          glyphIconName: 'Check',
        },
        cancelButton: {
          hoverTooltip: 'Отмена',
          glyphIconName: 'Cross',
        },
      },
    ],
  },
};

export default defaultConfiguration;
