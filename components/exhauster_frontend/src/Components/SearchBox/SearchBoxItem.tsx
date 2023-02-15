import React from 'react';

import { Button } from '../../UIKit';
import Text from '../TextTitle/TextTitle';

import { SearchBoxItemProps } from './SearchBox.interface';

import styles from './SearchBox.module.css';

function SearchBoxItem(props: SearchBoxItemProps) {
  const { item, selectItem } = props;

  return (
    <Button className={styles.search_box_item} onClick={selectItem}>
      <Text
        className={styles.search_box_item_text}
        textContent={item.displayValue}
      />
    </Button>
  );
}

export default SearchBoxItem;
