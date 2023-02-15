import { ReactNode } from 'react';

export type AdvancedTextboxProps = {
  onChange: (value: string) => void;
  onEnterPress?: (value: string) => void;
  onBlur?: () => void;
  initialValue?: string;
  placeholder?: string;
  isAutoFocusEnabled?: boolean;
  containerClassName?: string;
  className?: string;
  children?: ReactNode;
};
