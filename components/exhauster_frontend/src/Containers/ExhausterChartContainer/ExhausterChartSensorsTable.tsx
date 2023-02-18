import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Table from '../../Components/Table';
import renderCheckboxText from '../../Components/Table/components/CheckboxText';
import { renderChartIndicator } from '../../Components/Table/components/Indicator';
import {
  getExhausterChartSelector,
  setIsExhaustersChartIndicatorVisibleAction,
} from '../../Store/reducers/exhausterChartDataReducer';
import getTranslation from '../../Utils/getTranslation';

import { CHART_TABLE_COLUMNS } from './constants';

import styles from './ExhausterChartContainer.module.css';

function ExhausterChartSensorsTable() {
  const dispatch = useDispatch();
  const { exhausterName } = useParams();
  const exhausterChart = useSelector(getExhausterChartSelector(exhausterName));

  const toggleVisibility = useCallback(
    (sensorName: string, indicatorName: string) => () =>
      dispatch(
        setIsExhaustersChartIndicatorVisibleAction({
          exhausterName,
          sensorName,
          indicatorName,
        }),
      ),
    [dispatch, exhausterName],
  );

  const tableData = useMemo(() => {
    const columns = CHART_TABLE_COLUMNS.map((column) => ({
      key: column,
      name: getTranslation(column),
    }));

    const data = exhausterChart.chartSensors.map((sensor) => {
      const sectionResult = {
        section: { key: sensor.sensorName, name: sensor.sensorName },
        rows: [],
      };

      sensor.indicators.forEach((indicator) => {
        sectionResult.rows.push({
          sensorName: renderCheckboxText(
            indicator.name,
            indicator.isVisible,
            toggleVisibility(sensor.sensorName, indicator.name),
          ),
          sensorValue: renderChartIndicator(indicator),
        });
      });

      return sectionResult;
    });

    return { columns, data };
  }, [exhausterChart.chartSensors, toggleVisibility]);

  return (
    <div className={styles.table_container}>
      <Table
        className={styles.table}
        columns={tableData.columns}
        data={tableData.data}
      />
    </div>
  );
}

export default ExhausterChartSensorsTable;
