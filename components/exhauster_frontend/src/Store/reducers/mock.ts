import {
  IndicatorState,
  IndicatorVariant,
  SensorType,
} from '../../Containers/ExhausterContainer/ExhausterContainer.interface';
import { ExhausterGeneralScheme } from '../types/ExhausterMnemoSchemeReducerType';

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
