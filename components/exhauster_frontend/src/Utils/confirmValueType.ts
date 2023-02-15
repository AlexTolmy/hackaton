// Check is value has numeric type
export function isValidNumber<T>(value: T): boolean {
  return !Number.isNaN(value) && typeof value === 'number';
}

export default {};
