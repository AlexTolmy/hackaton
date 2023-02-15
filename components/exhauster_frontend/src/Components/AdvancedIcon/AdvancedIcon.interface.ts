export enum IconName {
  Check = 'Check',
  Chevron = 'Chevron',
  Checkmark = 'Checkmark',
  Edit = 'Edit',
  Menu = 'Menu',
  Filter = 'Filter',
  Cross = 'Cross',
  Ok = 'Ok',
  Warning = 'Warning',
  Plus = 'Plus',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Calendar = 'Calendar',
  Chart = 'Chart',
  TrendingUp = 'TrendingUp',
  TrendingDown = 'TrendingDown',
  Target = 'Target',
  Trash = 'Trash',
  Copy = 'Copy',
  Search = 'Search',
  Comment = 'Comment',
}

export type AdvancedIconProps = {
  iconName: IconName;
  iconText?: string;
};
