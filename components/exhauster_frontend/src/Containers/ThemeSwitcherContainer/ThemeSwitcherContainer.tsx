import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ThemeSwitcher from '../../Components/ThemeSwitcher';
import {
  changeTheme,
  getColorPaletteType,
} from '../../Store/reducers/appThemeReducer';

function ThemeSwitcherContainer() {
  const dispatch = useDispatch();
  const colorPaletteType = useSelector(getColorPaletteType);

  const handleChangeTheme = () => dispatch(changeTheme());

  return (
    <ThemeSwitcher
      colorPalette={colorPaletteType}
      onChangeTheme={handleChangeTheme}
    />
  );
}

export default ThemeSwitcherContainer;
