import { IndicatorState } from '../../Containers/ExhausterContainer/ExhausterContainer.interface';

export type ExhausterGeneralSchemeSensors = {
  psSensors: PSSensorType[];
  oreInput: {
    gasTemp: ValueStateType;
    discharge: string;
    dustLevel: string;
  };
  smokePipeState: number;
  oilTank: ValueStateType;
  cooler: {
    oilTankTemp: string;
    inputTemp: string;
    outputTemp: string;
    mainDriveTemp: string;
  };
  mainDrive: {
    oilPressure: ValueStateType;
    amperage: string;
    engineAmperage: string;
    rotorVoltage: string;
    starterVoltage: string;
  };
};

export type ExhausterGeneralScheme = {
  exhausterName: string;
  schemeData: ExhausterGeneralSchemeSensors;
};

export type ExhausterMnemoSchemeReducerType = {
  exhaustersSchemes: Record<string, ExhausterGeneralScheme>;
};

export type ValueStateType = {
  value: string | number;
  state: IndicatorState;
};

export type PSSensorType = {
  T?: ValueStateType;
  B?: ValueStateType;
  G?: ValueStateType;
  O?: ValueStateType;
  commonState: IndicatorState;
};
