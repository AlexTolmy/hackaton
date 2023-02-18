import {
  IndicatorState,
  IndicatorVariant,
  SensorType,
} from '../Containers/ExhausterContainer/ExhausterContainer.interface';
import {
  ChartDataType,
  ChartSensorType,
  ExhausterChart,
} from '../Store/types/ExhausterChartDataReducerType';
import { ExhausterGeneralScheme } from '../Store/types/ExhausterMnemoSchemeReducerType';

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

export const exhaustersMock = {
  'Эксгаустер Ф-172': {
    angloMachineName: 'Агломашина №1',
    exhausterName: 'Эксгаустер Ф-172',
    rotorName: 'Ротор № 24',
    rotorLastChangeDate: new Date('2023-02-13T10:00:00.00'),
    rotorNextChangeDate: new Date('2023-02-23T10:00:00.00'),
    sensors,
  },
  'Эксгаустер Ф-173': {
    angloMachineName: 'Агломашина №1',
    exhausterName: 'Эксгаустер Ф-173',
    rotorName: 'Ротор № 25',
    rotorLastChangeDate: new Date('2023-02-13T10:00:00.00'),
    rotorNextChangeDate: new Date('2023-02-23T10:00:00.00'),
    sensors,
  },
  'Эксгаустер Ф-174': {
    angloMachineName: 'Агломашина №2',
    exhausterName: 'Эксгаустер Ф-174',
    rotorName: 'Ротор № 26',
    rotorLastChangeDate: new Date('2023-02-13T10:00:00.00'),
    rotorNextChangeDate: new Date('2023-02-23T10:00:00.00'),
    sensors,
  },
  'Эксгаустер Ф-175': {
    angloMachineName: 'Агломашина №2',
    exhausterName: 'Эксгаустер Ф-175',
    rotorName: 'Ротор № 27',
    rotorLastChangeDate: new Date('2023-02-13T10:00:00.00'),
    rotorNextChangeDate: new Date('2023-02-23T10:00:00.00'),
    sensors,
  },
  'Эксгаустер Ф-176': {
    angloMachineName: 'Агломашина №3',
    exhausterName: 'Эксгаустер Ф-176',
    rotorName: 'Ротор № 28',
    rotorLastChangeDate: new Date('2023-02-13T10:00:00.00'),
    rotorNextChangeDate: new Date('2023-02-23T10:00:00.00'),
    sensors,
  },
  'Эксгаустер Ф-177': {
    angloMachineName: 'Агломашина №3',
    exhausterName: 'Эксгаустер Ф-177',
    rotorName: 'Ротор № 29',
    rotorLastChangeDate: new Date('2023-02-13T10:00:00.00'),
    rotorNextChangeDate: new Date('2023-02-23T10:00:00.00'),
    sensors,
  },
};

const schemeMock = {
  psSensors: [
    {
      T: { value: 220, state: IndicatorState.Critical },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Critical },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
    {
      T: { value: 220, state: IndicatorState.Default },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Default },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
    {
      T: { value: 220, state: IndicatorState.Default },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Default },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
    {
      T: { value: 220, state: IndicatorState.Default },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Default },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
    {
      T: { value: 220, state: IndicatorState.Default },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Default },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
    {
      T: { value: 220, state: IndicatorState.Default },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Default },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
    {
      T: { value: 220, state: IndicatorState.Default },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Default },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
    {
      T: { value: 220, state: IndicatorState.Default },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Default },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
    {
      T: { value: 220, state: IndicatorState.Default },
      B: { value: 8, state: IndicatorState.Critical },
      G: { value: 0, state: IndicatorState.Default },
      O: { value: 0, state: IndicatorState.Critical },
      commonState: IndicatorState.Critical,
    },
  ],
  oreInput: {
    gasTemp: 46,
    discharge: '74.3',
    dustLevel: '15',
  },
  smokePipeState: 45,
  oilTank: { value: 67, state: IndicatorState.Default },
  cooler: {
    oilTankTemp: '233',
    inputTemp: '234',
    outputTemp: '235',
    mainDriveTemp: '236',
  },
  mainDrive: {
    oilPressure: { value: 2.5, state: IndicatorState.Warning },
    amperage: '234',
    engineAmperage: '212',
    rotorVoltage: '455',
    starterVoltage: '123',
  },
};

export const exhaustersSchemesMock: Record<string, ExhausterGeneralScheme> = {
  'Эксгаустер Ф-172': {
    exhausterName: 'Эксгаустер Ф-172',
    schemeData: schemeMock,
  },
  'Эксгаустер Ф-173': {
    exhausterName: 'Эксгаустер Ф-172',
    schemeData: schemeMock,
  },
  'Эксгаустер Ф-174': {
    exhausterName: 'Эксгаустер Ф-172',
    schemeData: schemeMock,
  },
  'Эксгаустер Ф-175': {
    exhausterName: 'Эксгаустер Ф-172',
    schemeData: schemeMock,
  },
  'Эксгаустер Ф-176': {
    exhausterName: 'Эксгаустер Ф-172',
    schemeData: schemeMock,
  },
  'Эксгаустер Ф-177': {
    exhausterName: 'Эксгаустер Ф-172',
    schemeData: schemeMock,
  },
};

const chartSensorsData: ChartDataType = {
  '1 ПС: T, °С': [
    ['2023-02-13T10:00:00.00', 232],
    ['2023-02-13T11:00:00.00', 123],
    ['2023-02-13T12:00:00.00', 334],
    ['2023-02-13T13:00:00.00', 41],
    ['2023-02-13T14:00:00.00', 123],
    ['2023-02-13T15:00:00.00', 433],
    ['2023-02-13T16:00:00.00', 111],
    ['2023-02-13T17:00:00.00', 233],
    ['2023-02-13T18:00:00.00', 531],
  ],
  '1 ПС: Верт, мм/с': [
    ['2023-02-13T10:00:00.00', 23],
    ['2023-02-13T11:00:00.00', 3],
    ['2023-02-13T12:00:00.00', 5],
    ['2023-02-13T13:00:00.00', 12],
    ['2023-02-13T14:00:00.00', 12],
    ['2023-02-13T15:00:00.00', 33],
    ['2023-02-13T16:00:00.00', 342],
    ['2023-02-13T17:00:00.00', 44],
    ['2023-02-13T18:00:00.00', 5],
  ],
  'Редуктор: T, °С': [
    ['2023-02-13T10:00:00.00', 324],
    ['2023-02-13T11:00:00.00', 123],
    ['2023-02-13T12:00:00.00', 556],
    ['2023-02-13T13:00:00.00', 245],
    ['2023-02-13T14:00:00.00', 132],
    ['2023-02-13T15:00:00.00', 653],
    ['2023-02-13T16:00:00.00', 342],
    ['2023-02-13T17:00:00.00', 233],
    ['2023-02-13T18:00:00.00', 122],
  ],
};

const chartSensors: ChartSensorType[] = [
  {
    sensorName: '1 ПС',
    indicators: [
      {
        name: 'T, °С',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Верт, мм/с',
        value: '0',
        state: IndicatorState.Critical,
        isVisible: true,
      },
      {
        name: 'Гориз, мм/с',
        value: '0',
        state: IndicatorState.Warning,
        isVisible: true,
      },
      {
        name: 'Ось, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
  {
    sensorName: '2 ПС',
    indicators: [
      {
        name: 'T, °С',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Верт, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Гориз, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Ось, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
  {
    sensorName: '3 ПС',
    indicators: [
      {
        name: 'T, °С',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
  {
    sensorName: '4 ПС',
    indicators: [
      {
        name: 'T, °С',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Верт, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Гориз, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Ось, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
  {
    sensorName: 'Редуктор',
    indicators: [
      {
        name: 'T, °С',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Верт, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Гориз, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Ось, мм/с',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
  {
    sensorName: 'Маслобак',
    indicators: [
      {
        name: 'Уровень масла, %',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Давление масла, кг/см2',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
  {
    sensorName: 'Газовый коллектор',
    indicators: [
      {
        name: 'T газа, °С',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Разряжение, мм.в.ст',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
  {
    sensorName: 'Главный привод',
    indicators: [
      {
        name: 'Ток, А',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'Ток двигателя, А',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
  {
    sensorName: 'Охладитель',
    indicators: [
      {
        name: 'T воды до, °С',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
      {
        name: 'T воды после, °С',
        value: '0',
        state: IndicatorState.Default,
        isVisible: true,
      },
    ],
  },
];

export const exhaustersChartsMock: Record<string, ExhausterChart> = {
  'Эксгаустер Ф-172': {
    exhausterName: 'Эксгаустер Ф-172',
    chartSensors,
    chartSensorsData,
  },
  'Эксгаустер Ф-173': {
    exhausterName: 'Эксгаустер Ф-172',
    chartSensors,
    chartSensorsData,
  },
  'Эксгаустер Ф-174': {
    exhausterName: 'Эксгаустер Ф-172',
    chartSensors,
    chartSensorsData,
  },
  'Эксгаустер Ф-175': {
    exhausterName: 'Эксгаустер Ф-172',
    chartSensors,
    chartSensorsData,
  },
  'Эксгаустер Ф-176': {
    exhausterName: 'Эксгаустер Ф-172',
    chartSensors,
    chartSensorsData,
  },
  'Эксгаустер Ф-177': {
    exhausterName: 'Эксгаустер Ф-172',
    chartSensors,
    chartSensorsData,
  },
};
