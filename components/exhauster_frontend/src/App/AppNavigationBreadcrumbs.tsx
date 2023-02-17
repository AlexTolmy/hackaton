import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

function AppNavigationBreadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  return <>{breadcrumbs.map(({ breadcrumb }) => breadcrumb)}</>;
}

export default AppNavigationBreadcrumbs;
