import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import themeServiceInstance from '../../Components/ThemeSwitcher/themeService';
import { ColorPaletteType } from '../../Components/ThemeSwitcher/ThemeSwitcher.interface';
import themeColorPalettes from '../../Static/themeColorPalettes';
import {
  AppThemeReducerType,
  ThemeColorPaletteKey,
} from '../types/AppThemeReducerType';
import RootStoreType from '../types/RootStoreType';

themeServiceInstance.initializeTheme(themeColorPalettes);

const getThemeDefaultFontColor = () =>
  themeServiceInstance.getColorByPropertyName(
    ThemeColorPaletteKey.DefaultFontColor,
  );

const initialState: AppThemeReducerType = {
  colorPaletteType: themeServiceInstance.currentColorPalette,
  defaultFontColor: getThemeDefaultFontColor(),
};

const slice = createSlice({
  name: 'appThemeReducer',
  initialState,
  reducers: {
    setColorPaletteType: (state, action: PayloadAction<ColorPaletteType>) => {
      state.colorPaletteType = action.payload;
    },
    setDefaultFontColor: (state, action: PayloadAction<string>) => {
      state.defaultFontColor = action.payload;
    },
    changeTheme: (state) => {
      themeServiceInstance.changeTheme();
      state.colorPaletteType = themeServiceInstance.currentColorPalette;
      state.defaultFontColor = getThemeDefaultFontColor();
    },
  },
});

// Selectors
export const getColorPaletteType = (store: RootStoreType) =>
  store.appTheme.colorPaletteType || themeServiceInstance.currentColorPalette;
export const getDefaultFontColor = (store: RootStoreType) =>
  store.appTheme.defaultFontColor || getThemeDefaultFontColor();

// Actions
export const { setColorPaletteType, setDefaultFontColor, changeTheme } =
  slice.actions;

export default slice.reducer;
