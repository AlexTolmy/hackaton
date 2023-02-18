import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ExhaustersMonitorReducerType,
  ExhausterType,
} from '../types/ExhaustersMonitorReducerType';
import RootStoreType from '../types/RootStoreType';

import { exhaustersMock } from './mock';

const initialState: ExhaustersMonitorReducerType = {
  exhausters: exhaustersMock,
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

// Actions
export const { setExhaustersAction: setExhausters } = slice.actions;

export default slice.reducer;
