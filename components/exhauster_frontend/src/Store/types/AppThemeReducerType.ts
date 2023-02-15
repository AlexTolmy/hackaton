import { ColorPaletteType } from '../../Components/ThemeSwitcher/ThemeSwitcher.interface';

export enum ThemeColorPaletteKey {
  DefaultFontColor = '--color-gray-0',
}

export type AppThemeReducerType = {
  colorPaletteType: ColorPaletteType;
  defaultFontColor: string;
};

export default {};
