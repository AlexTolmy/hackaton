import { handleRequests } from '@redux-requests/core';
import { KeycloakInstance } from 'keycloak-js';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import thunk from 'redux-thunk';

import appThemeReducer from './reducers/appThemeReducer';
import notificationPanelReducer from './reducers/notificationPanelReducer';
import userDataReducer, {
  setUserName,
  setUserRole,
} from './reducers/userDataReducer';
import { UserRole } from './types/UserDataReducerType';
import getApiAccessDriver from './utils/axios';
import readUserRole from './utils/readUserRole';
import getWebsocketMiddleware from './websocket/getWebsocketMiddleware';

function* rootSaga() {
  yield all([]);
}

function getStoreInstance(keycloakInstance?: KeycloakInstance): Store {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: getApiAccessDriver(keycloakInstance),
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    notificationPanel: notificationPanelReducer,
    userData: userDataReducer,
    appTheme: appThemeReducer,
  });

  const websocketMiddleware = getWebsocketMiddleware();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    ...requestsMiddleware,
    thunk,
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

  if (keycloakInstance) {
    const {
      groups,
      given_name: firstName,
      family_name: secondName,
    } = keycloakInstance.tokenParsed;

    const role = readUserRole(groups);
    configuredStore.dispatch(setUserRole(role));

    configuredStore.dispatch(
      setUserName({
        firstName,
        secondName,
      }),
    );
  } else {
    configuredStore.dispatch(setUserRole(UserRole.Admin));
  }

  sagaMiddleware.run(rootSaga);

  return configuredStore;
}

export default getStoreInstance;
