import React from 'react';

import styles from './Table.module.css';

type TableProps = {
  columns: { key: string; name: string }[];
  data: {
    section: { key: string; name: string };
    rows: Record<string, () => React.ReactNode>[];
  }[];
};

function Table(props: TableProps) {
  const { columns, data } = props;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.name}</th>
          ))}
        </tr>
      </thead>
      {data.map((dataItem) => (
        <tbody key={dataItem.section.key}>
          <tr className={styles.table_section_title}>
            <th colSpan={columns.length + 1}>{dataItem.section.name}</th>
          </tr>
          {dataItem.rows.map((row) => {
            const rowKey = JSON.stringify(row);

            return (
              <tr
                className={styles.table_section_row}
                key={JSON.stringify(row)}
              >
                <td className={styles.table_section_indent} />
                {columns.map((column) => (
                  <td key={`${rowKey}${column.key}`}>{row[column.key]()}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      ))}
      <tbody />
    </table>
  );
}

export default React.memo(Table);
