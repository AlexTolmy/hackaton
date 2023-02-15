import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqueSlug from 'unique-slug';

import NotificationReducerType from '../types/NotificationReducerType';
import RootStoreType from '../types/RootStoreType';

const initialState: NotificationReducerType = { notifications: [] };

const notificationPanelSlice = createSlice({
  name: 'notificationPanelReducer',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        ...action.payload,
        notificationId: uniqueSlug(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (x) => x.notificationId !== action.payload,
      );
    },
  },
});

// Selectors
export const getNotifications = (store: RootStoreType) =>
  store.notificationPanel.notifications;

// Actions
export const { addNotification, removeNotification } =
  notificationPanelSlice.actions;

export default notificationPanelSlice.reducer;
