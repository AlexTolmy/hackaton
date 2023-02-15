export enum NavigationEndpoint {
  Home = '/',
  Any = '*',
}

export type NavigationItemType = {
  key: string;
  displayName: string;
  href: string;
};

export type StylesType = Record<string, string>;

export type NavLinkClassType = { isActive: boolean };
