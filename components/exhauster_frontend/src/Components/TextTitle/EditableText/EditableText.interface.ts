export type EditableTextProps = {
  textValue: string;
  onTextValueChanged: (value: string) => void;
  isReadOnly?: boolean;
  className?: string;
};

export type EditableTextControlProps = { onEdit: () => void };

export type EditableTextInputProps = {
  textValue: string;
  onSaveValue: (value: string) => void;
  onCancel: () => void;
  placeholder?: string;
};

export type EditableTextItemProps = { textValue: string };

export type EditableTextButtonProps = {
  iconName: string;
  title: string;
  onClick: () => void;
  textContent?: string;
  className?: string;
  iconClass?: string;
};

export default {};
