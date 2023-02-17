import React from 'react';
import clsx from 'clsx';

import styles from './Panel.module.css';

type PanelProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

function Panel(props: PanelProps) {
  const { title, children, className } = props;
  return (
    <div className={clsx(styles.panel, className)}>
      <div className={styles.panel_title}>{title}</div>
      <div className={styles.panel_body}>{children}</div>
    </div>
  );
}

export default Panel;
