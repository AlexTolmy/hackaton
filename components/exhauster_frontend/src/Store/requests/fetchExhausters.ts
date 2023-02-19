import { RequestAction } from '@redux-requests/core';
import { addMinutes } from 'date-fns';
import { putResolve } from 'redux-saga/effects';
import { createAction } from 'redux-smart-actions';

import fetchExhaustersRequestAdapter from '../../Adapters/fetchExhaustersRequestAdapter';
import { IndicatorState } from '../../Containers/ExhausterContainer/ExhausterContainer.interface';
import addBreakLines from '../../Utils/addBreakLines';
import {
  setExhaustersAction,
  setLastUpdateDateAction,
  setSensorsDataUpdateDate,
} from '../reducers/exhaustersMonitorReducer';
import { addNotification } from '../reducers/notificationReducer';
import { ExhausterType } from '../types/ExhaustersMonitorReducerType';
import { NotificationType } from '../types/NotificationReducerType';

import { createErrorNotification } from './utils';

export const FETCH_APP_TABLES = 'FETCH_APP_TABLES';

function fetchExhaustersRequest(sensorDate?: Date): RequestAction {
  return {
    request: {
      url: `dashboard/exshausters`,
    },
    meta: {
      getData: fetchExhaustersRequestAdapter,
      onSuccess: (
        response: { data: Record<string, ExhausterType> },
        action,
        store,
      ) => {
        store.dispatch(setExhaustersAction(response.data));

        store.dispatch(
          setSensorsDataUpdateDate(
            addMinutes(new Date(), new Date().getTimezoneOffset()),
          ),
        );

        if (sensorDate) {
          store.dispatch(setLastUpdateDateAction(sensorDate));
        }

        let message = '';

        Object.values(response.data).forEach((item) => {
          item.sensors.forEach((sensor) => {
            sensor.indicators.forEach((indicator) => {
              if (indicator.state === IndicatorState.Critical) {
                message += `${item.exhausterName}: ${sensor.sensorName}: ${indicator.variant}: ${indicator.state}\n\n`;
              }
            });
          });
        });

        store.dispatch(
          addNotification({
            message: addBreakLines(message),
            type: NotificationType.Error,
          }),
        );

        return response;
      },
      onError: (error, requestAction, store) => {
        createErrorNotification(store.dispatch, error);
        throw error;
      },
      takeLatest: true,
    },
  };
}

export const fetchExhaustersAction = createAction(
  FETCH_APP_TABLES,
  fetchExhaustersRequest,
);

export function* fetchExhaustersGenerator() {
  yield putResolve(fetchExhaustersAction());
}
