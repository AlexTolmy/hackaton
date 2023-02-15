import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import RootStoreType from '../types/RootStoreType';
import UserDataReducerType, {
  UserNameType,
  UserRole,
} from '../types/UserDataReducerType';

const initialState: UserDataReducerType = {
  userName: {
    firstName: 'Unknown',
    secondName: 'User',
  },
  userRole:
    process.env.NODE_ENV === 'development' ? UserRole.Admin : UserRole.User,
};

const slice = createSlice({
  name: 'userDataReducer',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<UserNameType>) => {
      state.userName = action.payload;
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
  },
});

// Selectors
export const getUserName = (store: RootStoreType): UserNameType =>
  store.userData.userName;
export const getUserSymbols = (store: RootStoreType): string =>
  `${store.userData.userName.firstName[0]}${store.userData.userName.secondName[0]}`;
export const getUserFullName = (store: RootStoreType): string =>
  `${store.userData.userName.firstName} ${store.userData.userName.secondName}`;
export const getUserRole = (store: RootStoreType): UserRole =>
  store.userData.userRole;
export const getIsUserAdmin = (store: RootStoreType): boolean =>
  store.userData.userRole === UserRole.Admin;

// Actions
export const { setUserName, setUserRole } = slice.actions;

export default slice.reducer;
