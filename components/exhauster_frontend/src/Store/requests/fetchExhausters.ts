import { RequestAction } from '@redux-requests/core';
import { addMinutes } from 'date-fns';
import { putResolve } from 'redux-saga/effects';
import { createAction } from 'redux-smart-actions';

import fetchExhaustersRequestAdapter from '../../Adapters/fetchExhaustersRequestAdapter';
import {
  setExhaustersAction,
  setLastUpdateDateAction,
  setSensorsDataUpdateDate,
} from '../reducers/exhaustersMonitorReducer';

import { createErrorNotification } from './utils';

export const FETCH_APP_TABLES = 'FETCH_APP_TABLES';

function fetchExhaustersRequest(sensorDate?: Date): RequestAction {
  return {
    request: {
      url: `dashboard/exshausters`,
    },
    meta: {
      getData: fetchExhaustersRequestAdapter,
      onSuccess: (response, action, store) => {
        store.dispatch(setExhaustersAction(response.data));

        store.dispatch(
          setSensorsDataUpdateDate(
            addMinutes(new Date(), new Date().getTimezoneOffset()),
          ),
        );

        if (sensorDate) {
          store.dispatch(setLastUpdateDateAction(sensorDate));
        }

        return response;
      },
      onError: (error, requestAction, store) => {
        createErrorNotification(store.dispatch, error);
        throw error;
      },
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
