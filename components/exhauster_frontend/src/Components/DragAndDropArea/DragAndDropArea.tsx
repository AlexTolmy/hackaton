import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import clsx from 'clsx';

import stopPropagation from '../../Utils/stopPropagation';

import {
  CustomEventType,
  DragAndDropAreaProps,
  DropPosition,
} from './DragAndDropArea.interface';

import styles from './DragAndDropArea.module.css';

function DragAndDropArea(props: DragAndDropAreaProps) {
  const { children, changeItemPosition, className, dropItemClassName } = props;

  const [dragItem, setDragItem] = useState<ReactElement>();
  const [dropItem, setDropItem] = useState<ReactElement>();
  const [dropPosition, setDropPosition] = useState(DropPosition.After);

  const updateDropPosition = (cursorPos: number, elementHeight: number) => {
    const elementCenter = elementHeight / 2;
    if (cursorPos > elementCenter) {
      setDropPosition(DropPosition.After);
    } else {
      setDropPosition(DropPosition.Before);
    }
  };

  const updateDragItem = useCallback(
    (item?: ReactElement) => (event?: SyntheticEvent) => {
      setDragItem(item);
      stopPropagation(event);
    },
    [],
  );

  const updateDropItem = useCallback(
    (item?: ReactElement) => (event: CustomEventType) => {
      const cursorPos = event.clientY - event.target.offsetTop;
      updateDropPosition(cursorPos, event.target.clientHeight);

      if (dragItem) {
        setDropItem(item);
        stopPropagation(event as unknown as SyntheticEvent);
      }

      event.preventDefault();
    },
    [dragItem],
  );

  const clearDragAndDrop = useCallback(() => {
    if (dragItem) {
      setDragItem(null);
    }

    if (dropItem) {
      setDropItem(null);
    }
  }, [dragItem, dropItem]);

  const moveItem = useCallback(
    (event: SyntheticEvent) => {
      const isDragItemExists = !!dragItem;
      const isCallbackActionExists = !!changeItemPosition;
      const isDropItemEqualDrag = isEqual(dropItem, dragItem);

      if (isDragItemExists && isCallbackActionExists && !isDropItemEqualDrag) {
        changeItemPosition(dragItem, dropItem, dropPosition);
      }

      clearDragAndDrop();
      stopPropagation(event);
    },
    [changeItemPosition, clearDragAndDrop, dragItem, dropItem, dropPosition],
  );

  const createDraggableItems = useCallback(
    (items: ReactElement[]) => {
      const draggableItems = [];

      items.forEach((item) => {
        let clonedChildren = [];

        if (item.props.children.length) {
          clonedChildren = createDraggableItems(item.props.children);
        }

        const isDropItem = dragItem && isEqual(dropItem, item);

        const itemClass = clsx(styles.item, dropPosition, {
          isDropItem,
          [dropItemClassName]: isDropItem,
        });

        const draggableProps = {
          events: {
            onDragStart: updateDragItem(item),
            onDragOver: updateDropItem(item),
            onDragEnd: moveItem,
          },
          className: itemClass,
          isDraggable: true,
        };

        const clonedItem = React.cloneElement(
          item,
          draggableProps,
          clonedChildren,
        );

        draggableItems.push(clonedItem);
      });

      return draggableItems;
    },
    [
      dragItem,
      dropItem,
      dropItemClassName,
      dropPosition,
      moveItem,
      updateDragItem,
      updateDropItem,
    ],
  );

  const draggableItems = useMemo(
    () => createDraggableItems(children),
    [children, createDraggableItems],
  );

  return (
    <div className={clsx(styles.container, className)}>{draggableItems}</div>
  );
}

export default React.memo(DragAndDropArea);
