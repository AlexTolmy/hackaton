/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import clsx from 'clsx';

import { Spinner, Table } from '../../UIKit';
import getTranslation from '../../Utils/getTranslation';

import { AdvancedTableProps } from './AdvancedTable.interface';

import './AdvancedTable.css';
import styles from './AdvancedTable.module.css';

function AdvancedTable(props: AdvancedTableProps) {
  const { tableProps, isLoading, className } = props;

  const renderTable = useMemo(() => {
    if (isLoading) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    if (!tableProps.data.length) {
      return <p>{getTranslation('noData')}</p>;
    }

    return <Table header={tableProps.header} data={tableProps.data} />;
  }, [isLoading, tableProps.data, tableProps.header]);

  return (
    <div className={clsx(styles.table, 'table_container', className)}>
      {renderTable}
    </div>
  );
}

export default AdvancedTable;
