import { ReactNode } from 'react';

type ModalButtonType = {
  title: string;
  action: () => void;
  primary?: boolean;
};

type ModalDialogProps = {
  setIsVisible: (visibility: boolean) => void;
  children: ReactNode;
  acceptButton: ModalButtonType;
  className?: string;
};

export default ModalDialogProps;
