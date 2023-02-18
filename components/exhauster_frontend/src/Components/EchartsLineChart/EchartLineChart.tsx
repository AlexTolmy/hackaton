import React from 'react';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import PropTypes from 'prop-types';

import 'echarts/lib/component/markArea';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/visualMap';

import { EchartLineChartProps } from './EchartLineChart.interface';

import styles from './EchartLineChart.module.css';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  LegendComponent,
  BarChart,
]);

function EchartLineChart(props: EchartLineChartProps) {
  const { option, isLoading } = props;

  return (
    <div className={styles.chart_container}>
      <ReactEChartsCore
        echarts={echarts}
        showLoading={isLoading}
        notMerge
        lazyUpdate
        option={option}
        opts={{ height: 800 }}
      />
    </div>
  );
}

EchartLineChart.propTypes = {
  option: PropTypes.instanceOf(Object),
};

EchartLineChart.defaultProps = {
  option: [],
};

export default EchartLineChart;
