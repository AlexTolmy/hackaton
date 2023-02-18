import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ExhausterChart,
  ExhausterChartDataReducerType,
} from '../types/ExhausterChartDataReducerType';
import RootStoreType from '../types/RootStoreType';

import { exhaustersChartsMock } from '../../Mock/mock';

const initialState: ExhausterChartDataReducerType = {
  exhaustersCharts: exhaustersChartsMock,
};

const slice = createSlice({
  name: 'exhausterChartDataReducer',
  initialState,
  reducers: {
    setExhaustersChartsAction: (
      state,
      action: PayloadAction<Record<string, ExhausterChart>>,
    ) => {
      state.exhaustersCharts = action.payload;
    },
    setIsExhaustersChartIndicatorVisibleAction: (
      state,
      action: PayloadAction<{
        exhausterName: string;
        sensorName: string;
        indicatorName;
      }>,
    ) => {
      const { exhausterName, sensorName, indicatorName } = action.payload;

      const exhauster = state.exhaustersCharts[exhausterName];
      const sensorIndex = exhauster.chartSensors.findIndex(
        (item) => item.sensorName === sensorName,
      );

      if (sensorIndex < 0) {
        return;
      }

      const indicatorIndex = exhauster.chartSensors[
        sensorIndex
      ].indicators.findIndex((indicator) => indicator.name === indicatorName);

      if (indicatorIndex < 0) {
        return;
      }

      exhauster.chartSensors[sensorIndex].indicators[indicatorIndex].isVisible =
        !exhauster.chartSensors[sensorIndex].indicators[indicatorIndex]
          .isVisible;
    },
  },
});

// Selectors
export const getExhausterChartSelector =
  (name: string) =>
  (store: RootStoreType): ExhausterChart =>
    store.exhausterChart.exhaustersCharts[name];

export const getExhausterVisibleChartDataSelector = (name: string) =>
  createSelector(
    getExhausterChartSelector(name),
    (exhauster): ExhausterChart => {
      const filteredChartData = {
        exhausterName: name,
        chartSensors: [],
        chartSensorsData: {},
      };

      exhauster.chartSensors.forEach((item) => {
        const filteredSensor = {
          sensorName: item.sensorName,
          indicators: [],
        };

        item.indicators.forEach((indicator) => {
          if (indicator.isVisible) {
            filteredSensor.indicators.push(indicator);
            const indicatorsDataName = `${filteredSensor.sensorName}: ${indicator.name}`;
            if (exhauster.chartSensorsData[indicatorsDataName]) {
              filteredChartData.chartSensorsData[indicatorsDataName] =
                exhauster.chartSensorsData[indicatorsDataName];
            }
          }
        });

        if (filteredSensor.indicators.length > 0) {
          filteredChartData.chartSensors.push(filteredSensor);
        }
      });

      return filteredChartData;
    },
  );

// Actions
export const {
  setExhaustersChartsAction,
  setIsExhaustersChartIndicatorVisibleAction,
} = slice.actions;

export default slice.reducer;
