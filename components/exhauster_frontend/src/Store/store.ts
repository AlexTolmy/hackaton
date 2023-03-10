import { handleRequests } from '@redux-requests/core';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import appThemeReducer from './reducers/appThemeReducer';
import datesPeriodSelectorReducer from './reducers/datesPeriodSelectorReducer';
import exhausterChartDataReducer from './reducers/exhausterChartDataReducer';
import exhausterMnemoSchemeReducer from './reducers/exhausterMnemoSchemeReducer';
import exhaustersMonitorReducer from './reducers/exhaustersMonitorReducer';
import notificationReducer from './reducers/notificationReducer';
import { fetchExhaustersGenerator } from './requests/fetchExhausters';
import getApiAccessDriver from './utils/axios';
import getWebsocketMiddleware from './websocket/getWebsocketMiddleware';

function* rootSaga() {
  yield all([fetchExhaustersGenerator()]);
}

function getStoreInstance(): Store {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: getApiAccessDriver(),
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    appTheme: appThemeReducer,
    exhaustersMonitor: exhaustersMonitorReducer,
    exhausterMnemoScheme: exhausterMnemoSchemeReducer,
    exhausterChart: exhausterChartDataReducer,
    timePeriod: datesPeriodSelectorReducer,
    notificationBar: notificationReducer,
  });

  const websocketMiddleware = getWebsocketMiddleware();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    ...requestsMiddleware,
    websocketMiddleware,
  ];

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const configuredStore = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);

  return configuredStore;
}

export default getStoreInstance;
