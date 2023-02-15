import { ReactElement } from 'react';

export type DragAndDropAreaProps = {
  children: ReactElement[];
  changeItemPosition: (
    draggableItem: ReactElement,
    dropItem: ReactElement,
    dropPosition: DropPosition,
  ) => void;
  className?: string;
  dropItemClassName?: string;
};

export enum DropPosition {
  Before = 'before',
  After = 'after',
}

export type CustomEventType = {
  target: HTMLDivElement;
  clientY: number;
  preventDefault: () => void;
};
