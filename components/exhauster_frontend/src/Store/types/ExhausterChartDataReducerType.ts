import { IndicatorState } from '../../Containers/ExhausterContainer/ExhausterContainer.interface';

export type ChartIndicatorType = {
  name: string;
  value: string;
  state: IndicatorState;
  isVisible: boolean;
};

export type ChartSensorType = {
  sensorName: string;
  indicators: ChartIndicatorType[];
};

export type ExhausterChart = {
  exhausterName: string;
  chartSensors: ChartSensorType[];
  chartSensorsData: ChartDataType;
};

export type ExhausterChartDataReducerType = {
  exhaustersCharts: Record<string, ExhausterChart>;
};

export type ChartDataType = Record<string, [string, number][]>;
