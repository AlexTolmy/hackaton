import {
  IndicatorState,
  IndicatorVariant,
  SensorType,
} from './ExhausterContainer.interface';

export const sensors: SensorType[] = [
  {
    sensorName: '№1  п-к',
    indicators: [
      { variant: IndicatorVariant.Temperature, state: IndicatorState.Default },
      { variant: IndicatorVariant.Vibration, state: IndicatorState.Default },
    ],
  },
  {
    sensorName: '№2  п-к',
    indicators: [
      { variant: IndicatorVariant.Temperature, state: IndicatorState.Default },
      { variant: IndicatorVariant.Vibration, state: IndicatorState.Default },
    ],
  },
  {
    sensorName: '№3  п-к',
    indicators: [
      { variant: IndicatorVariant.Vibration, state: IndicatorState.Critical },
    ],
  },
  {
    sensorName: '№4  п-к',
    indicators: [
      { variant: IndicatorVariant.Temperature, state: IndicatorState.Default },
      { variant: IndicatorVariant.Vibration, state: IndicatorState.Default },
    ],
  },
  {
    sensorName: '№5  п-к',
    indicators: [
      { variant: IndicatorVariant.Temperature, state: IndicatorState.Default },
    ],
  },
  {
    sensorName: '№6  п-к',
    indicators: [
      { variant: IndicatorVariant.Temperature, state: IndicatorState.Default },
    ],
  },
  {
    sensorName: '№7  п-к',
    indicators: [
      { variant: IndicatorVariant.Temperature, state: IndicatorState.Default },
      { variant: IndicatorVariant.Vibration, state: IndicatorState.Default },
    ],
  },
  {
    sensorName: '№8  п-к',
    indicators: [
      { variant: IndicatorVariant.Temperature, state: IndicatorState.Critical },
      { variant: IndicatorVariant.Vibration, state: IndicatorState.Warning },
    ],
  },
  {
    sensorName: '№9  п-к',
    indicators: [
      { variant: IndicatorVariant.Temperature, state: IndicatorState.Default },
    ],
  },
  {
    sensorName: 'Уровень масла',
    indicators: [
      { variant: IndicatorVariant.Oil, state: IndicatorState.Default },
    ],
  },
];

/* export const columns = [
  { key: 'sensorName', name: '' },
  { key: 'sensor1', name: '' },
  { key: 'sensor2', name: '' },
];

export const data = [
  {
    section: { key: 'warning', name: 'Предупреждение' },
    rows: [
      {
        sensorName: renderCell('№7  п-к'),
        sensor1: renderCell('T'),
        sensor2: renderCell('V'),
      },
      {
        sensorName: renderCell('№8  п-к'),
        sensor1: renderCell('T'),
        sensor2: renderCell('V'),
      },
    ],
  },
  {
    section: { key: 'all', name: 'Все' },
    rows: [
      {
        sensorName: renderCell('№1 п-к'),
        sensor1: renderCell('T'),
        sensor2: renderCell('V'),
      },
      {
        sensorName: renderCell('№1 п-к'),
        sensor1: renderCell('T'),
        sensor2: renderCell('V'),
      },
      {
        sensorName: renderCell('№1 п-к'),
        sensor1: renderCell('T'),
        sensor2: renderCell('V'),
      },
      {
        sensorName: renderCell('№1 п-к'),
        sensor1: renderCell('T'),
        sensor2: renderCell('V'),
      },
      {
        sensorName: renderCell('№1 п-к'),
        sensor1: renderCell('T'),
        sensor2: renderCell('V'),
      },
      {
        sensorName: renderCell('№1 п-к'),
        sensor1: renderCell('T'),
        sensor2: renderCell('V'),
      },
    ],
  },
];
 */
