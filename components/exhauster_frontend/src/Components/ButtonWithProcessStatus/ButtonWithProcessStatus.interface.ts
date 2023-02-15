export enum ButtonState {
  default = 'default',
  loading = 'loading',
  disabled = 'disabled',
}

export type ButtonWithProcessStatusProps = {
  title: string;
  onClick: () => void;
  state?: ButtonState;
  primary?: boolean;
  className?: string;
};
