import React from 'react';
import clsx from 'clsx';

import styles from './Panel.module.css';

type PanelProps = {
  title?: string;
  titleRightPart?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

function Panel(props: PanelProps) {
  const { titleRightPart, title, children, className } = props;
  return (
    <div className={clsx(styles.panel, className)}>
      <div className={styles.panel_title}>
        <h5>{title}</h5>
        {titleRightPart}
      </div>
      <div className={styles.panel_body}>{children}</div>
    </div>
  );
}

export default Panel;
