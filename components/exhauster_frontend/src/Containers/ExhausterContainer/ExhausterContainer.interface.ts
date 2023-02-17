export enum IndicatorVariant {
  Temperature = 'temperature',
  Vibration = 'vibration',
  Oil = 'oil',
}

export enum IndicatorState {
  Default = 'default',
  Warning = 'warning',
  Critical = 'critical',
}

export type IndicatorType = {
  variant: IndicatorVariant;
  state: IndicatorState;
};

export type SensorType = {
  sensorName: string;
  indicators: IndicatorType[];
};

export default {};
