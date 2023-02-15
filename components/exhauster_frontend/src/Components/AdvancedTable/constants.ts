import { InputType } from './AdvancedTable.interface';

export const inputTypes = {
  number: { pattern: '^[0-9]+$', type: InputType.Number },
  text: { pattern: '', type: InputType.Text },
};

export default {};
