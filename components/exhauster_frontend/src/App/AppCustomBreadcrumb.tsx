import React from 'react';
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';

import styles from './App.module.css';

function AppCustomBreadcrumb(props: BreadcrumbComponentProps) {
  const { displayName, match } = props;
  const path = decodeURI(`${match.pathname}${displayName}`);

  return <div className={styles.breadcrumb_item}>{path}</div>;
}

export default AppCustomBreadcrumb;
