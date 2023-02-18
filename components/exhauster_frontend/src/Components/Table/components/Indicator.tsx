import React, { useMemo } from 'react';
import clsx from 'clsx';

import Oil from '../../../Assets/svg/Oil';
import Temperature from '../../../Assets/svg/Temperature';
import Vibration from '../../../Assets/svg/Vibration';
import {
  IndicatorState,
  IndicatorType,
  IndicatorVariant,
} from '../../../Containers/ExhausterContainer/ExhausterContainer.interface';
import { ChartIndicatorType } from '../../../Store/types/ExhausterChartDataReducerType';

import styles from '../Table.module.css';

type IndicatorProps = {
  variant: IndicatorVariant;
  state: IndicatorState;
};

export function Indicator(props: IndicatorProps) {
  const { variant, state } = props;

  const icon = useMemo(() => {
    switch (variant) {
      case IndicatorVariant.Temperature:
        return <Temperature />;
      case IndicatorVariant.Vibration:
        return <Vibration />;
      case IndicatorVariant.Oil:
        return <Oil />;
      default:
        return null;
    }
  }, [variant]);

  const className = clsx(styles.indicator, state);

  return (
    <div className={className}>
      <span>{variant[0].toUpperCase()}</span>
      {icon}
    </div>
  );
}

export function renderIndicators(
  sensorName: string,
  indicators: IndicatorType[],
) {
  return function Component() {
    return (
      <div className={styles.indicators}>
        {indicators.map((indicator) => (
          <Indicator
            key={`${sensorName}${indicator.variant}`}
            state={indicator.state}
            variant={indicator.variant}
          />
        ))}
      </div>
    );
  };
}

export function renderChartIndicator(indicator: ChartIndicatorType) {
  return function Component() {
    return (
      <div className={clsx(styles.indicator, indicator.state)}>
        {indicator.value}
      </div>
    );
  };
}
