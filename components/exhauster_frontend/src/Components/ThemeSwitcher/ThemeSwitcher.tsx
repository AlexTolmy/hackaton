/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import clsx from 'clsx';

import {
  ColorPaletteType,
  ThemeSwitcherProps,
} from './ThemeSwitcher.interface';

import styles from './ThemeSwitcher.module.css';

/**
 * Используется для отображение переключателя светлой и темной темы
 *
 * ВАЖНО!!! Данный компонент НЕ содержит логику переключения,
 * он только отображает тип текущей темы и регирует на нажатие смены палитры
 * В качестве логики для отображения темы можно использовать
 * ThemeService (который лежит в этой же директории) или другой сервис
 *
 * ## Атрибуты
 *
 * `colorPalette` — Текущий тип/вид темы, светлая или темная
 *
 * `onChangeTheme` — Метод, обработчик, который содержит логику изменения темы,
 *  будет вызван при нажатии на переключатель
 *
 * ## Локальные свойства
 *
 * --toggle-light-background-color — Цвет фона переключателя в белой теме
 * --toggle-dark-background-color:  — Цвет фона переключателя в темной теме
 */

function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { colorPalette, onChangeTheme, className } = props;

  const isDarkTheme = colorPalette === ColorPaletteType.Dark;

  const handleChangeTheme = () => {
    onChangeTheme();
  };

  return (
    <div className={clsx(styles.theme_switcher, className)}>
      <input
        type="checkbox"
        className={styles.theme_switcher_toggle}
        name="toggleSwitch"
        id="toggleSwitch"
        checked={isDarkTheme}
        onChange={handleChangeTheme}
      />
      <label className={styles.theme_switcher_label} htmlFor="toggleSwitch">
        <span className={styles.theme_switcher_first} />
        <span className={styles.theme_switcher_second} />
      </label>
    </div>
  );
}

export default ThemeSwitcher;
