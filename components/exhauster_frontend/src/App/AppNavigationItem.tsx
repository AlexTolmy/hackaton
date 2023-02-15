/* eslint-disable @typescript-eslint/naming-convention */
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import {
  NavigationItemType,
  NavLinkClassType,
  StylesType,
} from './App.interface';

function AppNavigationItem(
  navigationItem: NavigationItemType,
  rootStyles: StylesType,
) {
  const { href, displayName } = navigationItem;
  const { item_link, item_active } = rootStyles;

  const navLinkClass = useCallback(
    ({ isActive }: NavLinkClassType) =>
      clsx(item_link, isActive && item_active),
    [item_active, item_link],
  );

  return (
    <NavLink to={href} className={navLinkClass}>
      {displayName}
    </NavLink>
  );
}

export default AppNavigationItem;
