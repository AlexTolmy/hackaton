import React, { useState } from 'react';
import clsx from 'clsx';

import DatesPeriodSelectorContainer from '../../Containers/DatesPeriodSelectorContainer';
import ExhausterChartContainer from '../../Containers/ExhausterChartContainer/ExhausterChartContainer';
import ExhausterGeneralSchemeContainer from '../../Containers/ExhausterGeneralSchemeContainer';
import SchemeChartsSwitcherContainer from '../../Containers/SchemeChartsSwitcherContainer';
import { DisplayType } from '../../Containers/SchemeChartsSwitcherContainer/SchemeChartsSwitcherContainer.interface';

import styles from './ExhausterStatusPage.module.css';

function ExhausterStatusPage() {
  const [displayType, setDisplayType] = useState(DisplayType.Scheme);
  const isScheme = displayType === DisplayType.Scheme;

  return (
    <div className={styles.page}>
      <div className={styles.control_panel}>
        <DatesPeriodSelectorContainer
          cacheKey={DisplayType.Chart}
          className={clsx(styles.dates_selector, {
            [styles.dates_selector_hidden]: isScheme,
          })}
        />
        <SchemeChartsSwitcherContainer
          selectedItemId={displayType}
          changeInterval={setDisplayType}
        />
      </div>

      {isScheme ? (
        <ExhausterGeneralSchemeContainer />
      ) : (
        <ExhausterChartContainer />
      )}
    </div>
  );
}

export default ExhausterStatusPage;
