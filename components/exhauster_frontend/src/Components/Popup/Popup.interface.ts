import { ReactNode } from 'react';

export type PopupProps = {
  children: ReactNode;
  width?: number;
  className?: string;
  cornerConfiguration?: {
    isCornerEnabled: boolean;
    cornerParentElement?: Element;
    cornerYOffset?: number;
  };
};

export type PopupCornerProps = {
  cornerParentElement: Element;
  yOffset: number;
  className?: string;
};
