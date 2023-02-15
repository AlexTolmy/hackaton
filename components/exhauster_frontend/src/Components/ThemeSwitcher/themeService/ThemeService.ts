/* eslint-disable no-underscore-dangle */
import { ColorPaletteType } from '../ThemeSwitcher.interface';

import defaultThemeColorPalettes from './constants';

const KEY = 'COLOR_PALETTE_KEY';

/**
 * Данный сервис позволяет инициализировать цветовую тему по умолчанию,
 * а также переключать ее через специальный метод
 * Для сохранения текущей цветовой палитры использован localStorage
 *
 * ##Публичные параметры
 * currentColorPalette - тип текущей цветовой палитры
 *
 * #Публичные методы
 * initializeTheme - метод для инициализации цветовой палитры темы,
 * по умолчанию Light
 * ВАЖНО!!! Данный метод необходимо вызвать в любом месте приложения, единожды,
 * чтобы прописать цветовую палитру в css properties
 * на вход принимает record, в котором содержатся цветовые палитры
 * для белой и темной темы
 * входное значение не обязательно, если не передано,
 * будут использованы палитры по умолчанию,
 *  которые находятся в файле constants.js
 *
 * getColorByPropertyName - позволяет js прочитать значение
 * любого цвета по его имени в любом месте приложения
 *
 * changeTheme - при вызове метода происходит смена цветовой палитры
 * темы на противоположную
 */

class ThemeService {
  private _colorPaletteType: ColorPaletteType;

  private _colorPalettes: Record<ColorPaletteType, Record<string, string>>;

  private _activeColorPalette: Record<string, string>;

  constructor() {
    const storageType = localStorage.getItem(KEY) as ColorPaletteType;
    this._colorPaletteType = storageType || ColorPaletteType.Light;
    this._colorPalettes = defaultThemeColorPalettes;
    this._activeColorPalette = this._colorPalettes[this._colorPaletteType];
  }

  public get currentColorPalette() {
    return this._colorPaletteType;
  }

  public initializeTheme(
    themeColorPalettes?: Record<ColorPaletteType, Record<string, string>>,
  ) {
    if (themeColorPalettes) {
      this._colorPalettes = themeColorPalettes;
    }

    this.changeColorPalette();
  }

  public getColorByPropertyName(propertyName: string) {
    return this._activeColorPalette?.[propertyName];
  }

  public changeTheme() {
    if (this._colorPaletteType === ColorPaletteType.Dark) {
      this._colorPaletteType = ColorPaletteType.Light;
    } else {
      this._colorPaletteType = ColorPaletteType.Dark;
    }

    localStorage.setItem(KEY, this._colorPaletteType);

    this.changeColorPalette();
  }

  private changeColorPalette() {
    this._activeColorPalette = this._colorPalettes[this._colorPaletteType];

    Object.keys(this._activeColorPalette).forEach((key) => {
      document.documentElement.style.setProperty(
        key,
        this._activeColorPalette[key],
      );
    });
  }
}

const themeServiceInstance = new ThemeService();
export default themeServiceInstance;
