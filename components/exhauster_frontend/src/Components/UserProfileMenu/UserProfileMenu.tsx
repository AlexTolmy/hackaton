import React from 'react';
import clsx from 'clsx';

import { UserProfileMenuProps } from './UserProfileMenu.interface';

import styles from './UserProfileMenu.module.css';

function UserProfileMenu(props: UserProfileMenuProps) {
  const { userFullName, userInitials, className } = props;
  return (
    <div className={clsx(styles.container, className)} title={userFullName}>
      <p>{userInitials}</p>
    </div>
  );
}

export default UserProfileMenu;
