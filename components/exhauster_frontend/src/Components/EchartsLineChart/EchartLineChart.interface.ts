export type MarkAreaType = {
  silent: boolean;
  itemStyle: {
    color: string;
  };
  data: { name?: string; yAxis: number }[][];
};

export type MarkLineType = {
  symbol?: string;
  silent?: boolean;
  data: {
    symbol?: string;
    name?: string;
    yAxis?: number;
    xAxis?: string | number;
    label?: { show: boolean; position?: string; formatter?: string };
    lineStyle?: {
      color: string;
      width: number;
    };
  }[];
};

type LabelType = {
  show?: boolean;
  fontWeight?: string | number;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  color?: string;
  fontSize?: number;
};

export type MarkPointDataType = {
  value: number;
  xAxis: number | string;
  yAxis: number;
};

export type MarkPointType = {
  data: MarkPointDataType[];
  symbolSize: number;
  symbolOffset: number[];
  label: LabelType;
};

export type ChartLineType = {
  type: string;
  data: number[];
  itemStyle?: { color: string; colorOutOfRange?: string };
  name?: string;
  showSymbol?: boolean;
  symbolSize?: number;
  showAllSymbol?: boolean;
  markArea?: MarkAreaType;
  markLine?: MarkLineType;
  lineStyle?: {
    opacity?: number;
    type?: string;
    color?: string;
    width?: number;
  };
  stack?: string;
  symbol?: string;
  connectNulls?: boolean;
  tooltip?: { show: boolean };
  endLabel?: LabelType;
  label?: LabelType;
  isRecommendation?: boolean;
  zlevel?: number;
  markPoint?: MarkPointType;
};

export enum FilterMode {
  None = 'none',
}

export type DataZoomType = {
  type: string;
  xAxisIndex?: number[];
  yAxisIndex?: number[];
  filterMode?: FilterMode;
};

export type VisualMapPieceType = {
  min: number;
  max: number;
  color: string;
};

export type VisualMapType = {
  seriesIndex?: number;
  show: boolean;
  dimension: number;
  pieces: VisualMapPieceType[];
};

export type ChartConfigType = {
  tooltip: {
    trigger: string;
    axisPointer: {
      animation: boolean;
    };
  };
  legend: object;
  xAxis: {
    type: string;
    data: string[];
    boundaryGap: boolean;
    axisLabel: { showMinLabel: boolean; showMaxLabel: boolean };
  };
  yAxis: {
    type: string;
    scale: boolean;
    min: number;
    max: number;
  };
  dataZoom: DataZoomType[];
  series: ChartLineType[];
  visualMap?: VisualMapType[];
};

export type DataStorageType = {
  xAxisData: string[];
  yAxisValues: number[];
  indicatorsXYAxisData: Record<string, Record<string, number>>;
};

export type CreateVisualMapType = {
  value: number;
  minValue: number;
  maxValue: number;
  defaultColor: string;
  errorColor: string;
};

export type EchartLineChartProps = {
  option: ChartConfigType;
  isLoading?: boolean;
};
