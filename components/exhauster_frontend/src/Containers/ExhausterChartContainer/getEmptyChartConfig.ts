enum FilterMode {
  None = 'none',
}

// Prepare basic chart config
function getEmptyChartConfig(fontColor: string) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
      },
    },
    animation: false,
    legend: { textStyle: { color: fontColor } },
    xAxis: {
      type: 'category',
      data: null,
      boundaryGap: true,
      axisLabel: { showMinLabel: true, showMaxLabel: true },
    },
    yAxis: {
      type: 'value',
      scale: true,
      min: null,
      max: null,
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0],
        filterMode: FilterMode.None,
      },
      {
        type: 'inside',
        yAxisIndex: [0],
        filterMode: FilterMode.None,
      },
      {
        type: 'slider',
        xAxisIndex: [0],
        filterMode: FilterMode.None,
      },
      {
        type: 'slider',
        yAxisIndex: [0],
        filterMode: FilterMode.None,
      },
    ],
    series: [],
    textStyle: { color: fontColor },
  };
}

export default getEmptyChartConfig;
