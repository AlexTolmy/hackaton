import { useEffect, useReducer } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StateType = {
  isAllExpanded: boolean;
  expandStatuses: Record<string, boolean>;
};

const initialState: StateType = {
  isAllExpanded: false,
  expandStatuses: {},
};

const { reducer, actions } = createSlice({
  name: 'expandStateReducer',
  initialState,
  reducers: {
    toggleAllAction: (state, action?: PayloadAction<boolean>) => {
      const newStatus =
        action?.payload === undefined ? !state.isAllExpanded : action.payload;

      Object.keys(state.expandStatuses).forEach((key) => {
        state.expandStatuses[key] = newStatus;
      });

      state.isAllExpanded = newStatus;
    },
    toggleChildAction: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const isChildExpanded = state.expandStatuses[key];

      state.expandStatuses[key] =
        isChildExpanded === undefined ? state.isAllExpanded : !isChildExpanded;

      state.isAllExpanded = !isChildExpanded;
    },
  },
});

const { toggleAllAction, toggleChildAction } = actions;

function useExpandCollapseFeature(key: string, isDefaultExpanded?: boolean) {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem(key)) || {
      ...initialState,
      isAllExpanded: isDefaultExpanded,
    },
  );

  const toggleAllExpandStates = () => {
    dispatch(toggleAllAction());
  };

  const toggleChildExpandState = (itemKey: string) => {
    dispatch(toggleChildAction(itemKey));
  };

  const { isAllExpanded, expandStatuses } = state;

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return {
    isAllExpanded,
    expandStatuses,
    toggleAllExpandStates,
    toggleChildExpandState,
  };
}

export default useExpandCollapseFeature;
