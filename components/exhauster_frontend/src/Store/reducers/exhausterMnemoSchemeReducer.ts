import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { exhaustersSchemesMock } from '../../Mock/mock';
import {
  ExhausterGeneralScheme,
  ExhausterMnemoSchemeReducerType,
} from '../types/ExhausterMnemoSchemeReducerType';
import RootStoreType from '../types/RootStoreType';

const initialState: ExhausterMnemoSchemeReducerType = {
  exhaustersSchemes: exhaustersSchemesMock,
};

const slice = createSlice({
  name: 'exhausterMnemoSchemeReducer',
  initialState,
  reducers: {
    setExhaustersSchemes: (
      state,
      action: PayloadAction<Record<string, ExhausterGeneralScheme>>,
    ) => {
      state.exhaustersSchemes = action.payload;
    },
  },
});

// Selectors
export const getExhausterSchemeData =
  (name: string) =>
  (store: RootStoreType): ExhausterGeneralScheme =>
    store.exhausterMnemoScheme.exhaustersSchemes[name];

// Actions
export const { setExhaustersSchemes } = slice.actions;

export default slice.reducer;
