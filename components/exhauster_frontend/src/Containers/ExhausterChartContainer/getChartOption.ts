import { ChartDataType } from '../../Store/types/ExhausterChartDataReducerType';

import getEmptyChartConfig from './getEmptyChartConfig';

function getChartOption(defaultFontColor: string, chartData: ChartDataType) {
  const config = getEmptyChartConfig(defaultFontColor);

  Object.keys(chartData).forEach((key) => {
    const data = chartData[key];

    const horizontalData = [];
    const lineValues = [];

    data?.forEach((dataItem) => {
      const [date, value] = dataItem;
      horizontalData.push(date);
      lineValues.push(value);
    });

    config.series.push({
      name: key,
      type: 'line',
      connectNulls: true,
      data: lineValues,
    });

    config.xAxis.data = horizontalData;
  });

  return config;
}

export default getChartOption;
