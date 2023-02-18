import { ColorPaletteType } from '../Components/ThemeSwitcher/ThemeSwitcher.interface';

const lightThemeColorPalette = {
  /* Default colors */
  '--color-gray-f': '#ffffff',
  '--color-gray-1': '#fbfbfb',
  '--color-gray-2': '#f5f5f5',
  '--color-gray-3': '#ebebeb',
  '--color-gray-4': '#e2e2e2',
  '--color-gray-5': '#dddddd',
  '--color-gray-6': '#bfbfbf',
  '--color-gray-7': '#8c8c8c',
  '--color-gray-8': '#7d7d7d',
  '--color-gray-9': '#434343',
  '--color-gray-10': '#262626',
  '--color-gray-11': '#1f1f1f',
  '--color-gray-12': '#141414',
  '--color-gray-13-corporate': '#d9dada',
  '--color-gray-0': '#000000',

  '--color-orange-1': '#fde3cf',
  '--color-orange-2': '#fbcba7',
  '--color-orange-3': '#f9b583',
  '--color-orange-4': '#f7a162',
  '--color-orange-5': '#f68f44',
  '--color-orange-6-corporate': '#ed7817',
  '--color-orange-7': '#e3660b',
  '--color-orange-8': '#bc5509',
  '--color-orange-9': '#9c4707',
  '--color-orange-10': '#813b06',
  '--color-orange-11': '#6b3105',
  '--color-orange-12': '#fcb53b',
  '--color-orange-12-transparent': '#fcb53b30',

  '--color-yellow-1': '#fff8ec',
  '--color-yellow-2': '#fef0d8',
  '--color-yellow-3': '#fee5ba',
  '--color-yellow-4': '#fdd796',
  '--color-yellow-5': '#fdca75',
  '--color-yellow-6': '#fcbf57',
  '--color-yellow-7-corporate': '#fab82e',
  '--color-yellow-8': '#fda610',
  '--color-yellow-9': '#d38603',
  '--color-yellow-10': '#af6f02',
  '--color-yellow-11': '#915c02',
  '--color-yellow-12': '#784c02',

  '--color-red-1': '#fdf0ef',
  '--color-red-2': '#f8b9b4',
  '--color-red-3': '#f48981',
  '--color-red-4': '#eb5757',
  '--color-red-5': '#eb3333',
  '--color-red-6-corporate': '#e32213',
  '--color-red-6-corporate-transparent': '#e3221330',
  '--color-red-7': '#bc1c10',
  '--color-red-8': '#9c170d',
  '--color-red-9': '#81130b',
  '--color-red-10': '#6b1009',
  '--color-red-11': '#590d07',

  '--color-blue-4': '#9eadc5',

  '--color-green-3': '#8ccaa6',

  /* Custom colors */
  '--color-gray-bg': '#f6f6f6',
  '--color-gray-menu': '#eeeeee',
  '--color-gray-secondary-text': '#7e7e7e',
  '--color-gray-tooltip': '#414141',
  '--color-gray-body': '#e5e5e5',

  '--color-blue-contrast': '#859bbf',

  '--color-brand-green': '#00c342',
  '--color-brand-green-transparent': '#00c34230',
  '--color-brand-orange': '#f57f29',
  '--color-brand-orange-light': '#fff8eb',

  '--color-shadow': ' rgba(0, 0, 0, 0.14)',

  '--color-gray-icon': '#808080',
  '--icon-default-color': '#25282b',

  '--notification-warning-bg-color': '#fff6e6',
  '--notification-error-bg-color': '#fef4f3',
  '--notification-success-bg-color': '#ecffea',
  '--panel-header-color': '#00000005',
  '--color-always-white': '#ffffff',
  '--color-always-black': '#000000',
};

const darkThemeColorPalette = {
  /* Default colors */
  '--color-gray-f': '#161b22',
  '--color-gray-1': '#111316',
  '--color-gray-2': '#21262c',
  '--color-gray-3': '#30363d',
  '--color-gray-4': '#20242c',
  '--color-gray-5': '#30363d',
  '--color-gray-6': '#4b4b4b',
  '--color-gray-7': '#8c8c8c',
  '--color-gray-8': '#8b949e',
  '--color-gray-9': '#c9d1d9',
  '--color-gray-10': '#262626',
  '--color-gray-11': '#1f1f1f',
  '--color-gray-12': '#141414',
  '--color-gray-13-corporate': '#d9dada',
  '--color-gray-0': '#f0f6fc',

  '--color-orange-1': '#fde3cf',
  '--color-orange-2': '#fbcba7',
  '--color-orange-3': '#f9b583',
  '--color-orange-4': '#f7a162',
  '--color-orange-5': '#f68f44',
  '--color-orange-6-corporate': '#ed7817',
  '--color-orange-7': '#e3660b',
  '--color-orange-8': '#bc5509',
  '--color-orange-9': '#9c4707',
  '--color-orange-10': '#813b06',
  '--color-orange-11': '#6b3105',
  '--color-orange-12': '#af8a36',
  '--color-orange-12-transparent': '#fcb53b30',

  '--color-yellow-1': '#fff8ec',
  '--color-yellow-2': '#966600',
  '--color-yellow-3': '#fee5ba',
  '--color-yellow-4': '#fdd796',
  '--color-yellow-5': '#fdca75',
  '--color-yellow-6': '#fcbf57',
  '--color-yellow-7-corporate': '#fab82e',
  '--color-yellow-8': '#a68230',
  '--color-yellow-9': '#d38603',
  '--color-yellow-10': '#af6f02',
  '--color-yellow-11': '#915c02',
  '--color-yellow-12': '#784c02',

  '--color-red-1': '#fdf0ef',
  '--color-red-2': '#f8b9b4',
  '--color-red-3': '#f48981',
  '--color-red-4': '#eb5757',
  '--color-red-5': '#eb3333',
  '--color-red-6-corporate': '#e32213',
  '--color-red-6-corporate-transparent': '#e3221330',
  '--color-red-7': '#bc1c10',
  '--color-red-8': '#9c170d',
  '--color-red-9': '#81130b',
  '--color-red-10': '#6b1009',
  '--color-red-11': '#590d07',

  '--color-blue-4': '#316dca',

  '--color-green-3': '#8ccaa6',

  /* Custom colors */
  '--color-gray-bg': '#f6f6f6',
  '--color-gray-menu': '#111316',
  '--color-gray-secondary-text': '#7e7e7e',
  '--color-gray-tooltip': '#010409',
  '--color-gray-body': '#010409',

  '--color-blue-contrast': '#193b6f',

  '--color-brand-green': '#00c342',
  '--color-brand-green-transparent': '#00c34230',
  '--color-brand-orange': '#f57f29',
  '--color-brand-orange-light': '#fff8eb',

  '--color-shadow': ' rgba(0, 0, 0, 0.14)',

  '--color-gray-icon': '#c9d1d9',
  '--icon-default-color': '#c9d1d9',

  '--notification-warning-bg-color': '#a68230',
  '--notification-error-bg-color': '#5d1012',
  '--notification-success-bg-color': '#1b4721',
  '--panel-header-color': '#30363d',
  '--color-always-white': '#ffffff',
  '--color-always-black': '#000000',
};

export default {
  [ColorPaletteType.Light]: lightThemeColorPalette,
  [ColorPaletteType.Dark]: darkThemeColorPalette,
};
