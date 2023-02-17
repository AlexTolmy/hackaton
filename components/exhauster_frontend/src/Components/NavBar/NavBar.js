import React from 'react';
import PropTypes from 'prop-types';

import styles from './NavBar.module.css';

function renderDefaultNavigationItem(navigationItem, rootStyles) {
  return (
    <a href={navigationItem.href} className={rootStyles.item_link}>
      {navigationItem.displayName}
    </a>
  );
}

function NavBar({
  className,
  navigationItems = [],
  renderNavigationItem = renderDefaultNavigationItem,
}) {
  return (
    <nav className={`nav_bar ${className || ''}`.trim()}>
      <ul className={styles.navigation}>
        {navigationItems.map((navigationItem) => (
          <li key={navigationItem.key} className={styles.item}>
            {renderNavigationItem(navigationItem, styles)}
          </li>
        ))}
      </ul>
    </nav>
  );
}

NavBar.propTypes = {
  className: PropTypes.string,
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      displayName: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
  renderNavigationItem: PropTypes.func,
};

NavBar.defaultProps = {
  className: undefined,
  navigationItems: [],
  renderNavigationItem: renderDefaultNavigationItem,
};

export default NavBar;
