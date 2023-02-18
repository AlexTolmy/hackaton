import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import EchartLineChart from '../../Components/EchartsLineChart';
import { getDefaultFontColor } from '../../Store/reducers/appThemeReducer';
import { getExhausterVisibleChartDataSelector } from '../../Store/reducers/exhausterChartDataReducer';

import getChartOption from './getChartOption';

function ExhausterChart() {
  const { exhausterName } = useParams();
  const exhausterChart = useSelector(
    getExhausterVisibleChartDataSelector(exhausterName),
  );
  const defaultFontColor = useSelector(getDefaultFontColor);

  const chartOption = useMemo(
    () => getChartOption(defaultFontColor, exhausterChart.chartSensorsData),
    [defaultFontColor, exhausterChart.chartSensorsData],
  );

  return (
    <div>
      <EchartLineChart option={chartOption} />
    </div>
  );
}

export default ExhausterChart;
