import { NavigationEndpoint } from './App.interface';
import AppCustomBreadcrumb from './AppCustomBreadcrumb';

export const breadcrumbsRoutes = [
  {
    path: NavigationEndpoint.Home,
    breadcrumb: AppCustomBreadcrumb,
    props: { displayName: 'Главный экран' },
  },
  {
    path: NavigationEndpoint.ExhausterScheme,
    breadcrumb: AppCustomBreadcrumb,
    props: { displayName: '/Состояние экгаустера' },
  },
];

export default {};
