import { IndicatorState } from './ExhausterContainer.interface';

export const SENSORS_TABLE_COLUMNS = ['sensorName', 'indicators'];

export enum SensorsTableSections {
  Problem = 'problem',
  Default = 'default',
}

export const SENSORS_TABLE_SECTIONS_INDICATORS = {
  [SensorsTableSections.Problem]: [
    IndicatorState.Warning,
    IndicatorState.Critical,
  ],
  [SensorsTableSections.Default]: [IndicatorState.Default],
};

export default {};
