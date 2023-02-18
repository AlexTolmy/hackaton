export enum NavigationParams {
  ExhausterName = ':exhausterName',
}

export enum NavigationEndpoint {
  Home = '/',
  ExhausterScheme = '/:exhausterName',
  Any = '*',
}

export type NavigationItemType = {
  key: string;
  displayName: string;
  href: string;
};

export type StylesType = Record<string, string>;

export type NavLinkClassType = { isActive: boolean };
