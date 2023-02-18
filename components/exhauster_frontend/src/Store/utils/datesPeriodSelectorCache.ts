import DatesPeriodSelectorReducerType from '../types/DatesPeriodSelectorReducerType';

const CACHE_KEY_PREFIX = 'DATES_PERIOD_SELECTOR';

export function getDatesPeriodFromCache(
  cacheKey: string,
): DatesPeriodSelectorReducerType {
  let cachedPeriod: DatesPeriodSelectorReducerType = null;

  if (cacheKey) {
    cachedPeriod = JSON.parse(
      localStorage.getItem(`${CACHE_KEY_PREFIX}_${cacheKey}`),
    );

    if (cachedPeriod) {
      const { from, to } = cachedPeriod.period;
      cachedPeriod.period = {
        from: new Date(from),
        to: new Date(to),
      };
    }
  }

  return cachedPeriod;
}

export function saveDatesPeriodToCache(state: DatesPeriodSelectorReducerType) {
  const { cacheKey } = state;

  if (cacheKey) {
    localStorage.setItem(
      `${CACHE_KEY_PREFIX}_${cacheKey}`,
      JSON.stringify(state),
    );
  }
}
