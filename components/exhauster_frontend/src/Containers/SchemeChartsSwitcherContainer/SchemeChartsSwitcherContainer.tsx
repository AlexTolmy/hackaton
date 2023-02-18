import React, { useMemo } from 'react';

import TextRadioGroup from '../../Components/TextRadioGroup';
import getTranslation from '../../Utils/getTranslation';

import { DisplayType } from './SchemeChartsSwitcherContainer.interface';

import styles from './SchemeChartsSwitcherContainer.module.css';

type SchemeChartsSwitcherContainerProps = {
  selectedItemId: string;
  changeInterval: (value: DisplayType) => void;
};

function SchemeChartsSwitcherContainer(
  props: SchemeChartsSwitcherContainerProps,
) {
  const { selectedItemId, changeInterval } = props;

  const intervalsList = useMemo(
    () =>
      Object.values(DisplayType).map((time) => ({
        id: time,
        value: getTranslation(time),
      })),
    [],
  );

  return (
    <TextRadioGroup
      name="chartSwitcher"
      items={intervalsList}
      selectedItemId={selectedItemId}
      onChangeCheckedItem={changeInterval}
      className={styles.switcher}
    />
  );
}

export default SchemeChartsSwitcherContainer;
