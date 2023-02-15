import getTranslation from '../Utils/getTranslation';

import { NavigationEndpoint } from './App.interface';

export const APP_NAVIGATION_ITEMS = [
  {
    key: NavigationEndpoint.Home,
    displayName: getTranslation('home'),
    href: NavigationEndpoint.Home,
  },
];

export default {};
