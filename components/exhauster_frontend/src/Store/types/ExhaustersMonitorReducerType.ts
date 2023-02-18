import { SensorType } from '../../Containers/ExhausterContainer/ExhausterContainer.interface';

export type ExhausterType = {
  angloMachineName: string;
  exhausterName: string;
  isActive: boolean;
  rotorName: string;
  rotorLastChangeDate: Date;
  rotorNextChangeDate: Date;
  sensors: SensorType[];
};

export type ExhaustersMonitorReducerType = {
  exhausters: Record<string, ExhausterType>;
  lastUpdateDate: Date;
};
