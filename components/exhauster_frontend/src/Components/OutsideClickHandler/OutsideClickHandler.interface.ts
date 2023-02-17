import { ReactNode } from 'react';

export type OutsideClickHandlerProps = {
  onOutsideClick: () => void;
  children: ReactNode;
  className?: string;
};
