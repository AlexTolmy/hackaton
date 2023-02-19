import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SensorType } from '../../Containers/ExhausterContainer/ExhausterContainer.interface';
import {
  ExhaustersMonitorReducerType,
  ExhausterType,
} from '../types/ExhaustersMonitorReducerType';
import RootStoreType from '../types/RootStoreType';
import { defaultDate } from '../utils/datesPeriodSelectorCache';

const initialState: ExhaustersMonitorReducerType = {
  exhausters: {},
  lastUpdateDate: defaultDate,
  sensorsDataUpdateDate: null,
  hoveredSensors: {},
};

const slice = createSlice({
  name: 'exhaustersMonitorReducer',
  initialState,
  reducers: {
    setExhaustersAction: (
      state,
      action: PayloadAction<Record<string, ExhausterType>>,
    ) => {
      state.exhausters = action.payload;
    },
    setLastUpdateDateAction: (state, action: PayloadAction<Date>) => {
      state.lastUpdateDate = action.payload;
    },
    setSensorsDataUpdateDate: (state, action: PayloadAction<Date>) => {
      state.sensorsDataUpdateDate = action.payload;
    },
    setSensorHoverState: (
      state,
      action: PayloadAction<{
        exhausterName: string;
        sensorName: string;
        isHovered: boolean;
      }>,
    ) => {
      const { exhausterName, sensorName, isHovered } = action.payload;
      if (!state.hoveredSensors[exhausterName]) {
        state.hoveredSensors[exhausterName] = {};
      }
      state.hoveredSensors[exhausterName][sensorName] = isHovered;
    },
  },
});

// Selectors
export const getExhaustersSelector = (store: RootStoreType) =>
  store.exhaustersMonitor.exhausters;

export const getAngloMachinesNamesSelector = (
  store: RootStoreType,
): string[] => [
  ...new Set(
    Object.values(store.exhaustersMonitor.exhausters).map(
      (item) => item.angloMachineName,
    ),
  ),
];

export const getAngloMachineExhaustersNamesSelector =
  (machineName: string) =>
  (store: RootStoreType): string[] =>
    Object.values(store.exhaustersMonitor.exhausters)
      .filter((item) => item.angloMachineName === machineName)
      .map((item) => item.exhausterName);

export const getExhausterData =
  (name: string) =>
  (store: RootStoreType): ExhausterType =>
    store.exhaustersMonitor.exhausters[name];

export const getExhausterSensorsData =
  (name: string) =>
  (store: RootStoreType): SensorType[] =>
    store.exhaustersMonitor.exhausters[name].sensors;

export const getLastUpdateDate = (store: RootStoreType) =>
  store.exhaustersMonitor.lastUpdateDate;

export const getSensorsDataUpdateDate = (store: RootStoreType) =>
  store.exhaustersMonitor.sensorsDataUpdateDate;

export const getExhausterHoveredSensors =
  (name: string) =>
  (store: RootStoreType): Record<string, boolean> =>
    store.exhaustersMonitor.hoveredSensors[name] || {};

// Actions
export const {
  setExhaustersAction,
  setLastUpdateDateAction,
  setSensorsDataUpdateDate,
  setSensorHoverState,
} = slice.actions;

export default slice.reducer;
