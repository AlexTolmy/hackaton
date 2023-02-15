export enum ColorPaletteType {
  Light = 'light',
  Dark = 'dark',
}

export type ThemeSwitcherProps = {
  colorPalette: ColorPaletteType;
  onChangeTheme: () => void;
  className?: string;
};

export default {};
