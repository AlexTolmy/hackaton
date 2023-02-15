import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import { ButtonWithIcon, Glyph, Textbox } from '../../UIKit';
import getTranslation from '../../Utils/getTranslation';
import OutsideClickHandler from '../OutsideClickHandler';
import Popup from '../Popup';

import { SearchBoxItemType, SearchBoxProps } from './SearchBox.interface';
import SearchBoxItem from './SearchBoxItem';

import styles from './SearchBox.module.css';

function SearchBox(props: SearchBoxProps) {
  const { items, selectedItem, changeSelectedItem, className } = props;
  const inputFieldRef = useRef<HTMLDivElement>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const isSearchIconVisible = !selectedItem && !searchValue;
  const isClearButtonVisible = selectedItem || searchValue;

  const showPopup = useCallback(
    () => !selectedItem && setIsPopupVisible(true),
    [selectedItem],
  );
  const hidePopup = useCallback(() => setIsPopupVisible(false), []);

  const clearInput = () => {
    if (searchValue) {
      setSearchValue('');
    }

    if (selectedItem) {
      changeSelectedItem(null);
    }
  };

  const changeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const selectItem = useCallback(
    (item: SearchBoxItemType) => () => {
      changeSelectedItem(item);
      hidePopup();
    },
    [hidePopup, changeSelectedItem],
  );

  const searchItems = useMemo(() => {
    const elements: ReactNode[] = [];
    items.forEach((item) => {
      const itemValue = item.displayValue.toLocaleLowerCase();
      const searchString = searchValue.toLocaleLowerCase();

      const isResultItem = !searchString || itemValue.includes(searchString);

      if (isResultItem) {
        elements.push(
          <SearchBoxItem
            key={item.value}
            selectItem={selectItem(item)}
            item={item}
          />,
        );
      }
    });

    return elements.length ? elements : getTranslation('noData');
  }, [items, searchValue, selectItem]);

  return (
    <div className={clsx(styles.search_box, className)}>
      <OutsideClickHandler onOutsideClick={hidePopup}>
        <div ref={inputFieldRef} className={styles.search_field}>
          <Textbox
            value={selectedItem?.displayValue || searchValue}
            className={styles.search_input}
            onChange={changeSearchValue}
            onFocus={showPopup}
            readOnly={!!selectedItem}
          />
          {isSearchIconVisible && (
            <Glyph className={styles.search_icon} name="Search" />
          )}
          {isClearButtonVisible && (
            <ButtonWithIcon
              className={styles.search_clear_button}
              glyphNameRight="Cross"
              onClick={clearInput}
            />
          )}
        </div>
        {isPopupVisible && (
          <Popup
            width={inputFieldRef.current?.offsetWidth}
            className={styles.search_popup}
          >
            <div className={styles.search_popup_body}>{searchItems}</div>
          </Popup>
        )}
      </OutsideClickHandler>
    </div>
  );
}

export default SearchBox;
