import React from 'react';
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import { breadcrumbsRoutes } from './constants';

function AppNavigationBreadcrumbs() {
  const breadcrumbs = useBreadcrumbs(breadcrumbsRoutes);

  return (
    <>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <NavLink key={match.pathname} to={match.pathname}>
          {breadcrumb}
        </NavLink>
      ))}
    </>
  );
}

export default AppNavigationBreadcrumbs;
