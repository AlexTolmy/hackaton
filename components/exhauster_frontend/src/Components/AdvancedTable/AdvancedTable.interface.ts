import { TableProps } from '../../UIKit/Table/TableProps';

export type AdvancedTableProps = {
  tableProps: TableProps;
  isLoading?: boolean;
  className?: string;
};

export type InputCellRenderProps = {
  onChangeValue: (value: string) => void;
  inputType: InputType;
  placeholder?: string;
  isLoading?: boolean;
};

export type ButtonCellRenderProps = {
  icon: string;
  onClick: () => void;
  title?: string;
  className?: string;
};

export enum InputType {
  Number = 'number',
  Text = 'text',
}

export enum RenderType {
  Text = 'text',
  Input = 'input',
  Button = 'button',
}
