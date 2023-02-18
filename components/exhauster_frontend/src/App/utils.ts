import { NavigationEndpoint } from './App.interface';

export function getRoute(
  path: NavigationEndpoint,
  param: string,
  value: string,
) {
  return path.replace(param, value);
}

export default {};
