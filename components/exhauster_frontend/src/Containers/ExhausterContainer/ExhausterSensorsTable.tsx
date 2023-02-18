/* eslint-disable react/display-name */
/* eslint-disable func-names */
import React, { useMemo } from 'react';

import Table from '../../Components/Table';
import renderDefaultText from '../../Components/Table/components/DefaultText';
import { renderIndicators } from '../../Components/Table/components/Indicator';
import getTranslation from '../../Utils/getTranslation';

import {
  SENSORS_TABLE_COLUMNS,
  SENSORS_TABLE_SECTIONS_INDICATORS,
  SensorsTableSections,
} from './constants';
import { SensorType } from './ExhausterContainer.interface';
import ExhausterScheme from './ExhausterScheme';

import styles from './ExhausterContainer.module.css';

type ExhausterSensorsProps = {
  sensors: SensorType[];
};

function ExhausterSensors(props: ExhausterSensorsProps) {
  const { sensors } = props;

  const tableData = useMemo(() => {
    const columns = SENSORS_TABLE_COLUMNS.map((column) => ({
      key: column,
      name: '',
    }));

    const data = Object.keys(SensorsTableSections).map((section) => {
      const sectionResult = {
        section: { key: section, name: getTranslation(section) },
        rows: [],
      };

      if (SensorsTableSections[section] === SensorsTableSections.Problem) {
        const allowedIndicators =
          SENSORS_TABLE_SECTIONS_INDICATORS[SensorsTableSections.Problem];

        sensors.forEach((sensor) => {
          const { sensorName, indicators } = sensor;

          if (
            indicators.some((indicator) =>
              allowedIndicators.includes(indicator.state),
            )
          ) {
            sectionResult.rows.push({
              sensorName: renderDefaultText(sensorName),
              indicators: renderIndicators(sensorName, sensor.indicators),
            });
          }
        });
      } else if (
        SensorsTableSections[section] === SensorsTableSections.Default
      ) {
        const allowedIndicators =
          SENSORS_TABLE_SECTIONS_INDICATORS[SensorsTableSections.Default];

        sensors.forEach((sensor) => {
          const { sensorName, indicators } = sensor;

          if (
            indicators.every((indicator) =>
              allowedIndicators.includes(indicator.state),
            )
          ) {
            sectionResult.rows.push({
              sensorName: renderDefaultText(sensorName),
              indicators: renderIndicators(sensorName, sensor.indicators),
            });
          }
        });
      }

      return sectionResult;
    });

    return { columns, data };
  }, [sensors]);

  return (
    <div className={styles.exhauster_sensors}>
      <ExhausterScheme />
      <Table columns={tableData.columns} data={tableData.data} />
    </div>
  );
}

export default ExhausterSensors;
